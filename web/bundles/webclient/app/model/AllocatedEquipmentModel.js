Ext.define('sisprod.model.AllocatedEquipmentModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idEquipmentLocationHistory', type: 'int', visible: false},
        {name: 'equipmentName', type: 'string', visible: true, mapping: 'equipment.equipmentName'},
        {name: 'equipmentModel', type: 'string', visible: true, mapping: 'equipment.equipmentModel'},
        {name: 'equipmentCode', type: 'string', visible: true, mapping: 'equipment.equipmentCode'},
        {name: 'serialNumber', type: 'string', visible: true, mapping: 'equipment.serialNumber'},
        {name: 'equipmentTypeName', type: 'String', visible: true, mapping:'equipment.equipmentType.equipmentTypeName'},
        {name: 'lotName', type: 'String', visible: true, mapping:'equipment.lot.lotName'},
        {name: 'locationName', type: 'String', visible: true, mapping:'equipment.location.locationName'}
    ],

    idProperty: 'idEquipment'
});