Ext.define('sisprod.store.TaskGeneralSchedulerStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.TaskGeneralSchedulerModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.TaskGeneralSchedulerModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read: 'POST',
            destroy: 'POST',
            create: 'POST',
            update: 'POST'
        },
        
        api: {
            read: 'rest/taskGeneralScheduler/list.htm',
            destroy: 'rest/taskGeneralScheduler/delete.htm',
            create: 'rest/taskGeneralScheduler/register.htm',
            update: 'rest/taskGeneralScheduler/update.htm',
            activate: 'rest/taskGeneralScheduler/activate.htm'
        },

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idTaskGeneralScheduler',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});