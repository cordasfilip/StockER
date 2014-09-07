var Html =
    {
        RenderPartial: function (uri)
        {
            $.ajax(
                {
                    url: uri,
                    async: false,
                    dataType: 'html'
                }).success(
                function (data)
                {
                    $('body').append(data);
                });
        },
        KendoTemplate: function (name)
        {
            return $("#"+name).html();
        }
    };
var Utils =
    {
        Colors: ["#a4c400", "#7b9300", "#8ca702", "#b1d400", "#bee201", "#536301", "#e3f681", "#a8e04d"],

        GetModColor: function (index)
        {
            return Utils.Colors[index % Utils.Colors.length];
        },

        NotFound: function() { location = "#/NotFound" },

        ShowWindow: function (template,startData)
        {
            var def = new $.Deferred();
            var $template = $('#Wizard-' + template);
            var title = $template.attr("data-title");
            var icon = '<i class="'+$template.attr("data-icon")+'"></i>';
            var height = $template.attr("data-height");
            var width = $template.attr("data-width");
            var html = $template.html();
            var vm = { Deferred: def, StartData: startData };

            $.Dialog({
                  overlay: true,
                  shadow: false,
                  flat: true,
                  icon: icon,
                  title: title,
                  height: height,
                  width:width,
                  content: $template.html(),
                  onShow: function (dialog)
                  {
                      ko.applyBindings(vm, dialog[0]);
                  }
            });
            return def;
        },

        CloseWindow: $.Dialog.close,
        
        ShowInfo: function (message)
        {
            toastr.info(message, "Info", { "timeOut": "3000", "positionClass": "toast-bottom-right" });
        },

        ShowSuccess: function (message)
        {
            toastr.success(message, "Success", { "timeOut": "3000", "positionClass": "toast-bottom-right" });
        },

        ShowError: function (message,error)
        {
            toastr.error(message, "Error", { "timeOut": "3000", "positionClass": "toast-bottom-right" });
        }
    }