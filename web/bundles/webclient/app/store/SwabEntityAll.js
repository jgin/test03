Ext.define('sisprod.store.SwabEntityAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EntityModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.EntityModel'
    ],
    
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/sdpCompanies/listPagingBySwabEntity.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'entityId',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});