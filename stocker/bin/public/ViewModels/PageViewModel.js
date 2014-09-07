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

    $(App.DataAccess.PortfolioDB).on("Added", function (e,portfolio)
    {
        var port = leftNavigationItems.First("r=>r.Id=='Portfolios'").Value.Items;
        port.push({ "Type": "ActionLinq", "Value": { "Text": portfolio.Name
            , "Icon": portfolio.Icon, "Href": "#/Dashboard/Portfolio/" + portfolio.Id }, Order: port.length });
        self.LeftNavigationItems([]);
        self.LeftNavigationItems(leftNavigationItems.ToArray());
    });
}