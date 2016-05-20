function StockDashboardViewModel(id)
{
    var self = this;

    var dbStock = App.DataAccess.StockDB;

    var dbStockData = App.DataAccess.StockDataDB;

    var allData ;

    var startDate;

    var endDate;

    self.Loading = ko.observable(true);

    self.Id = id;

    self.Quotes = '"';
    
    self.Stock = ko.observable();

    self.StockData = ko.observable();

    self.FilterChart = ko.observable(false);

    self.IsLineChartType = ko.observable(true);

    self.SwitchChart = function ()
    {
        self.IsLineChartType(!self.IsLineChartType());
        if ( self.IsLineChartType())
        {
            self.HistoricalChartSettings().commonSeriesSettings = {type:"line"};
           
        } else
        {
            self.HistoricalChartSettings().commonSeriesSettings = { type: "candlestick" };

        }
        self.HistoricalChartSettings(self.HistoricalChartSettings());
    }

    var chart;
    self.ChartWidget = ko.computed(
        {
            read: function ()
            {
                return chart;
            },
            write: function (value)
            {
                chart = value;
                chart.zoomArgument(startDate, endDate);
            }
        });

    self.HistoricalChartSettings = ko.observable();

    self.HistoricalRangeChartSettings = ko.observable();

    self.PerformanceGauge = ko.observable();

    $.when(dbStock.GetByIdAsync(id),
        dbStockData.GetByIdAsync(id),
        dbStockData.GetHistoricalDataByIdAsync(id))
        .done(function (stock, stockData, historicalData)
        {
            self.Stock(stock);
            self.StockData(stockData);

            startDate = historicalData.Take(30).Last().Date;

            endDate = historicalData.First().Date;

            allData = historicalData;

            var data = historicalData.Take(500).ToArray();

            self.HistoricalChartSettings({
                title: "Stock Price",
                dataSource: data,
                commonSeriesSettings: {                    
                    //type: "candlestick"  
                    //type: "area"
                },
                legend: {
                    itemTextPosition: 'left'
                },
                series: [
                    {                       
                        name: id,
                        argumentField: "Date",
                        valueField: "Open",
                        openValueField: "Open",
                        highValueField: "High",
                        lowValueField: "Low",
                        closeValueField: "Close",
                        reduction: {
                            color: "#e51400"
                        },
                        
                        color:Utils.GetModColor(0)
                    }
                ],
                valueAxis: {
                    title: {
                        text: "US dollars"
                    },
                    label: {
                        format: "currency",
                        precision: 2
                    }
                },
                tooltip: {
                    enabled: true
                },
                argumentAxis: {
                    label: {
                        format: "shortDate"
                    }
                }
            });

            var base = Parse(stockData.TargetPrice1yr);

            var start = Parse(stockData.TargetPrice1yr) - base  * (20/ 100);

            var end = Parse(stockData.TargetPrice1yr) + base * (20 / 100);

            self.PerformanceGauge({
                startValue: start,
                endValue: end,
                baseValue: base,
                values: [Parse(stockData.LastTradePriceOnly), Parse(stockData.DayMovingAverage50), Parse(stockData.DayMovingAverage200)],
                palette: [Utils.GetModColor(0), Utils.GetModColor(1), Utils.GetModColor(3)],
               
            });

            self.HistoricalRangeChartSettings({
               
                dataSource: data,
                chart: {
                    series: [{
                        argumentField: "Date",
                        valueField: "High",
                        color: Utils.GetModColor(0)
                    }]
                },
                behavior: {
                    callSelectedRangeChanged: "onMoved"
                },
                scale: {
                   
                    minorTickInterval: "day",
                    majorTickInterval: { days: 7 },
                    minRange: "week",
                    maxRange: "year",
                    showMinorTicks: false
                },
               
                selectedRange: {
                    startValue: startDate,
                    endValue:endDate
                },
                selectedRangeChanged: function (e)
                {
                    self.HistoricalRangeChartSettings().selectedRange =
                         {
                             startValue: e.startValue,
                             endValue: e.endValue
                         }
                    chart.zoomArgument(e.startValue, e.endValue);
                   
                }
            });
            if (chart!=null)
            {
                chart.zoomArgument(startDate, endDate);
            }
            self.Loading(false);

            function Parse(value) { return parseFloat(value.replace('"', '')) }
        }).fail(function (e)
    {
        Utils.ShowError("Stock load fail",e)
    });
}
