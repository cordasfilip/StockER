App.DataAccess.StockDataDB =
    {
        GetAsync: function (id, colums)
        {
            var def = new $.Deferred();
            var ids = Enumerable.From(id);

            var select = Enumerable.From(colums).Aggregate("r=>{Id:r.Id", function (s, c) { return (s + "," + (c + ":r." + c)); }) + "}";

            def.resolve(App.Data.TestStockData.Where(function (s)
            {
                return ids.Any(function (i) { return i == s.Id; })
            }).Select(select));

            return def;
        },
        GetByIdAsync: function (id)
        {

        }
    };