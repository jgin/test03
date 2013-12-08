Ext.define('sisprod.store.ProgramBatteryStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BatteryModel',
    
    require: [
        'Ext.data.Store', 
        'sisprod.model.BatteryPerForecastModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/testProgram/listProgramBattery.htm'
        },
        
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idBattery',
            totalProperty: 'total',
            messageProperty: 'message'
        },
        
        extraParams: {
            showNoProgram : false
        }
    }
});