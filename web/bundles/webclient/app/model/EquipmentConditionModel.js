Ext.define('sisprod.model.EquipmentConditionModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idEquipmentCondition', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'equipmentConditionName', type: 'string', visible: true},
        {name: 'equipmentConditionAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idEquipmentCondition'
});