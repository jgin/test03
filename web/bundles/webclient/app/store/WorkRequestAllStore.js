Ext.define('sisprod.store.WorkRequestAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestAllModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestAllModel'
    ],

    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workRequest/listAllWorkRequest.htm'
        },
        
        actionMethods: {
            read   : 'POST'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkRequest',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});