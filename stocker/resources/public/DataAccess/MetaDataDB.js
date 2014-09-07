App.DataAccess.MetaDataDB =
    {
        GetMetaDataAsync: function ()
        {
            var def = new $.Deferred();

            var data = {
                "LeftNavigationItems":
                [
                    { "Id": "Home", "Type": "ActionLinq", "Value": { Text: "Home", "Icon": "icon-home", Href: "#/" }, "Order": 0 }                    
                ],
                "TopCreateItems":
                    [
                        { "Text": "NEWPORTFOLIO", "Icon": "icon-bars", "Action": "NewPortfolio" }
                    ]
            };
            App.DataAccess.PortfolioDB.GetAllAsync().done(function (ports)
            {
                var actions = Enumerable.From(ports).Select(function (item,index)
                {
                    return { "Type": "ActionLinq", "Value": { "Text": item.Name, "Icon": item.Icon, "Href": "#/Dashboard/Portfolio/" + item.Id }, Order: index };
                }).ToArray();
                data.LeftNavigationItems.push({
                    "Id": "Portfolios", "Type": "SubMenu", "Value":
                      {
                          "Text": "Portfolios",
                          "Icon": "icon-newspaper",
                          "Items": actions                             
                      },
                    "Order": 1
                });
                def.resolve(data);
            });          

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

        GetSettingsItems: function ()
        {
            return Enumerable.From({});
        }

    };