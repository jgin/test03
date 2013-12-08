Ext.define('sisprod.store.TankAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.TankModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.TankModel'
    ],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/tanks/listAllSales.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idTank',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});