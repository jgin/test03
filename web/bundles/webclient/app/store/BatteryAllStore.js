Ext.define('sisprod.store.BatteryAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BatteryModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.BatteryModel'
    ],
  

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/batterys/listAll.htm'
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