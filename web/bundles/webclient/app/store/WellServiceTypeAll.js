Ext.define('sisprod.store.WellServiceTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellServiceTypeModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.WellServiceTypeModel'
    ],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/wellServiceType/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWellServiceType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});