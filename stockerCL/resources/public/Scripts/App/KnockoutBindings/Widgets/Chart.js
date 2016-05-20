ko.bindingHandlers.RangeChart = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
       

    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var observable = valueAccessor();
        chart=  $(element).dxChart('instance');
        if (ko.isObservable(observable) || ko.isComputed(observable))
        {
            observable(chart);
        } 
        
    }
};