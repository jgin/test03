/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.AnnullableWorkOrder.ListAnnullableWorkOrder', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listAnnullableWorkOrder',
   
   options: {},
   
   usedInPAndP: true,
   entityName: '',
   
   listTitle: 'Work Orders List',
   messages: {
       headers: {
           idWorkOrder: 'ID',
           taskSchedulerEmployeeName: 'Employee',
           sectorName: 'Sector Name',
           workOrderFullNumber: 'Work Order Full Number',
           workRequestFullNumber: 'Work Request Full Number',
           workCategoryName: 'Work Category',
           workCategoryDetailName: 'Work Detail Category',
           workShopName: 'Work Shop Name',
           locationName: 'Location',
           workDescription: 'Description',
           equipmentName: 'Equipment Name',
           workOrderStatusName: 'Work Order Status Name',
           direct: 'Direct'
       }
   },
   
    gridOptions: {
        region: 'center'
    },
    showCheckInactive: false,
   
    initComponent: function(){
       var me = this;

       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName('WorkOrder');
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idWorkOrder: {header: me.messages.headers.idWorkOrder},
                    workOrderFullNumber: {header: me.messages.headers.workOrderFullNumber, flex: 1.5},
//                    'workRequest.idWorkRequest': {hideable: false},
                    idWorkRequest: {hideable: false},
//                    'workRequest.workRequestFullNumber': {header: me.messages.headers.workRequestFullNumber, flex: 1.5},
                    workRequestFullNumber: {header: me.messages.headers.workRequestFullNumber, flex: 1.5},
//                    'sector.idSector': {hideable: false},
                    idSector:{hideable: false},
//                    'sector.sectorName': {header: me.messages.headers.sectorName},
                    sectorName: {header: me.messages.headers.sectorName},
//                    'taskScheduler.idTaskScheduler': {hideable: false},
                    idTaskScheduler: {hideable:false},
//                    'taskScheduler.employee.person.personFullName': {header: me.messages.headers.taskSchedulerEmployeeName, flex: 2},
                    taskSchedulerName : {header: me.messages.headers.taskSchedulerEmployeeName, flex: 2, hidden: true, hideable:false},
//                    'workCategoryDetail.idWorkCategoryDetail': {hideable: false},
                    idWorkCategoryDetail: {hideable: false},
//                    'workCategoryDetail.workCategory.workCategoryName': {header: me.messages.headers.workCategoryName, flex: 1.5},
                    workCategoryName: {header: me.messages.headers.workCategoryName},
//                    'workCategoryDetail.workCategoryDetailName': {header: me.messages.headers.workCategoryDetailName, flex: 1.5},
                    workCategoryDetailName: {header: me.messages.headers.workCategoryDetailName, flex: 1.5},
                    idLocation: {hideable: false},
//                    'location.locationName': {header: me.messages.headers.locationName},
                    locationName: {header: me.messages.headers.locationName},
//                    'workOrderStatus.idWorkOrderStatus': {hideable: false},
                    workOrderDate: {hideable: false},
                    workOrderYear: {hideable: false},
                    workOrderNumber: {hideable: false},
                    annulledWorkOrder: {hideable: false},
                    scheduledStartDate: {hideable: false},
                    scheduledEndDate: {hideable: false},
                    executionStartDate: {hideable: false},
                    executionEndDate: {hideable: false},
                    manHours:{hideable: false},
                    machineHours: {hideable: false},
                    ownResources: {hideable: false},
                    description: {header: me.messages.headers.description, hideable: false},
                    comment: {hideable: false},
//                    'wOOwnResources.idWOOwnResources': {hideable: false},
                    idWOOwnResources: {hideable: false},
//                    'workShop.workShopName': {header: me.messages.headers.workShopName},
                    workShopName: {header: me.messages.headers.workShopName},
//                    'wOOwnResources.quadrille.quadrilleName': {hideable: false},
                    quadrilleName : {hideable: false},
//                    'workShopCoordinator.employee.person.personFullName': {hideable: false},
                    personFullName: {hideable: false},
//                    'workRequest.workRequestSource.workRequestSourceName': {hideable: false},
                    workRequestSourceName: {hideable: false},
//                    'wOThirdPartyResource.supplier.entity.entityName': {hideable: false},
                    entityName: {hideable: false},
//                    'workRequest.equipment.equipmentName': {header: me.messages.headers.equipmentName},
                    equipmentName: {header: me.messages.headers.equipmentName},
//                    'workRequest.attentionMaximumDate': {hideable: false},
                    attentionMaximumDate: {hideable: false},
                    idWorkOrderStatus: {hideable: false},
                    reportLink: {hidden:true ,hideable: false},
                    worshopCoordinatorName: {hideable: false, hidden: true},
                    percentageUsageResources:{hideable: false, hidden: true},
                    percentageAdvance:{hideable: false, hidden: true},
//                    'workOrderStatus.workOrderStatusName': {
//                        header: me.messages.headers.workOrderStatusName,
//                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
//                            metaData.style = Ext.String.format("background-color: {0};background-image: none;",
//                                record.raw['workOrderStatus']['workOrderStatusColor']);                                
//                            return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
//                        }
//                    },
                    workOrderStatusName: {
                        header: me.messages.headers.workOrderStatusName,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            metaData.style = Ext.String.format("background-color: {0};background-image: none;",
                                record.raw['workOrderStatus']['workOrderStatusColor']);                                
                            return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                        }                
                    },
                    isDirectWorkOrder: {header: me.messages.headers.direct}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: false,
            topBarButtons: [
                {
                    xtype: 'button',
                    text: 'Anular',
                    iconCls: 'remove',
                    action: 'nullify'
                }
            ]
        };
        me.callParent(arguments);
   }
   
});