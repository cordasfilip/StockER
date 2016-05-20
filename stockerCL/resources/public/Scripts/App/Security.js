function LoginViewModel()
{
    var self = this;

    self.Username = ko.observable().extend({ required: true });

    self.Password = ko.observable().extend({ required: true });

    self.ErrorMessage = ko.observable();

    self.IsValid = ko.computed(function () { return (!self.Password.isValid() && !self.Username.isValid()); });
   
    self.Token = ko.observable();
  
    self.Login = function ()
    {
        App.Security.Operations.GetApiTokenAsync(self.Username(), self.Password()).done(
            function (token)
            {
                self.Token(token.access_token);
                App.Security.Operations.LoginWeb();               
            }).fail(
            function (message)
            {
                self.ErrorMessage(message);
            });
    }
}


App.Security = App.Security ||
{
    ShowLogin:function()
    {
        $.Dialog({
            overlay: true,
            shadow: true,
            flat: true,
            modal: true,
            icon: '<i style="padding:3px;font-size: 1em !important;" class="icon-xing"></i>',
            title: 'Login',
            content: "<div id='Login' data-bind='template: { name: 'person-template', data: buyer }'></div>",
            padding: 10,
            onShow: function (_dialog)
            {
                var login = new LoginViewModel();
                ko.renderTemplate("Login", login, null, $(".content", _dialog[0])[0], "replaceChildren");
            }
        });

    },

    Operations:
    {       
        LoginWeb: function ()
        {                        
            document.forms["login"].submit();
        },
        GetApiTokenAsync: function (username, password)
        {
           
            //var def = new $.Deferred();
           
           return  $.ajax(
           {
               type: "POST",
               url: (App.Uri.NorthwindApi + "/Token"),             
               dataType: 'json',
               cache:false,
               data:
                   {
                       "grant_type": "password",
                       "username": username,
                       "password": password,
                       "suppress_response_codes": true
                   },
               headers:
               {
                   "Content-Type": "application/x-www-form-urlencoded"
               },
               //success:function(data)
               //{
               //    def.resolve(data);
               //},
               //error: function (e)
               //{
               //    def.reject(e);
               //}
           });
            //return def;
        },
        SetTokenAsync: function ()
        {
            var def = new $.Deferred();
            $.ajax({
                type: "GET",
                url: (App.Uri.NorthwindWeb + "/Account/GetToken"),
                dataType: "json",
                cache: false,
            }).success(function (token)
            {
                $.ajaxPrefilter(function (options, originalOptions, jqXHR)
                {
                    if (!options.headers)
                    {
                        options.headers = { Authorization: "Bearer " + token };
                    } else
                    { options.headers.Authorization = "Bearer " + token; }
                });
                def.resolve();
            }).error(function (e)
            {
                location = "Account/Login";
            });
            return def;
        }
    }
}
