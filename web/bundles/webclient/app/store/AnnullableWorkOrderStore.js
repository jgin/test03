Ext.define('sisprod.store.AnnullableWorkOrderStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderModel'
    ],

//    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read   : 'POST'
        },
        
        api: {
            read: 'rest/workOrder/listAnnullable.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkOrder',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});