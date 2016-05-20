function WorldMarkesGridWidgetViewModel(widget)
{
    var self = this;
    self.WorldMarkets = ko.observableArray();
   
    widget.Data.done(
        function (data)
        {
            self.WorldMarkets(data.ToArray());
            widget.Loading(false);
        });
}