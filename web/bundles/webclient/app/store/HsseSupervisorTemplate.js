Ext.define('sisprod.store.HsseSupervisorTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.HsseSupervisorModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.HsseSupervisorModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/hsseSupervisor/listPagingByName.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idHsseSupervisor',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});