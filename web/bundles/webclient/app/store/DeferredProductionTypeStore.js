Ext.define('sisprod.store.DeferredProductionTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DeferredProductionTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DeferredProductionTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/deferredProductionType/list.htm',
            destroy: 'rest/deferredProductionType/delete.htm',
            create: 'rest/deferredProductionType/register.htm',
            update: 'rest/deferredProductionType/update.htm',
            activate: 'rest/deferredProductionType/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idDeferredProductionType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});