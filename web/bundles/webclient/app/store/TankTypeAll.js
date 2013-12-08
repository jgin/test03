Ext.define('sisprod.store.TankTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.TankTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.TankTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/tankTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idTankType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});