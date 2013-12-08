Ext.define('sisprod.store.WorkRequestStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestModel'
    ],

    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        
        api: {
            read: 'rest/workRequest/list.htm',
            destroy: 'rest/workRequest/delete.htm',
            create: 'rest/workRequest/register.htm',
            update: 'rest/workRequest/update.htm',
            activate: 'rest/workRequest/activate.htm'
        },

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWorkRequest',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    },
    
    sorters: [{
        property: 'requestDate',
        direction: 'DESC'
    }]
});