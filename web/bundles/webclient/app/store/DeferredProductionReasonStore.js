Ext.define('sisprod.store.DeferredProductionReasonStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DeferredProductionReasonModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DeferredProductionReasonModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/deferredProductionReason/list.htm',
            destroy:'rest/deferredProductionReason/delete.htm',
            create:'rest/deferredProductionReason/register.htm',
            update:'rest/deferredProductionReason/update.htm',
            activate:'rest/deferredProductionReason/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idDeferredProductionReason',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});