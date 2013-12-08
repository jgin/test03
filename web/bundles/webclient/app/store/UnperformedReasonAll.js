Ext.define('sisprod.store.UnperformedReasonAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.UnperformedReasonModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.UnperformedReasonModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/unperformedReason/listAll.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idUnperformedReason',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});