function WorldMarkesGridWidgetViewModel(widget)
{
    var self = this;
    var locations = ["^IXIC", "^DJI", "^GDAXI", "^FTSE", "^GSPC", "^HSI", "^N225", "^FCHI", "^IPSA"];
    self.WorldMarkets = ko.observableArray();
   
    App.DataAccess.StockDataDB.GetAsync(locations, ["Name", "Open", "Change", "PreviousClose", "ChangeInPercent"]).done(
        function (data)
        {
            self.WorldMarkets(data.ToArray());
            widget.Loading(false);
        });
}