var App = App ||
{
    Loading:ko.observable(true),
    Uri:
    {
        NorthwindWeb: "http://192.168.1.102/NorthwindWeb",
        NorthwindApi: "http://192.168.1.102/NorthwindApi",
        NorthwindApiHttps: "https://192.168.1.102/NorthwindApi"
    },
    DataAccess:{},
    Data:{}
};
ko.validation.configure({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
});
