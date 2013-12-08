Ext.define('sisprod.store.GasSaleStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.GasSaleModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.GasSaleModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/gasSale/list.htm',
            destroy: 'rest/gasSale/delete.htm',
            create: 'rest/gasSale/register.htm',
            update: 'rest/gasSale/update.htm',
            activate: 'rest/gasSale/activate.htm'
        },
        url: 'rest/gasSale/list.htm',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idGasSale',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});