App.DataAccess.PortfolioDB = (function ()
{
    function Repo()
    {
        var self = this;

        self.GetAllAsync = function () { return $.get(App.Uri.DataService + "/api/Portfolio");}

        self.GetAsync = function (id)
        {
            var def = new $.Deferred();
            $.ajax(
                {
                    type: "GET",
                    url: App.Uri.DataService + "/api/Portfolio/" + id,
                    contentType: 'application/json',
                    cache:false
                }).done(
                function (portfolio)
                {
                    if (portfolio)
                    {
                        def.resolve(portfolio);
                    } else
                    { Utils.NotFound(); }

                }).fail(Utils.NotFound);
           
            return def;
        }

        self.AddPortfolio = function (portfolio)
        {
            $.ajax(
                {
                    type: "POST",
                    url: (App.Uri.DataService + "/api/Portfolio"),
                    contentType: 'application/json',
                    data: JSON.stringify(portfolio)
                }).done(
               function (id)
               {
                   portfolio.Id = id;
                   $(App.DataAccess.PortfolioDB).trigger('Added', [[portfolio]]);
               });
        }

        self.AddStockToPortfolioAsync = function (portfolio, stock)
        {
            var def = new $.Deferred();

            var ps = new PortfolioStock({ StockId: stock.Id, PortfolioId: portfolio.Id });

            $.ajax(
               {
                   type: "POST",
                   url: (App.Uri.DataService + "/api/Portfolio/AddStock"),
                   contentType: 'application/json',
                   data: JSON.stringify(ps)
               }).done(
              function ()
              {
                  self.GetAsync(portfolio.Id).done(function (portfolio)
                  {
                      $(App.DataAccess.PortfolioDB).trigger("Updated",[[portfolio], ["Stocks"]]);
                      def.resolve(portfolio);
                  }).fail(def.reject);
              }).fail(def.reject);
            
            return def;
        }

        self.RemoveStockFromPortfolioById = function (portfolio, stockId)
        {
            var def = new $.Deferred();
            $.ajax(
              {
                  type: "DELETE",
                  url: (App.Uri.DataService + "/api/Portfolio/RemoveStock?" + $.param({ portfolioId: portfolio.Id, stockId: stockId })),
              }).done(
             function ()
             {
                 self.GetAsync(portfolio.Id).done(function (portfolio)
                 {
                     $(App.DataAccess.PortfolioDB).trigger("Updated", [[portfolio], ["Stocks"]]);
                     def.resolve(portfolio);
                 }).fail(def.reject);
             }).fail(def.reject);
            
            return def;
        }

        self.RemovePortfolio = function (portfolio)
        {
            var def = new $.Deferred();
            $.ajax(
              {
                  type: "DELETE",
                  url: (App.Uri.DataService + "/api/Portfolio/" + portfolio.Id),
              }).done(
             function ()
             {
                 $(App.DataAccess.PortfolioDB).trigger('Removed', [[portfolio]]);
                 def.resolve(portfolio);                
             }).fail(def.reject);

            return def;
        }

        self.GetFactorNames = function (portfolioId)
        {
            var def = new $.Deferred();
            $.ajax(
                {
                    type: "GET",
                    url: App.Uri.DataService + "/api/Portfolio/GetFactorNames",
                    contentType: 'application/json',
                    data:{portfolioId:portfolioId},
                    cache: false
                }).done(
                function (factors)
                {
                    if (factors==null)
                    {
                        def.reject();
                    } else if (factors.length == null || factors.length == 0)
                    {
                        def.reject();
                    } else
                    {
                        def.resolve(Enumerable.From(factors));
                    }
                }).fail(def.reject);

            return def;
        }

        self.GetFactorData = function (portfolioId, featureName)
        {
            var def = new $.Deferred();
            $.ajax(
                {
                    type: "GET",
                    url: App.Uri.DataService + "/api/Portfolio/GetFactorData",
                    contentType: 'application/json',
                    data: { portfolioId: portfolioId, featureName: featureName },
                    cache: false
                }).done(
                function (factorData)
                {                 
                    def.resolve(Enumerable.From(factorData));
                }).fail(def.reject);

            return def;
        }

        self.GetAllFactorData = function (portfolioId)
        {
            var def = new $.Deferred();
            $.ajax(
                {
                    type: "GET",
                    url: App.Uri.DataService + "/api/Portfolio/GetAllFactorData",
                    contentType: 'application/json',
                    data: { portfolioId: portfolioId },
                    cache: false
                }).done(
                function (factorData)
                {
                    def.resolve(Enumerable.From(factorData));
                }).fail(def.reject);

            return def;
        }
    };

    return new Repo();
})();