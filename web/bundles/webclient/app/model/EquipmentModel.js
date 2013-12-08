Ext.define('sisprod.model.EquipmentModel', {
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
        {name: 'supplier.idSupplier', type: 'int', visible: false, mapping:'supplier.idSupplier'},
        {name: 'supplier.entity.entityName', type: 'String', visible: true, mapping:'supplier.entity.entityName'},
        {name: 'equipmentType.idEquipmentType', type: 'int', visible: false, mapping:'equipmentType.idEquipmentType'},
        {name: 'equipmentType.equipmentTypeName', type: 'String', visible: true, mapping:'equipmentType.equipmentTypeName'},
        {name: 'mark.idMark', type: 'int', visible: false, mapping:'mark.idMark'},
        {name: 'mark.markName', type: 'String', visible: true, mapping:'mark.markName'},
        {name: 'lot.idLot', type: 'int', visible: false, mapping:'lot.idLot'},
        {name: 'lot.lotName', type: 'String', visible: true, mapping:'lot.lotName'},
        {name: 'location.idLocation', type: 'int', visible: false, mapping:'location.idLocation'},
        {name: 'location.locationName', type: 'String', visible: true, mapping:'location.locationName'},
        {name: 'equipmentCondition.idEquipmentCondition', type: 'int', visible: false, mapping:'equipmentCondition.idEquipmentCondition'},
        {name: 'equipmentCondition.equipmentConditionName', type: 'String', visible: true, mapping:'equipmentCondition.equipmentConditionName'},
        {name: 'equipmentParent.idEquipment', type: 'int', visible: false, mapping:'equipmentParent.idEquipment'},
        {name: 'equipmentParent.equipmentName', type: 'String', visible: true, mapping:'equipmentParent.equipmentName'},
        {name: 'supplierName', type: 'String', visible: true, mapping:'supplier.entity.entityName'}
    ],

    idProperty: 'idEquipment'
});