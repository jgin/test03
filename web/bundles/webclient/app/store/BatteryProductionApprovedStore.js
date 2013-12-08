Ext.define('sisprod.store.BatteryProductionApprovedStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BatteryProductionModel',
    require: [
        'Ext.data.Store', 
        'sisprod.model.BatteryProductionModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/batteryProduction/listBatteryProductionsApproved.htm',
            destroy: 'rest/batteryProduction/delete.htm',
            create: 'rest/batteryProduction/register.htm',
            update: 'rest/batteryProduction/update.htm',
            activate: 'rest/batteryProduction/activate.htm'
        },
         actionMethods: {
            read: 'POST'
        },        
        reader: {
            type: 'json',
            useSimpleAccessors: false,
            root: 'data',
            idProperty: 'idBatteryProduction',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});