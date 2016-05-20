ko.bindingHandlers.PageTitle = {
    init: function (elem, valueAccessor, allBindings, viewModel, bindingContext)
    {
        ko.utils.domNodeDisposal.addDisposeCallback(elem, function ()
        {           
            App.PageViewModel.Title("");
        });

    },
    update: function (elem, valueAccessor, allBindings, viewModel, bindingContext)
    {      
        App.PageViewModel.Title(ko.unwrap(valueAccessor()));
    }
};
ko.virtualElements.allowedBindings.PageTitle = true;

ko.bindingHandlers.AddCeateNavigation = {
    init: function (elem, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var items = ko.unwrap(valueAccessor());
        items.forEach(function (item)
        {
            App.PageViewModel.TopCreateItems.push(item);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(elem, function ()
        {
            App.PageViewModel.TopCreateItems.removeAll(items);
        });
    }
};
ko.virtualElements.allowedBindings.AddCeateNavigation = true;

ko.bindingHandlers.AddSettingButton = {
    init: function (elem, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var items = ko.unwrap(valueAccessor());
        items.forEach(function (item)
        {
            App.PageViewModel.SettingsItems.push(item);
        });
        ko.utils.domNodeDisposal.addDisposeCallback(elem, function ()
        {
            App.PageViewModel.SettingsItems.removeAll(items);
        });
    }
};
ko.virtualElements.allowedBindings.AddSettingButton = true;

ko.bindingHandlers.Dispose = {
    init: function (elem, valueAccessor, allBindings, viewModel, bindingContext)
    {
        ko.utils.domNodeDisposal.addDisposeCallback(elem, function ()
        {
            var func = ko.unwrap(valueAccessor());
            func();
        });

    }   
};
ko.virtualElements.allowedBindings.Dispose = true;
