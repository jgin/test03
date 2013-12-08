Ext.define('sisprod.model.MobileUnitModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idMobileUnit', type: 'int', visible: false},
        {name: 'idEquipment', type: 'int', visible: false, mapping:'equipment.idEquipment'}, // Ext.data.Types.FLOAT
        {name: 'equipmentName', type: 'string', visible: true, mapping:'equipment.equipmentName'},
        {name: 'equipmentModel', type: 'string', visible: true, mapping:'equipment.equipmentModel'},
        {name: 'equipmentCode', type: 'string', visible: true, mapping:'equipment.equipmentCode'},
        {name: 'serialNumber', type: 'string', visible: true, mapping:'equipment.serialNumber'},
        {name: 'supplier.idSupplier', type: 'int', visible: false, mapping:'equipment.supplier.idSupplier'},
        {name: 'supplier.entity.entityName', type: 'String', visible: true, mapping:'equipment.supplier.entity.entityName'},
        {name: 'equipmentType.idEquipmentType', type: 'int', visible: false, mapping:'equipment.equipmentType.idEquipmentType'},
        {name: 'equipmentType.equipmentTypeName', type: 'String', visible: true, mapping:'equipment.equipmentType.equipmentTypeName'},
        {name: 'mark.idMark', type: 'int', visible: false, mapping:'equipment.mark.idMark'},
        {name: 'mark.markName', type: 'String', visible: true, mapping:'equipment.mark.markName'},
        {name: 'lot.idLot', type: 'int', visible: false, mapping:'equipment.lot.idLot'},
        {name: 'lot.lotName', type: 'String', visible: true, mapping:'equipment.lot.lotName'},
        {name: 'location.idLocation', type: 'int', visible: false, mapping:'equipment.location.idLocation'},
        {name: 'location.locationName', type: 'String', visible: true, mapping:'equipment.location.locationName'},
        {name: 'equipmentCondition.idEquipmentCondition', type: 'int', visible: false, mapping:'equipment.equipmentCondition.idEquipmentCondition'},
        {name: 'equipmentCondition.equipmentConditionName', type: 'String', visible: true, mapping:'equipment.equipmentCondition.equipmentConditionName'},
        {name: 'equipmentParent.idEquipment', type: 'int', visible: false, mapping:'equipment.equipmentParent.idEquipment'},
        {name: 'equipmentParent.equipmentName', type: 'String', visible: true, mapping:'equipment.equipmentParent.equipmentName'},
        {name: 'own', type: 'boolean', visible: true}
    ],

    idProperty: 'idMobileUnit'
});