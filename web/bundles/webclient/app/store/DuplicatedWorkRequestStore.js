Ext.define('sisprod.store.DuplicatedWorkRequestStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DuplicatedWorkRequestModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DuplicatedWorkRequestModel'
    ],

//    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        
        api: {
            read: 'rest/workRequest/listDuplicated.htm'
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