Ext.define('sisprod.store.BatteryTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BatteryTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.BatteryTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/batteryTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idBatteryType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});