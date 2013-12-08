Ext.define('sisprod.model.WorkRequestModel', {
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
        {name: 'workCategoryDetail.workCategory.idWorkCategory', type: 'string', visible: false, mapping: 'workCategoryDetail.workCategory.idWorkCategory'},
        {name: 'workCategoryDetail.workCategory.workCategoryName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategory.workCategoryName'},
        {name: 'workCategoryDetail.idWorkCategoryDetail', type: 'string', visible: false, mapping: 'workCategoryDetail.idWorkCategoryDetail'},
        {name: 'workCategoryDetail.workCategoryDetailName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategoryDetailName'},
        {name: 'idDependency', type: 'int', visible: false, mapping: 'dependency.idDependency'},
        {name: 'dependency.dependencyName', type: 'string', visible: false, mapping: 'dependency.dependencyName'},
        {name: 'idEmployee', type: 'int', visible: false, mapping: 'dependency.idDependency'},
//        {name: 'applicantPaternalSurname', type: 'string', visible: false, mapping: 'applicant.person.paternalSurname'},
//        {name: 'applicantMaternalSurname', type: 'string', visible: false, mapping: 'applicant.person.maternalSurname'},
//        {name: 'applicantPersonName', type: 'string', visible: false, mapping: 'applicant.person.personName'},
        {name: 'applicantFullName', type: 'string', visible: true, mapping: 'applicant.person.personFullName'/*,
            convert: function(value, record){
                var fullName = Ext.String.format('{0} {1}, {2}', record.data.applicantPaternalSurname,
                    record.data.applicantMaternalSurname, record.data.applicantPersonName);
                return fullName;
            }*/
        },
//        {name: 'recipientPaternalSurname', type: 'string', visible: false, mapping: 'recipient.person.paternalSurname'},
//        {name: 'recipientMaternalSurname', type: 'string', visible: false, mapping: 'recipient.person.maternalSurname'},
//        {name: 'recipientPersonName', type: 'string', visible: false, mapping: 'recipient.person.personName'},
//        {name: 'recipientPersonName', type: 'string', visible: false, mapping: 'recipient.person.personName'},
//        {name: 'recipientFullName', type: 'string', visible: false, mapping: 'recipient.person.personFullName'},
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
        {name: 'description', type: 'string', visible: false},
        {name: 'reportLink', type: 'string', visible: true}
    ],

    idProperty: 'idWorkRequest'
});