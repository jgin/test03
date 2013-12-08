Ext.define('sisprod.store.TankTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.TankTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.TankTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/tankTypes/list.htm',
            destroy:'rest/tankTypes/delete.htm',
            create:'rest/tankTypes/register.htm',
            update:'rest/tankTypes/update.htm',
            activate: 'rest/tankTypes/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idTankType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});