Ext.define('sisprod.store.EquipmentConditionStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentConditionModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentConditionModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/equipmentConditions/list.htm',
            destroy: 'rest/equipmentConditions/delete.htm',
            create: 'rest/equipmentConditions/register.htm',
            update: 'rest/equipmentConditions/update.htm',
            activate: 'rest/equipmentConditions/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idEquipmentCondition',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});