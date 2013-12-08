Ext.define('sisprod.store.DeferredProductionReasonAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DeferredProductionReasonModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.DeferredProductionReasonModel'
    ],
    
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/deferredProductionReason/listAll.htm'
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