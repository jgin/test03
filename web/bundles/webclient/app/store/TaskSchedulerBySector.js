Ext.define('sisprod.store.TaskSchedulerBySector', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.TaskSchedulerModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.TaskSchedulerModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/taskScheduler/listPagingBySector.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idTaskScheduler',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});