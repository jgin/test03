Ext.define('sisprod.store.WorkOrderForTaskGeneralSchedulerStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkOrderModel',
    
    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkOrderModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workOrder/listAllForTaskGeneralScheduler.htm'
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