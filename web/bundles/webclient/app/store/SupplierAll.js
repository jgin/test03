Ext.define('sisprod.store.SupplierAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SupplierModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SupplierModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/suppliers/listAll.htm'
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