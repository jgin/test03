Ext.define('sisprod.store.AllNullificationOrderReasonStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderStatusReasonModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderStatusReasonModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read   : 'POST'
        },
        
        api: {
            read: 'rest/workOrderStatusReason/listAllForNullification.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkOrderStatus'
        }
    }
});