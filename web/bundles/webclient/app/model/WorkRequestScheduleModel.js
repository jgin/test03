Ext.define('sisprod.model.WorkRequestScheduleModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkRequest', type: 'int', visible: false},
        {name: 'idLot', type: 'int', visible: false, mapping: 'lot.idLot'},
        {name: 'lot.lotName', type: 'string', visible: true, mapping: 'lot.lotName'},
        {name: 'idWorkRequestSource', type: 'int', visible: false, mapping: 'workRequestSource.idWorkRequestSource'},
        {name: 'workRequestSource.workRequestSourceName', type: 'string', visible: true, mapping: 'workRequestSource.workRequestSourceName'},
//        {name: 'workCategoryDetail.idWorkCategoryDetail', type: 'int', visible: false, mapping: 'workCategoryDetail.idWorkCategoryDetail'},
        {name: 'workCategoryDetail.workCategory.workCategoryName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategory.workCategoryName'},
        {name: 'workCategoryDetail.workCategoryDetailName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategoryDetailName'},
        {name: 'idDependency', type: 'int', visible: false, mapping: 'dependency.idDependency'},
        {name: 'dependency.dependencyName', type: 'string', visible: false, mapping: 'dependency.dependencyName'},
        {name: 'idEmployee', type: 'int', visible: false, mapping: 'dependency.idDependency'},
        {name: 'applicantFullName', type: 'string', visible: true},
//        {name: 'recipientFullName', type: 'string', visible: false},
        {name: 'senderFullName', type: 'string', visible: true, mapping: 'sender.person.personFullName'},
        {name: 'idLocation', type: 'int', visible: false, mapping: 'location.idLocation'},
        {name: 'location.locationName', type: 'string', visible: true, mapping: 'location.locationName'},
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
        {name: 'workRequestStatusReason.workRequestStatusReasonName', type: 'string', visible: false, mapping: 'workRequestStatusReason.workRequestStatusReasonName'},
        {name: 'multiOrder', type: 'boolean', visible: false},
        {name: 'numberOfOrders', type: 'int', visible: false},
        {name: 'description', type: 'string', visible: false},
        {name: 'changeMultiOrder', type: 'string', visible: true},
        {name: 'schedule', type: 'string', visible: true},
        {name: 'viewWorkOrders', type: 'string', visible: true}
    ],

    idProperty: 'idWorkRequest'
});