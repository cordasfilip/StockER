function WorldMarketsChartWidgetViewModel(widget)
{
    var self = this;
    var locations = ["^IXIC", "^DJI", "^GDAXI", "^FTSE", "^GSPC", "^HSI", "^N225", "^FCHI", "^IPSA"];
    var chartSettings = {     
        series:
        {
            argumentField: "Name",
            valueField: "ChangeInPercent",
            type: "bar",
            color: "#a4c400"
        }
        , legend: { visible: false }
    }
   
    self.ChartOptions =ko.observable();
    
    App.DataAccess.StockDataDB.GetAsync(locations, ["Name", "Open", "Change"]).done(
        function (data)
        {

            var settings = { dataSource: data.Select("r=>{Name:r.Name,ChangeInPercent:(r.Change/r.Open)*100}").ToArray() };
            self.ChartOptions($.extend(settings,chartSettings));
            widget.Loading(false);
        });
}