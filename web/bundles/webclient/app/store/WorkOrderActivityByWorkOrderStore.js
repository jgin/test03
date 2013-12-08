Ext.define('sisprod.store.WorkOrderActivityByWorkOrderStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderActivityModel',
//    autoLoad: false,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderActivityModel'
    ],

    proxy:{
        type: 'ajax',
        async: false,
        api: {
            read: 'rest/workOrderActivity/listByWorkOrder.htm'
        },
        
        extraParams: {
            idWorkOrder: '-1',
            isPlanned: false
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