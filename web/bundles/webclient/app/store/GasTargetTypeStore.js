Ext.define('sisprod.store.GasTargetTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.GasTargetTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.GasTargetTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/gasTargetTypes/list.htm',
            destroy: 'rest/gasTargetTypes/delete.htm',
            create: 'rest/gasTargetTypes/register.htm',
            update: 'rest/gasTargetTypes/update.htm',
            activate: 'rest/gasTargetTypes/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idGasTargetType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});