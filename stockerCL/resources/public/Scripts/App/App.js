var App = App ||
{
    Loading:ko.observable(true),
    Uri:
    {
        DataService: "http://localhost:3000"
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
