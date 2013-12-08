Ext.define('sisprod.store.DeferredProductionStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DeferredProductionModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DeferredProductionModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/deferredProduction/list.htm',
            destroy:'rest/deferredProduction/delete.htm',
            create:'rest/deferredProduction/register.htm',
            update:'rest/deferredProduction/update.htm',
            activate:'rest/deferredProduction/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idDeferredProduction',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});