Ext.define('sisprod.store.AllCoordinatorByWorkShopStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkShopCoordinatorModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkShopCoordinatorModel'
    ],

    proxy:{
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        api: {
            read: 'rest/workShopCoordinator/listPagingByWorkShop.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkShopCoordinator',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});