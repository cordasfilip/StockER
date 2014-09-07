App.DataAccess.StockDB =
    {      
        GetByIdAsync: function (id)
        {
            var def = new $.Deferred();

            var stock = App.Data.TestStocks.FirstOrDefault(null, "s=>s.Id=='" + id + "'");
            if (stock != null)
            {
                def.resolve(stock);
            } else
            {
                def.reject();
            }

            return def;
        },

        GetByIdStartWithTopAsync: function (value, take)
        {
            var def = new $.Deferred();

            def.resolve(App.Data.TestStocks.Where("s=>(/^" + value + "/).test(s.Id)").Take(take));

            return def;
        },

        IsStockAsync: function (id)
        {
            var def = new $.Deferred();

            App.DataAccess.StockDB.GetByIdAsync(id).done(function (stock)
            {
                setTimeout(function ()
                {
                    def.resolve(true);
                }, 10);
            }).fail
            (
                function ()
                {
                    setTimeout(function ()
                    {
                        def.resolve(false);
                    }, 10);
                }
            );

            return def;
        }
    };