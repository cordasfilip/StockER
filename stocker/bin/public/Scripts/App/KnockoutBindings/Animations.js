ko.bindingHandlers.AnimateSwoopItem = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        //var value = valueAccessor();
        //$(element).toggle(ko.unwrap(true));
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        //var value = valueAccessor();
        //var duration =100+ Math.random()* 500;
        //ko.unwrap(value) ? $(element).velocity('transition.swoopIn', { duration: duration }) : $(element).velocity('transition.swoopOut', { duration: duration });

    }
};

ko.bindingHandlers.AnimateSwoopPanels = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        //var value = valueAccessor();
        //$('.panel', element).velocity({ opacity: 0 },{duration:0});
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        //var value = valueAccessor();
        ////var panels = $('.panel', element);
        //var animation = ko.unwrap(value) ? 'transition.expandIn' : 'transition.expandOut';

        //if (ko.unwrap(value))
        //{
        //    $.velocity().d
        //    $('.panel', element).velocity({
        //        opacity: 0, duration: 0, completed: function ()
        //        {
        //            $('.panel', element).velocity(animation, { stagger: 200 });
        //        }
        //    });
        //}
    }
};

ko.bindingHandlers.AnimateTada = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var value = valueAccessor();
        //$('.panel', element).velocity({ opacity: 0 },{duration:0});
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var value = valueAccessor();
        ko.unwrap(value)
        $('.tile', element).velocity('callout.swing');
    }
};
