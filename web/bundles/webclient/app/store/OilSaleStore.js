Ext.define('sisprod.store.OilSaleStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.OilSaleModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.OilSaleModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/oilSale/list.htm',
            destroy: 'rest/oilSale/delete.htm',
            create: 'rest/oilSale/register.htm',
            update: 'rest/oilSale/update.htm',
            activate: 'rest/oilSale/activate.htm'
        },
        url: 'rest/oilSale/list.htm',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idOilSale',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});