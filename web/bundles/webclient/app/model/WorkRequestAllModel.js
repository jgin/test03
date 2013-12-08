Ext.define('sisprod.model.WorkRequestAllModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkRequest', type: 'int', visible: false},
        {name: 'idLot', type: 'int', visible: false, mapping: 'lot.idLot'},
        {name: 'lot.lotName', type: 'string', visible: true, mapping: 'lot.lotName'},
        {name: 'idWorkRequestSource', type: 'int', visible: false, mapping: 'workRequestSource.idWorkRequestSource'},
        {name: 'workRequestSourceName', type: 'string', visible: true, mapping: 'workRequestSource.workRequestSourceName'},
        {name: 'idWorkCategory', type: 'string', visible: false, mapping: 'workCategoryDetail.workCategory.idWorkCategory'},
        {name: 'workCategoryName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategory.workCategoryName'},
        {name: 'idWorkCategoryDetail', type: 'string', visible: false, mapping: 'workCategoryDetail.idWorkCategoryDetail'},
        {name: 'workCategoryDetailName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategoryDetailName'},
        {name: 'idDependency', type: 'int', visible: false, mapping: 'dependency.idDependency'},
        {name: 'dependency.dependencyName', type: 'string', visible: false, mapping: 'dependency.dependencyName'},
        {name: 'idEmployee', type: 'int', visible: false, mapping: 'dependency.idDependency'},
        {name: 'taskSchedulerName', type: 'string', visible: false, mapping: 'taskScheduler.employee.person.personFullName'},        
        
        {name: 'applicantFullName', type: 'string', visible: true},
        {name: 'recipientFullName', type: 'string', visible: false},
        {name: 'idLocation', type: 'int', visible: false, mapping: 'location.idLocation'},
        {name: 'location.locationName', type: 'string', visible: true, mapping: 'location.locationName'},
        {name : 'idSector', type: 'int', visible: false, mapping: 'sector.idSector'},
        {name : 'sectorName', type: 'string', visible: false, mapping: 'sector.sectorName'},
        {name: 'idEquipment', type: 'int', visible: false, mapping: 'equipment.idEquipment'},
        {name: 'equipment.equipmentName', type: 'string', visible: true, mapping: 'equipment.equipmentName'},
        {name: 'workRequestYear', type: 'int', visible: false},
        {name: 'workRequestNumber', type: 'string', visible: false},
        {name: 'workRequestFullNumber', type: 'string', visible: true},
        {name: 'requestDate', type: 'date', dateFormat: 'Y-m-d', visible: true},
        {name: 'attentionMaximumDate', type: 'date', dateFormat: 'Y-m-d', visible: true},
        {name: 'idWorkRequestStatus', type: 'int', visible: false, mapping: 'workRequestStatus.idWorkRequestStatus'},
        {name: 'workRequestStatus.workRequestStatusName', type: 'string', visible: true, mapping: 'workRequestStatus.workRequestStatusName'},
        {name: 'idWorkRequestStatusReason', type: 'int', visible: false, mapping: 'workRequestStatusReason.idWorkRequestStatusReason'},
        {name: 'workRequestStatusReason.workRequestStatusReasonName', type: 'string', visible: false, mapping: 'workRequestStatusReason.workRequestStatusReasonName'},
        {name: 'description', type: 'string', visible: false},
        {name: 'reportLink', type: 'string', visible: true}
    ],

    idProperty: 'idWorkRequest'
});