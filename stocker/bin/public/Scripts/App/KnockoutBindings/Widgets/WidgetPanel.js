ko.bindingHandlers.WidgetPanel = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var value = valueAccessor();
        var settings = ko.unwrap(value);
        var headerVM = { Title:ko.observable(settings.Title) }
        var header = '<div class="panel-header bd-lime"><span class="icon-compass"></span><div data-bind="text:Title"></div></div>';

        return { controlsDescendantBindings: true };
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
       
    }
};
