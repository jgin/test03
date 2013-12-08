Ext.define('sisprod.store.BatteryByLotStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BatteryModel',
//    autoLoad: false,
    require: [
        'Ext.data.Store', 
        'sisprod.model.BatteryPerForecastModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/batterys/listByLot.htm'
        },
        
        extraParams: {
            idLot: '-1'
        },
        
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idBattery',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});