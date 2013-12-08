Ext.define('sisprod.store.SchedulingWorkRequestStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestScheduleModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestScheduleModel'
    ],

//    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read   : 'POST'
        },
        
        api: {
            read: 'rest/workRequest/listAllForScheduling.htm'
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