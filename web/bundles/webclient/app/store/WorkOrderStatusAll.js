Ext.define('sisprod.store.WorkOrderStatusAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderStatusModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderStatusModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/workOrderStatus/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkOrderStatus',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});