Ext.define('sisprod.store.ProductTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ProductTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ProductTypeModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/productTypes/list.htm',
            destroy: 'rest/productTypes/delete.htm',
            create: 'rest/productTypes/register.htm',
            update: 'rest/productTypes/update.htm',
            activate: 'rest/productTypes/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idProductType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});