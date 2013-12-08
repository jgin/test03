Ext.define('sisprod.store.EquipmentConditionAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentConditionModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentConditionModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/equipmentConditions/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idEquipmentCondition',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});