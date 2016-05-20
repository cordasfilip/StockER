function Run()
{
    $.connection.hub.start().done(function ()
    {
        App.DataAccess.MetaDataDB.GetMetaDataAsync().done(function (data)
        {
            App.Data.MetaData = data;
            App.PageViewModel = new PageViewModel();
            App.Navigation.Sammy.run();
            //App.Loading(false);
            ko.applyBindings(App, $('#main-content')[0]);
        });
    });
};

