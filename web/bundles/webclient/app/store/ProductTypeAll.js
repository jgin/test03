Ext.define('sisprod.store.ProductTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ProductTypeModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.ProductTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/productTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idProductType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});