Ext.define('sisprod.store.BatteryProductionStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BatteryProductionModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.BatteryProductionModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/batteryProduction/list.htm',
            destroy: 'rest/batteryProduction/delete.htm',
            create: 'rest/batteryProduction/register.htm',
            update: 'rest/batteryProduction/update.htm',
            activate: 'rest/batteryProduction/activate.htm'
            
        },

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idBatteryProduction',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});