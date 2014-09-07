ko.bindingHandlers.Loading = 
{
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) 
    {
        var $element = $(element);
        //$element.height("100%");
        //$element.width("100%");
        //$element.css("background-color","yellow");
       
        var dom = '<div style="z-index: 50;"><div class="panel-loading"><div style=" z-index: 53" class="windows8"><div class="wBall wBall_1"><div class="wInnerBall bg-lime"></div></div><div class="wBall wBall_2"><div class="wInnerBall bg-lime"></div></div><div class="wBall wBall_3"><div class="wInnerBall bg-lime"> </div></div> <div class="wBall wBall_4"><div class="wInnerBall bg-lime"></div></div> <div class="wBall wBall_5"><div class="wInnerBall bg-lime"></div></div></div></div></div>';
        $element.append(dom);
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) 
    {
        $(element).toggle(ko.unwrap(valueAccessor()));
    }
};
