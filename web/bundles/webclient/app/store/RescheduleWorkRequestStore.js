Ext.define('sisprod.store.RescheduleWorkRequestStore', {
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
            read: 'rest/workRequest/listAllForReschedule.htm'
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