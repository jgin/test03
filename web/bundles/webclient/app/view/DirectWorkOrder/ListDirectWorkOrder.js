

Ext.define('sisprod.view.DirectWorkOrder.ListDirectWorkOrder', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listDirectWorkOrder',
   
   messages: {
        headers:{
               idWorkOrder:'ID', 
               workRequestFullNumber:'Work Request',
               sectorName:'Sector',
               taskSchedulerName:'Scheduler',
               workCategoryName:'Work Category',
               workCategoryDetailName:'Work Type',
               locationName:'Location',
               workOrderStatusName:'Status',
               workOrderDate:'Register Date',
               workOrderFullNumber:'Number',
               scheduledStartDate:'Scheduled Star Date',
               scheduledEndDate:'Scheduled End Date',
               executionStartDate:'Execution Star Date',
               executionEndDate:'Execution End Date',
               manHours:'Man Hours',
               machineHours:'Machine Hours',
               description:'Description',
               workShopName:'Work Shop',
               quadrilleName:'Quadrille',
               worshopCoordinatorName:'Coordinator',
               equipmentName:'Equipment',
               print:'Print',
               attentionMaximumDate: 'Attentiun Maximun Date',
               entityName: 'Contractor',
               workRequestSourceName: 'Work Request Source',
               isDirect: 'Direct'
        }
    },
   
   options: {},
   
   usedInPAndP: true,
   entityName: '',
   
   title: '',
   
   listTitle: 'Direct Work Order List',
   
   gridOptions: {
        region: 'center'
    },
   showCheckInactive: false,
   initComponent: function(){
       var me = this;
       var storeName = "sisprod.store.DirectWorkOrderStore";
       var modelName = "sisprod.model.WorkOrderModel";
       me.gridOptions = {
           title: me.listTitle,
           entityName:me.entityName,
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idWorkOrder:{header:me.messages.headers.idWorkOrder},
                    idWorkRequest:{hideable:false},
                    idSector:{hideable:false},
                    idTaskScheduler:{hideable:false},
                    idWorkCategoryDetail:{hideable:false},
                    idLocation:{hideable:false},
                    idWorkOrderStatus:{hideable:false},
                    workOrderYear:{hideable:false},
                    workOrderNumber:{hideable:false},
                    annulledWorkOrder:{hideable:false},
                    comment:{hideable:false},
                    idWOOwnResources:{hideable:false},
                    workRequestSourceName:{hideable:false},
                    entityName:{hideable:false},
                    ownResources:{hideable:false},
                    'workRequestFullNumber':{hidden: true, hideable: false},
                    workOrderFullNumber:{header:me.messages.headers.workOrderFullNumber,flex:2},
                    'sectorName':{header:me.messages.headers.sectorName,flex:1.5},
                    taskSchedulerName:{hidden: true, hideable: false},
                    workCategoryName:{header:me.messages.headers.workCategoryName,flex:2},
                    workCategoryDetailName:{header:me.messages.headers.workCategoryDetailName,flex:2.5},
                    locationName:{header:me.messages.headers.locationName,flex:2},
                    workOrderStatusName:{header:me.messages.headers.workOrderStatusName,flex:2,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            metaData.style = Ext.String.format("background-color: {0};background-image: none;",
                                record.raw['workOrderStatus']['workOrderStatusColor']);
                            return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                        }
                    },
                    workOrderDate:{header:me.messages.headers.workOrderDate,flex:1},
                    scheduledStartDate:{hidden: true, hideable: false},
                    scheduledEndDate:{hidden: true, hideable: false},
                    executionStartDate:{header:me.messages.headers.executionStartDate,flex:1},
                    executionEndDate:{header:me.messages.headers.executionEndDate,flex:1},
                    manHours:{header:me.messages.headers.manHours,flex:1},
                    machineHours:{header:me.messages.headers.machineHours,flex:1},
                    description:{ hidden: true, hideable: false},
                    workShopName:{header:me.messages.headers.workShopName,flex:2},
                    quadrilleName:{header:me.messages.headers.quadrilleName,flex:2},
                    worshopCoordinatorName:{header:me.messages.headers.worshopCoordinatorName,flex:3},
                    equipmentName:{header:me.messages.headers.equipmentName,flex:3},
                    attentionMaximumDate: {hidden: true, hideable: false},
                    reportLink: {hideable: false,hidden: true},
                    isDirectWorkOrder: {header: me.messages.headers.isDirect, flex: 1},
                    percentageUsageResources: {hidden: true, hideable: false},
                    percentageAdvance: {hidden: true, hideable: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: {
                allowAdd: true,
                allowUpdate: true,
                allowDelete: false,
                allowPrint: false
            }
//            topBarButtons: [
//                {
//                    xtype: 'button',
//                    text: 'Ejecutar',
//                    iconCls: 'execute',
//                    action: 'execute'
//                }
//            ]
       };
       
       me.callParent(arguments);
   }
   
});