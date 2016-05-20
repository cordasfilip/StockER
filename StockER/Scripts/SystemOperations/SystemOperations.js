App.SystemOperations =
{
   
    NMF: (function ()
    {
        var self = this;
        var hub = $.connection.nmfSOHub;

        self.IsBusy = hub.server.isBusy;
        self.CalculateNfmAsync = function (portfolioId, startDate, endDate, interval, nf, iter)
        {

            return $.ajax(
                     {
                         type: "GET",
                         url: (App.Uri.DataService + "/api/SystemOperations/NMF"),
                         contentType: 'application/json',
                         data: { portfolioId: portfolioId, startDate: startDate, endDate: endDate, interval: interval, nf: nf, iter: iter }
                     });
        }

        $.connection.nmfSOHub.client.Started = function (id,value)
        {                 
            $(App.SystemOperations.NMF).trigger("Started", [id, value]);
        }

        $.connection.nmfSOHub.client.Ended = function (id,value)
        {          
            $(App.SystemOperations.NMF).trigger("Ended", [id, value]);
        }

        return self;
    })()
}