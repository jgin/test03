Ext.define('sisprod.store.AllWorkShopBySectorStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkShopModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkShopModel'
    ],

    proxy:{
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        api: {
            read: 'rest/workShop/listPagingBySector.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkShop',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});