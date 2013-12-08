Ext.define('sisprod.store.WellAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.WellModel'
    ],
    pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/well/listByName.htm'
        },
        
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWell',
            totalProperty: 'total',
            messageProperty: 'message'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});