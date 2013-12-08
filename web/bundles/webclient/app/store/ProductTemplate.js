Ext.define('sisprod.store.ProductTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ProductModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.Product'
    ],
    remoteSort: true,
    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/products/listPaging.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idProduct',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});