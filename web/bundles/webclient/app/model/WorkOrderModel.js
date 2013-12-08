/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WorkOrderModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkOrder', type: 'int', visible: false}, 
        {name: 'workOrderFullNumber', type: 'string', visible: true},
        {name: 'idWorkRequest', type: 'int', visible: false, mapping: 'workRequest.idWorkRequest'},
        {name: 'workRequestFullNumber', type: 'string', visible: true, mapping: 'workRequest.workRequestFullNumber'},
        {name: 'idSector', type: 'int', visible: false, mapping: 'sector.idSector'},
        {name: 'sectorName', type: 'string', visible: true, mapping: 'sector.sectorName'},
        {name: 'idTaskScheduler', type: 'int', visible: false, mapping: 'taskScheduler.idTaskScheduler'},
        {name: 'taskSchedulerName', type: 'string', visible: false, mapping: 'taskScheduler.employee.person.personFullName'},
        {name: 'idWorkCategoryDetail', type: 'int', visible: false, mapping: 'workCategoryDetail.idWorkCategoryDetail'},
        {name: 'workCategoryName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategory.workCategoryName'},
        {name: 'workCategoryDetailName', type: 'string', visible: true, mapping: 'workCategoryDetail.workCategoryDetailName'},
        {name: 'idLocation', type: 'int', visible: false, mapping: 'location.idLocation'},
        {name: 'locationName', type: 'string', visible: true, mapping: 'location.locationName'},
        {name: 'idWorkOrderStatus', type: 'int', visible: false, mapping: 'workOrderStatus.idWorkOrderStatus'},
        {name: 'workOrderDate', type: 'string', visible: false},
        {name: 'workOrderYear', type: 'int', visible: false},
        {name: 'workOrderNumber', type: 'string', visible: false},
        {name: 'annulledWorkOrder', type: 'boolean', visible: false},
        {name: 'scheduledStartDate', type: 'string', visible: false},
        {name: 'scheduledEndDate', type: 'string', visible: false},
        {name: 'executionStartDate', type: 'string', visible: false},
        {name: 'executionEndDate', type: 'string', visible: false},
        {name: 'manHours', type: 'float', visible: false},
        {name: 'machineHours', type: 'float', visible: false},
        {name: 'ownResources', type: 'boolean', visible: false},
        {name: 'description', type: 'string', visible: false},
        {name: 'comment', type: 'string', visible: false},
        {name: 'idWOOwnResources', type: 'int', visible:false, mapping: 'wOOwnResources.idWOOwnResources'},
        {name: 'workShopName', type: 'string', visible:true, mapping: 'workShop.workShopName'},
        {name: 'quadrilleName', type: 'string', visible:false, mapping: 'wOOwnResources.quadrille.quadrilleName'},
        {name: 'worshopCoordinatorName', type: 'string', visible:true, mapping: 'workShopCoordinator.employee.person.personFullName'},
        {name: 'taskSchedulerName', type: 'string', visible:true},
        {name: 'workRequestSourceName', type: 'string', visible:false, mapping: 'workRequest.workRequestSource.workRequestSourceName'},
        {name: 'entityName', type: 'string', visible:false, mapping: 'wOThirdPartyResource.supplier.entity.entityName'},
        {name: 'equipmentName', type: 'string', visible:true, mapping: 'equipment.equipmentName'},
        {name: 'workRequestFullNumber', type: 'string', visible:false, mapping: 'workRequest.workRequestFullNumber'},
        {name: 'attentionMaximumDate', type: 'string', visible:false, mapping: 'workRequest.attentionMaximumDate'},
        {name: 'workOrderStatusName', type: 'string', visible: true, mapping: 'workOrderStatus.workOrderStatusName'},
        {name: 'reportLink', type: 'string', visible: true},
        {name: 'percentageUsageResources', type: 'float', visible: true},
        {name: 'percentageAdvance', type: 'float', visible: true},
        {name: 'isDirectWorkOrder', type: 'boolean', visible: true}
    ],

    idProperty: 'idWorkOrder'
});