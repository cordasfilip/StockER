function WorldMapWidgetViewModel(widget)
{
    var self = this;
    var locations = {
       "^IXIC":  { Style:{ top: "17%", left: "22%"}, Arrow: 'top' },
       "^DJI":   { Style:{ top: "32%", left: "22%"}, Arrow: 'bottom' },
       "^GDAXI": { Style:{ top: "17%", left: "53%"}, Arrow: 'right' },
       "^FTSE":  { Style:{ top: "8%",  left: "44%"}, Arrow: 'top' },
       "^GSPC":  { Style:{ top: "25%", right: "78%"}, Arrow: 'left' },
       "^HSI":   { Style:{ top: "33%", left: "81%"}, Arrow: 'right' },
       "^N225":  { Style:{ top: "19%", left: "82%"}, Arrow: 'top' },
       "^FCHI":  { Style:{ top: "25%", left: "44%"}, Arrow: 'bottom' },
       "^IPSA":  { Style:{ top: "60%", left: "30%"}, Arrow: 'right' }
   }

    self.WorldMarkets = ko.observableArray();

    App.DataAccess.StockDataDB.GetAsync(Object.keys(locations),["Name","Open","Change"]).done(
        function (data)
        {
            self.WorldMarkets(data.Select(function (r)
            {
                r.Location = locations[r.Id];
                return r;
            }).ToArray());
            widget.Loading(false);
        });
}