Ext.define('sisprod.store.ProductStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ProductModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ProductModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/products/list.htm',
            destroy:'rest/products/delete.htm',
            create: 'rest/products/register.htm',
            update:'rest/products/update.htm',
            activate: 'rest/products/activate.htm'
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