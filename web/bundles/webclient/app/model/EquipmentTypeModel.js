Ext.define('sisprod.model.EquipmentTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idEquipmentType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'equipmentTypeName', type: 'string', visible: true},
        {name: 'usedInWorkOrder', type: 'boolean', visible: true}
    ],

    idProperty: 'idEquipmentType'
});