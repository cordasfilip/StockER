App.DataAccess.PortfolioDB =(function()
{     
    function TestRepo()
    {
        var self = this;
        var id=2;
        self.GetAsync = function (id)
        {
            var def = new $.Deferred();
            var portfolios = App.Data.TestPortfolios;
            var portfolioStocks = App.Data.TestPortfolioStocks;

            var portfolio = portfolios                
                .FirstOrDefault(null, "p=>p.Id == " + id);

            if (portfolio != null)
            {
                var stocks = portfolioStocks
                    .Where("ps=>ps.PortfolioId == " + id)
                    .Select(function (ps)
                    {
                        return App.Data.TestStocks.First("s=>s.Id == '" + ps.StockId + "'");
                    }).ToArray();

                portfolio.Stocks = stocks;

                def.resolve(portfolio);
            } else
            { location = "#/NotFound" }
            return def;
        } 
        
        self.AddPortfolio = function (portfolio)
        {
            id += 1;
            portfolio.Id = id;
            App.Data.TestPortfolios = App.Data.TestPortfolios.Union([portfolio]);

            $(App.DataAccess.PortfolioDB).trigger('Added', [portfolio]);
        }

        self.AddStockToPortfolio = function (portfolio, stock)
        {
            var def = new $.Deferred();

            var ps = new PortfolioStock({ StockId: stock.Id, PortfolioId: portfolio.Id });
            App.Data.TestPortfolioStocks = App.Data.TestPortfolioStocks.Union(Enumerable.From([ps]));
            portfolio.Stocks.push(stock);           
            $(App.DataAccess.PortfolioDB).trigger("Updated", [portfolio]);
            def.resolve(portfolio);           
            return def;
        }
        
        self.RemoveStockFromPortfolioById = function (portfolio, stockId)
        {
            var def = new $.Deferred();

            App.Data.TestPortfolioStocks = App.Data.TestPortfolioStocks.Where("ps=>!(ps.PortfolioId=='"+portfolio.Id+"'&&ps.StockId=='"+stockId+"')");
            portfolio.Stocks = Enumerable.From(portfolio.Stocks).Where("s=>s.Id!='" + stockId + "'").ToArray();
            $(App.DataAccess.PortfolioDB).trigger("Updated", [portfolio]);
            def.resolve(portfolio);
            return def;
        }
    };

    return new TestRepo();
})();