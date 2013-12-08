Ext.define('sisprod.store.EntityTemplateStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EntityModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EntityModel'
    ],

    pageSize: 10,

    proxy:{
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