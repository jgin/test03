Ext.define('sisprod.model.DuplicatedWorkRequestModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkRequest', type: 'int', visible: false},
        {name: 'idWorkRequestSource', type: 'int', visible: false, mapping: 'workRequestSource.idWorkRequestSource'},
        {name: 'workRequestSource.workRequestSourceName', type: 'string', visible: true, mapping: 'workRequestSource.workRequestSourceName'},
        {name: 'idLocation', type: 'int', visible: false, mapping: 'location.idLocation'},
        {name: 'location.locationName', type: 'string', visible: true, mapping: 'location.locationName'},
        {name: 'idEquipment', type: 'int', visible: false, mapping: 'equipment.idEquipment'},
        {name: 'equipment.equipmentName', type: 'string', visible: true, mapping: 'equipment.equipmentName'},
        {name: 'workCategoryDetail.idWorkCategoryDetail', type: 'string', visible: false, mapping: 'workCategoryDetail.idWorkCategoryDetail'},
        {name: 'workCategoryDetail.workCategoryDetailName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategoryDetailName'},
        {name: 'workRequestFullNumber', type: 'string', visible: true},
        {name: 'requestDate', type: 'date', dateFormat: 'Y-m-d', visible: true},
        {name: 'description', type: 'string', visible: false}
    ],

    idProperty: 'idWorkRequest'
});