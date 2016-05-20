function NewPortfolioWizardViewModel(wizardProp)
{
    var self = this;

    self.Name = ko.observable().extend({required: true});

    self.SelectedIcon = ko.observable("icon-home");

    self.Icons = ko.observableArray(
     [

       "icon-newspaper",     
       "icon-pictures",
       "icon-camera",
       "icon-music",
       "icon-film",
       "icon-camera-2",
       "icon-broadcast",
       "icon-mic",
       "icon-book",
       "icon-file",
       "icon-new",
       "icon-folder-2",    
       "icon-cart",
       "icon-basket",
       "icon-calculate",
       "icon-support",
       "icon-phone",
       "icon-mail",
       "icon-location",
       "icon-clock",
       "icon-bell",
       "icon-mouse",
       "icon-screen",
       "icon-laptop",
       "icon-mobile",
       "icon-cabinet",
       "icon-database",
       "icon-flip",
       "icon-user",
       "icon-wrench",
       "icon-pie",
       "icon-bars",
       "icon-stats-up",
       "icon-gift",
       "icon-trophy",
       "icon-diamond",
       "icon-coffee",
       "icon-rocket",
       "icon-meter-slow",
       "icon-meter-medium",
       "icon-meter-fast",
       "icon-dashboard",
       "icon-fire",
       "icon-lab",
       "icon-remove",
       "icon-briefcase",
       "icon-briefcase-2",
       "icon-cars",
       "icon-bus",
       "icon-cube",
       "icon-cube-2",
       "icon-puzzle",
       "icon-glasses",
       "icon-glasses-2",
       "icon-accessibility",
       "icon-accessibility",
       "icon-target",
       "icon-target-2",
       "icon-lightning",
       "icon-power",
       "icon-power-2",
       "icon-clipboard",
       "icon-clipboard-2",
       "icon-playlist",
       "icon-cloud",
       "icon-cloud-"
     ]);

    self.Add = function ()
    {
        Utils.CloseWindow();
        wizardProp.Deferred.resolve({ Name: self.Name(), Icon: self.SelectedIcon() });

    }

    self.Cancel = function ()
    {
        Utils.CloseWindow();
        wizardProp.Deferred.reject();
    }
}