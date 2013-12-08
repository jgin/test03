Ext.define('sisprod.store.WorkOrderStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workOrder/listAllForCoordinator.htm'
        },
         actionMethods: {
            read: 'POST'
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