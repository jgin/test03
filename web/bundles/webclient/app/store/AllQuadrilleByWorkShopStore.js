Ext.define('sisprod.store.AllQuadrilleByWorkShopStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.QuadrilleModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.QuadrilleModel'
    ],

    proxy:{
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        api: {
            read: 'rest/quadrille/listPagingByWorkShop.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idQuadrille',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});