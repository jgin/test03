Ext.define('sisprod.store.SystemAuditStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SystemAuditModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SystemAuditModel'
    ],
    
    remoteSort : true,
    
    sorters: [{
       property: 'eventDate',
       direction: 'DESC'
    }],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/systemAudit/list.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'systemAuditId',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});