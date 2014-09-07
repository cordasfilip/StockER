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
                    App.DataAccess.StockDB.GetByIdStartWithTopAsync(starts, take)
                        .done(function (data)
                        {
                            options.success(data.ToArray());
                        });                  
                },
                maxRows: 3
            },
            pageSize: 3
        });

    self.Add = function ()
    {
        var stock = Enumerable.From(self.DataSource.data()).First("s=>s.Id=='" + self.StockName().toLocaleUpperCase() + "'");
        Utils.CloseWindow();
        wizardProp.Deferred.resolve(stock._raw());
      
    }

    self.Cancel = function ()
    {
        Utils.CloseWindow();

        wizardProp.Deferred.reject();
    }
}