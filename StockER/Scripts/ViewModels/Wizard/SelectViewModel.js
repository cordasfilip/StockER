function SelectViewModel(wizard)
{
    var self = this;

    self.Data = null;

    if (wizard.StartData != null)
    {

        var func = wizard.StartData.Name != null ? "r=>{Selected:ko.observable(false),Name:r['" + wizard.StartData.Name + "'],Value:r}" : "r=>{Selected:ko.observable(false),Name:r,Value:r}"

        self.Data = Enumerable.From(wizard.StartData.Items).Select(func).ToArray();
    }

    self.Click = function (item)
    {
        item.Selected(!item.Selected());
    }

    self.OK = function()
    {
        Utils.CloseWindow();
        wizard.Deferred.resolve(Enumerable.From(self.Data).Where("r=>r.Selected()").Select("r=>r.Value").ToArray());
    }

    self.Cancel = function ()
    {
        Utils.CloseWindow();
        wizard.Deferred.reject();
    }
}