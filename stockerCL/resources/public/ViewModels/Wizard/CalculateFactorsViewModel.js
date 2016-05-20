function CalculateFactorsViewModel(wizard)
{
    var self = this;

    var portfolioId = wizard.StartData.PortfolioId;

    self.Intervals = [{ Name: "Day", Value: "d" }, { Name: "Weak", Value: "w" }, { Name: "Month", Calue: "m" }];

    self.StartDate = ko.observable();

    self.EndDate = ko.observable();

    self.Interval = ko.observable();

    self.NOF = ko.observable(1);

    self.Iter = ko.observable(5);

    self.Calculate = function ()
    {
        self.Loading(true);
        var startDate= kendo.toString(self.StartDate(), "yyyy-MM-dd") ;
        var endDate= kendo.toString(self.EndDate(), "yyyy-MM-dd") ;
        App.SystemOperations.NMF(portfolioId, startDate, endDate, self.Interval(), self.NOF(), self.Iter())
            .done(function ()
            {
                self.Loading(false);
                Utils.ShowSuccess("Calculation done");
                Utils.CloseWindow();
                wizard.Deferred.resolve();
            }).fail(function ()
            {
                Utils.ShowError("Calculation fail");
                self.Loading(false);
                wizard.Deferred.reject();
            });
    }

    self.Cancel = function ()
    {
        Utils.CloseWindow();
        wizard.Deferred.reject();
    }

    self.Loading = ko.observable(false);
}