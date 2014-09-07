App.DataAccess.MetaDataDB =
    {
        GetMetaDataAsync: function ()
        {
            var def = new $.Deferred();

            var data = App.Data.TestMetaData;
               

            def.resolve(data);

            return def;
        },

        GetLeftNavigationItems: function ()
        {
            return Enumerable.From(App.Data.MetaData.LeftNavigationItems);
        },

        GetTopCreateItems: function ()
        {
            return Enumerable.From(App.Data.MetaData.TopCreateItems);
        },

        GetSettingsItems:function()
        {
            return Enumerable.From({});
        }

    };