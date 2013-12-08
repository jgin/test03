Ext.define('sisprod.store.WorkRequestStatusStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestStatusModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestStatusModel'
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
            read: 'rest/workRequestStatus/list.htm',
            destroy: 'rest/workRequestStatus/delete.htm',
            create: 'rest/workRequestStatus/register.htm',
            update: 'rest/workRequestStatus/update.htm',
            activate: 'rest/workRequestStatus/activate.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWorkRequestStatus',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});