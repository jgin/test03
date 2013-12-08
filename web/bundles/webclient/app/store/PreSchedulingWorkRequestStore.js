Ext.define('sisprod.store.PreSchedulingWorkRequestStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestModel'
    ],

//    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read   : 'POST'
        },
        
        api: {
            read: 'rest/workRequest/listAllForPreScheduling.htm'
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