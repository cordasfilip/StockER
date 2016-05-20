App.DataAccess.StockDB =
    {      
        GetByIdAsync: function (id)
        {
            var def = new $.Deferred();

            $.ajax(
               {
                   type: "GET",
                   url: App.Uri.DataService + "/api/Stock/"+id,
                   contentType: 'application/json',
                   cache: false
               }).done(function (data)
               {
                   def.resolve(data);
               }).fail(def.reject);

            return def;
        },

        GetStocksThatStartWithAsync: function (value, take)
        {
            var def = new $.Deferred();

             $.ajax(
                {
                    type: "GET",
                    url: App.Uri.DataService + "/api/Stock/StocksThatStartWith",
                    contentType: 'application/json',
                    data: { value: value ,take:take },
                    cache: false
                }).done(function (data)
                {
                    def.resolve(Enumerable.From(data));
                }).fail(def.reject);

            return def;
        },

        IsStockAsync: function (id)
        {
            var def = new $.Deferred();

            $.ajax(
                {
                    type: "GET",
                    url: App.Uri.DataService + "/api/Stock/IsStock",
                    contentType: 'application/json',
                    data: { name: id },
                    cache: false
                }).done(function (data)
                {
                    def.resolve(data);
                }).fail(function ()
                {
                    def.resolve(false);
                });

            return def;
        }
    };