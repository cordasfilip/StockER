function PageViewModel()
{
    var self = this;

    var viewChangedFunction = null;

    var globalActions =
        {
            NewPortfolio: function ()
            {
                Utils.ShowWindow("NewPortfolio").done(function (portfolio)
                {
                    App.DataAccess.PortfolioDB.AddPortfolio(portfolio);
                });
                //App.DataAccess.PortfolioDB.AddPortfolio(new Portfolio({ Id: 3, Name: "New Portfolio", Stocks: [], Icon: "icon-screen" }));
            }
        };

    self.View = ko.observable();
 
    //var view = ko.observable();
    ////self.View = ko.computed(
    ////    {
    ////        read: function () { return view(); },
    ////        write: function (value)
    ////        {                
    ////            if (viewChangedFunction)
    ////            {
    ////                viewChangedFunction();
    ////                viewChangedFunction = null;
    ////            }
    ////            view(value);
    ////        },
    ////        owner:view
    ////    });

    self.Title = ko.observable("");

    var leftNavigationItems = App.DataAccess.MetaDataDB.GetLeftNavigationItems()
    self.LeftNavigationItems = ko.observableArray(leftNavigationItems.ToArray());

    var settingsItems = App.DataAccess.MetaDataDB.GetSettingsItems()
    self.SettingsItems = ko.observableArray(settingsItems.ToArray());

    self.GetSettingsTemplate = function (item) { return "Settings-"+item.Template; }

    var topCreateItems = App.DataAccess.MetaDataDB.GetTopCreateItems().Select(function (r)
    {
        r.Action = globalActions[r.Action];
        return r;
    });

    self.TopCreateItems = ko.observableArray(topCreateItems.ToArray());

    self.StockName = ko.observable().extend({ required: true, IsStock: {} });

    self.DataSource = new kendo.data.DataSource(
        {
            serverFiltering: true,
            serverPaging: true,
            transport:
            {
                read: function (options)
                {
                    var take = options.data.take;
                    var starts = options.data.filter.filters[0].value.toUpperCase();
                    App.DataAccess.StockDB.GetStocksThatStartWithAsync(starts, take)
                        .done(function (data)
                        {
                            options.success(data.ToArray());
                        }).fail(options.error);
                },
                maxRows: 3
            },
            pageSize: 3
        });

    self.Search = function ()
    {
        if (self.StockName()!=null)
        {
            location = "#/Dashboard/Stock/" + self.StockName();
        }
    }

    $(App.DataAccess.PortfolioDB).on("Added", function (e,portfolios)
    {
        var portfolio;
        for (var i = 0; i < portfolios.length; i++)
        {
            portfolio = portfolios[i];
            var port = leftNavigationItems.First("r=>r.Id=='Portfolios'").Value.Items;
            port.push({
                "Type": "ActionLinq", "Value": {
                    "Text": portfolio.Name
                    , "Icon": portfolio.Icon, "Href": "#/Dashboard/Portfolio/" + portfolio.Id
                }, Order: port.length
            });
            self.LeftNavigationItems([]);
            self.LeftNavigationItems(leftNavigationItems.ToArray());
        }
       
    });
}