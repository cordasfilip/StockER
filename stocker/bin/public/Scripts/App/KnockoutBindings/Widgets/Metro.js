ko.bindingHandlers.metroDropdown = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        $(element).dropdown();
       
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {

    }
};

ko.bindingHandlers.TileExpande = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {
        var open = false;
        var height = $(element).height();
        $(".expande-button", element).click(function ()
        {
            if (open)
            {
                $(element).velocity({ height: height + 20 }, 400);
                $(".expande-button i", element).addClass("icon-arrow-down-3");
                $(".expande-button i", element).removeClass("icon-arrow-up-3");
            }
            else
            {
                $(element).velocity({ height: ((height * 2) + 52) }, 400);
               
                $(".expande-button i", element).removeClass("icon-arrow-down-3");
                $(".expande-button i", element).addClass("icon-arrow-up-3");
            }
            open = !open;

        });

    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext)
    {

    }
};