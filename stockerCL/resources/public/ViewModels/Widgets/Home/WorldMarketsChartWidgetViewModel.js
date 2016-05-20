function WorldMarketsChartWidgetViewModel(widget)
{
    var self = this;
   
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
   
    self.ChartOptions = ko.observable();
    
    widget.Data.done(
        function (data)
        {

            chartSettings.dataSource = data.Select(function (r)
            {
                var change = parseFloat(r.Change.replace("+", ""));
                var open = parseFloat(r.Open);
                var changeInPercent = open == 0 ? 0 : change / open;
                return { Name: r.Name, ChangeInPercent: changeInPercent * 100 }
            }).ToArray();
            self.ChartOptions(chartSettings);
            widget.Loading(false);
        });
}