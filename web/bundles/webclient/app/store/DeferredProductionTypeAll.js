Ext.define('sisprod.store.DeferredProductionTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DeferredProductionTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DeferredProductionTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/deferredProductionType/listAll.htm'
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