App.DataAccess.StockDataDB =
    {
        GetAsync: function (ids)
        {
            var def = new $.Deferred();
            if (ids != null && ids.length)
            {
                $.ajax(
                   {
                       type: "GET",
                       url: App.Uri.DataService + "/api/StockData",
                       contentType: 'application/json',
                       data: { ids: ids },
                       cache: false
                   }).done(function (data)
                   {
                       def.resolve(Enumerable.From(data));
                   }).fail(def.reject);
            } else
            {
                def.resolve(Enumerable.From([]));
            }

            return def;          
        },
        GetByIdAsync: function (id)
        {
            var def = new $.Deferred();
            $.ajax(
              {
                  type: "GET",
                  url: App.Uri.DataService + "/api/StockData/" + id,
                  contentType: 'application/json',
                  cache: false
              }).done(function (data)
              {
                  def.resolve(data[0]);
              }).fail(def.reject);

            return def;
        },

        GetHistoricalDataByIdAsync: function (id)
        {
            var def = new $.Deferred();
            $.ajax(
              {
                  type: "GET",
                  url: App.Uri.DataService + "/api/StockData/HistoricalData",
                  contentType: 'application/json',
                  data:{id:id},
                  cache: false
              }).done(function (data)
              {
                  def.resolve(Enumerable.From(data).Select(function (r)
                  {
                      r.Date = new Date(r.Date);
                      return r;
                  }));
              }).fail(def.reject);

            return def;
        }
    };