Ext.define('sisprod.model.EquipmentTempModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idEquipment', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'equipmentName', type: 'string', visible: true},
        {name: 'equipmentModel', type: 'string', visible: true},
        {name: 'equipmentCode', type: 'string', visible: true},
        {name: 'serialNumber', type: 'string', visible: true},
        {name: 'idLocation', type: 'int', visible: false, mapping:'location.idLocation'},
        {name: 'locationName', type: 'string', visible: true, mapping:'location.locationName'}
    ],

    idProperty: 'idEquipment'
});