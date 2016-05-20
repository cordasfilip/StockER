App.SystemOperations =
{
    NMF: function (portfolioId, startDate, endDate, interval, nf, iter)
    {
       
        return $.ajax(
                 {
                     type: "GET",
                     url: (App.Uri.DataService + "/api/SystemOperations/NMF"),
                     contentType: 'application/json',
                     data: { portfolioId: portfolioId, startDate: startDate, endDate: endDate, interval: interval, nf: nf ,iter:iter}
                 });
    }
}