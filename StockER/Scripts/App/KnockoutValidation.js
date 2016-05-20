ko.validation.rules['IsStock'] = {
    async: true,
    validator: function (val, parms, callback)
    {                  
       App.DataAccess.StockDB.IsStockAsync(val).done(callback);
    },
    message: "Not Valid"
};
