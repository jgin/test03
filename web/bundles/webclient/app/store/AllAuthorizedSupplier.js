Ext.define('sisprod.store.AllAuthorizedSupplier', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SupplierModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SupplierModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/suppliers/listAllAuthorized.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSupplier',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});