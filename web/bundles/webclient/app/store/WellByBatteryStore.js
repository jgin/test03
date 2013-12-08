Ext.define('sisprod.store.WellByBatteryStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellModel',
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/well/listByBattery.htm'
        },
        
        extraParams: {
            idBattery: '-1'
        },
        
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWell',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});