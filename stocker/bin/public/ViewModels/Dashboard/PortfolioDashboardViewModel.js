function PortfolioDashboardViewModel(id)
{
    var self = this;

    var db = App.DataAccess.PortfolioDB;
    var stockDB=App.DataAccess.StockDataDB;
    
    self.Portfolio=null;

    self.IsEdit = ko.observable(false);

    self.Loading = ko.observable(true);

    self.Title = ko.observable();

    self.Stocks = ko.observableArray();  

    self.Avg = 0;

    self.Max = 0;
    
    self.ShowNewStockWindow = function ()
    {       
        Utils.ShowWindow("NewStock").done(function (stock)
        {
            if (Enumerable.From(self.Portfolio.Stocks).Any("s=>s.Id=='" + stock.Id + "'"))
            {
                Utils.ShowInfo("Stock already in Portfolio")
            } else
            {
                db.AddStockToPortfolio(self.Portfolio, stock)
                .done(function () { Utils.ShowSuccess("Stock:  "+stock.Id+" added to portfolio"); })
                .fail(function (e)
                {
                    Utils.ShowError("ERROR adding Stock", e);
                });
            }
        });
    }

    self.RemoveStock = function (stock)
    {
        db.RemoveStockFromPortfolioById(self.Portfolio, stock.Id).done(function ()
        {
            Utils.ShowSuccess("Stock:  " + stock.Id + " removed from Portfolio");
        }).fail(function (e)
        {
            Utils.ShowError("ERROR removing Stock", e);
        });
    }


    self.Dispose = function ()
    {
        $(db).off("Updated", UpdateEvent);
    }

    $(db).on("Updated", UpdateEvent);
    db.GetAsync(id).done(UpdatePortfolio);
    
    function UpdateEvent(e, port) { UpdatePortfolio(port) }

    function UpdatePortfolio(port)
    {
        if (self.Portfolio != null)
        {
            Utils.ShowInfo("Portfolio Updated");
        }
        if (port.Id == id)
        {
            self.Portfolio=port;
            if (port)
            {
                self.Title(self.Portfolio.Name);

                stockDB.GetAsync(Enumerable.From(self.Portfolio.Stocks).Select("s=>s.Id").ToArray(), ["Name", "StockExchange", "Open", "Change", "PreviousClose"]).done(
                function (data)
                {
                    if (data.Count() > 0)
                    {
                        var mult = 1;
                        self.Avg = data.Average("r=>(r.Change / r.Open) * 100");
                        self.Max = data.Max("r=>(r.Change / r.Open) * 100");
                        self.Min = data.Min("r=>(r.Change / r.Open) * 100");

                        if (Math.abs(self.Max) < 1 && Math.abs(self.Min) < 1)
                        {
                            self.Avg *= 10;
                            self.Max *= 10;
                            self.Min *= 10;
                            mult = 10;
                        }
                        self.Stocks(data.Select(function (r) { r.ChangeInPercent = (r.Change / r.Open) * 100 * mult; return r; }).ToArray());
                    } else
                    { self.Stocks([]); self.IsEdit(true);}
                   
                    self.Loading(false);
                });
            } else
            {
                location = "#/NotFound";
            }
        }
    }

}