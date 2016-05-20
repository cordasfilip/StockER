App.DataAccess.StockDataDB =
    {
        GetAsync: function (id)
        {
            var def = new $.Deferred();
            var ids = Enumerable.From(id);

            var select = Enumerable.From(["Name", "StockExchange", "Open", "Change", "PreviousClose", "ChangeInPercent"]).Aggregate("r=>{Id:r.Id", function (s, c) { return (s + "," + (c + ":r." + c)); }) + "}";

            def.resolve(App.Data.TestStockData.Where(function (s)
            {
                return ids.Any(function (i) { return i == s.Id; })
            }).Select(select));

            return def;
        },
        GetByIdAsync: function (id)
        {
            var def = new $.Deferred();
            def.resolve(App.Data.TestStocks.Last());
            return def;
        },

        GetHistoricalDataByIdAsync: function (id)
        {
            var def = new $.Deferred();
            def.resolve(Enumerable.From([
               {
                   Date: new Date("10-10-2010"),
                   Open: 10,
                   High: 10,
                   Low: 10,
                   Close: 10,
                   Volume: 2000,
                   AdjClose: 10
               },
            {
                Date:new Date("10-11-2010"),
                Open: 10,
                High: 10,
                Low: 10,
                Close: 10,
                Volume: 2000,
                AdjClose: 10
            },
            {
                Date: new Date("10-12-2010"),
                Open: 10,
                High: 10,
                Low: 10,
                Close: 10,
                Volume: 2000,
                AdjClose: 10
            }]));
            return def;
        }
    };