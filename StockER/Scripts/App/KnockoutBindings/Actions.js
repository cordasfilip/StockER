ko.bindingHandlers.ActionLink = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var value = valueAccessor();
        var view = ko.unwrap(value);
        var uri = view ? (view == "" ? "#/" : view) : "";
        setTimeout(function ()
        {
            var active = $('a[href$="' + uri + '"]', element);
            active.velocity({ backgroundColor: '#a4c400', color: '#fff' }, { duration: 600 });

            var inactive = $('a[href!="' + uri + '"]', element);
            inactive.velocity({ backgroundColor: '#ffffff', color: '#000' }, { duration: 600 });

        }, 0);
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var value = valueAccessor();
        var view = ko.unwrap(value);
        var uri = view ? (view == "" ? "#/" : view) : "#/";

        setTimeout(function ()
        {
        //    $('a[href$="' + uri + '"]', element).parent().addClass('active');
        //    var inactive = $('a[href!="' + uri + '"]', element).parent();
        //    inactive.velocity('transition.expandIn', { duration: 1000, queue: false, complete: function () { inactive.removeClass('active'); } });
            var active = $('a[href$="' + uri + '"]', element);
            active.velocity({ backgroundColor: '#a4c400', color: '#fff' }, { duration: 600 });

            var inactive = $('a[href!="' + uri + '"]', element);
            inactive.velocity({ backgroundColor: '#ffffff', color: '#000' }, { duration: 600 });
        }, 0);
    }
};