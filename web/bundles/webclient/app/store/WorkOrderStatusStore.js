Ext.define('sisprod.store.WorkOrderStatusStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderStatusModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderStatusModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        
        api: {
            read: 'rest/workOrderStatus/list.htm',
            destroy: 'rest/workOrderStatus/delete.htm',
            create: 'rest/workOrderStatus/register.htm',
            update: 'rest/workOrderStatus/update.htm',
            activate: 'rest/workOrderStatus/activate.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWorkOrderStatus',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});