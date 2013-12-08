Ext.define('sisprod.store.BatteryStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BatteryModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.BatteryModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/batterys/list.htm',
            destroy:'rest/batterys/delete.htm',
            create:'rest/batterys/register.htm',
            update:'rest/batterys/update.htm',
            activate: 'rest/batterys/activate.htm'
        },
        reader: {
            type: 'json',
            //useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idBattery',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});