Ext.define('sisprod.store.AllNullificationReasonStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestStatusReasonModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestStatusReasonModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read   : 'POST'
        },
        
        api: {
            read: 'rest/workRequestStatusReason/listAllForNullification.htm'
        },

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
//            root: 'data',
            idProperty: 'idWorkRequestStatus'
//            totalProperty: 'total',
//            messageProperty: 'message'
        }
    }
});