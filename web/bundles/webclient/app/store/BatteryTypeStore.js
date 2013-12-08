Ext.define('sisprod.store.BatteryTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BatteryTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.BatteryTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/batteryTypes/list.htm',
            destroy:'rest/batteryTypes/delete.htm',
            create:'rest/batteryTypes/register.htm',
            update:'rest/batteryTypes/update.htm',
            activate: 'rest/batteryTypes/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idBatteryType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});