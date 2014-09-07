function NewStockWizardViewModel(wizardProp)
{
    var self = this;

    self.StockName = ko.observable().extend({ required: true, IsStock: {} });
   
    self.DataSource = new kendo.data.DataSource(
        {
            serverFiltering: true,
            serverPaging:true,
            transport:
            {
                read: function (options)
                {
                    var take = options.data.take;
                    var starts = options.data.filter.filters[0].value.toUpperCase();
                    App.DataAccess.StockDB.GetStocksThatStartWithAsync(starts, take)
                        .done(function (data)
                        {
                            options.success(data.ToArray());
                        }).fail(options.error);
                },
                maxRows: 3
            },
            pageSize: 3
        });

    self.Add = function ()
    {
        App.DataAccess.StockDB.GetByIdAsync(self.StockName().toLocaleUpperCase()).done(function (stock)
        {
            Utils.CloseWindow();
            wizardProp.Deferred.resolve(stock);
        });
    }

    self.Cancel = function ()
    {
        Utils.CloseWindow();

        wizardProp.Deferred.reject();
    }
}