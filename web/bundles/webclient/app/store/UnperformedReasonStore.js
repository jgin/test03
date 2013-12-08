Ext.define('sisprod.store.UnperformedReasonStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.UnperformedReasonModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.UnperformedReasonModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/unperformedReason/list.htm',
            destroy: 'rest/unperformedReason/delete.htm',
            create: 'rest/unperformedReason/register.htm',
            update: 'rest/unperformedReason/update.htm',
            activate: 'rest/unperformedReason/activate.htm'
        },
//        url:'rest/unperformedReason/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idUnperformedReason',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});