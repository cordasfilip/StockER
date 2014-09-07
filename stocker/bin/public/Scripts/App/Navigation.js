App.Navigation = App.Navigation ||new (function ()
{
    var self = this;

    self.Url = ko.observable("");

    self.NavigationSettings =
        {
            Element:'#page-content-wrapper',
            Default: { Controller: "Dashboard", Action: "Index", Params: {} },
            PageAnimationIn: { opacity: 1 },//'transition.swoopIn',
            PageAnimationOut: { opacity: 0 } //'transition.swoopOut',
        };
    var defaultPage = self.NavigationSettings.Default;

    self.ViewReady = ko.observable(false);



    self.NavigationHelpers =
    {
        SetView: function (template, params)
        {
            var found = $('#' + template).length>0;

            if (found)
            {
                App.PageViewModel.View(
                {
                    Template: template,
                    Id:params.id,
                    Params: ko.observable(params)
                });
            } else
            {
                App.PageViewModel.View(
                {
                    Template: "View-NotFound",
                    Params: ko.observable()
                });
            }
            
        },
        NavigateToPage: function (controller,action,params)
        {
           
            var template = "View-" + controller + '-' + action;
            
            self.Url(window.location.hash);
            if (App.PageViewModel.View() != null)
            {
                if (App.PageViewModel.View().Template == template && params.id == App.PageViewModel.View().Params().id)
                {
                    App.PageViewModel.View().Params(params);
                } else
                {
                   
                    self.ViewReady(false);
                    $(self.NavigationSettings.Element).velocity(self.NavigationSettings.PageAnimationOut,{
                        duration: 400,
                        complete:
                            function ()
                            {
                               self.NavigationHelpers.SetView(template, params)
                            }
                    });
                }
            } else
            {
                self.ViewReady(false);
                self.NavigationHelpers.SetView(template, params);
            }      
        }
    }

    self.Sammy = $.sammy(function ()
    {
        this.get('/', function ()
        {
            self.NavigationHelpers.NavigateToPage(defaultPage.Controller, defaultPage.Action, defaultPage.Params);
        });

        this.get('#/', function ()
        {     
            self.NavigationHelpers.NavigateToPage(defaultPage.Controller, defaultPaget.Action, defaultPage.Params);
        });

        this.get('#/:Controller', function()
        {
            var controller = this.params['Controller'];
            self.NavigationHelpers.NavigateToPage(controller, defaultPage.Action, this.params)
        });

        this.get('#/:Controller/:Action', function ()
        {
            var controller = this.params['Controller'];
            var action = this.params['Action'];
            self.NavigationHelpers.NavigateToPage(controller, action, this.params);
        });

        this.get('#/:Controller/:Action/:id', function ()
        {        
            var controller = this.params['Controller'];
            var action = this.params['Action'];
            self.NavigationHelpers.NavigateToPage(controller, action, this.params);
        });

        this.get('', function ()
        {
            self.NavigationHelpers.NavigateToPage(defaultPage.Controller, defaultPage.Action, defaultPage.Params);
        });
    });
    

    self.ViewRenderDone = function ()
    {
        App.Loading(false);
        $(self.NavigationSettings.Element).velocity(self.NavigationSettings.PageAnimationIn,
        {
            duration: 400,
            complete:
                function ()
                {

                    self.ViewReady(true);
                }
        });
    };
})();