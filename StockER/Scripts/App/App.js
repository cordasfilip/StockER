var App = App ||
{
    Loading:ko.observable(true),
    Uri:
    {
        DataServiceTest: "http://localhost:3000",
        DataService:""
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
