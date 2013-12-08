Ext.define('sisprod.store.HsseSupervisorStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.HsseSupervisorModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.HsseSupervisorModel'
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
            read: 'rest/hsseSupervisor/list.htm',
            destroy: 'rest/hsseSupervisor/delete.htm',
            create: 'rest/hsseSupervisor/register.htm',
            update: 'rest/hsseSupervisor/update.htm',
            activate: 'rest/hsseSupervisor/activate.htm'
        },

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idHsseSupervisor',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});