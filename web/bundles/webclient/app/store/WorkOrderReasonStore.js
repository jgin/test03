Ext.define('sisprod.store.WorkOrderReasonStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderReasonModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderReasonModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read: 'POST',
            destroy: 'POST',
            create: 'POST',
            update: 'POST',
            activate: 'POST'
        },
        
        api: {
            read: 'rest/workOrderReason/list.htm',
            destroy: 'rest/workOrderReason/delete.htm',
            create: 'rest/workOrderReason/register.htm',
            update: 'rest/workOrderReason/update.htm',
            activate: 'rest/workOrderReason/activate.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'id',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});