Ext.define('sisprod.store.EntityAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EntityModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.EntityModel'
    ],
    
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/entity/listPagingByEntity.htm'
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