Ext.define('sisprod.store.WorkOrderByWorkRequestStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderModel',
//    autoLoad: false,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workOrder/listByWorkRequest.htm'
        },
         actionMethods: {
            read: 'POST'
        },
        extraParams: {
            idWorkRequest: '-1'
        },
        
        reader: {
            type: 'json',
            useSimpleAccessors: false,
            root: 'data',
            idProperty: 'idWorkOrder',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});