Ext.define('login.Application', {
    name: 'login',

    extend: 'Ext.app.Application',

    appFolder: 'login',

    views: [
        'login.view.Login'
    ],

    controllers: [
        'login.controller.Login'
    ],

    stores: [
        // TODO: add stores here
    ],
    
    messages: {
        messageText: 'Message',
        browserCompatibilityText: 'This browser is not supported. Please use Internet Explorer 9, Google Chrome or Mozilla Firefox!'
    },
    
    init: function(){
        var me = this;
        me.on('getImagePath', me.getImagePath, me);
    },
    
    getImagePath: function(fileName){
        return Ext.String.format(global.resources.baseUrl+'/resources/images/{0}', fileName);
    }
});
