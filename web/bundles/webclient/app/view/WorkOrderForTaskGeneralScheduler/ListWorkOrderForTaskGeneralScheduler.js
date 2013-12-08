

Ext.define('sisprod.view.WorkOrderForTaskGeneralScheduler.ListWorkOrderForTaskGeneralScheduler', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkOrderForTaskGeneralScheduler',
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
               worshopPlannerName:'Coordinator',
               equipmentName:'Equipment',
               attentionMaximumDate: 'Attentiun Maximun Date',
               entityName: 'Contractor',
               workRequestSourceName: 'Work Request Source',
               direct: 'Directa'
        },
        closeWorkOrder: 'Validate'
    },
   
   options: {},
   
   usedInPAndP: true,
   entityName: '',
   
   title: '',
   
   listTitle: 'Work Order List',
   
   gridOptions: {
        region: 'center'
    },
   showCheckInactive: false,
   initComponent: function(){
       var me = this;
       
       var storeName = "sisprod.store.WorkOrderForTaskGeneralSchedulerStore";
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
                        'workRequestFullNumber':{header:me.messages.headers.workRequestFullNumber,flex:2},
                        workOrderFullNumber:{header:me.messages.headers.workOrderFullNumber,flex:2},
                        'sectorName':{header:me.messages.headers.sectorName,flex:1.5},
                        taskSchedulerName:{header:me.messages.headers.taskSchedulerName,flex:2},
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
                        scheduledStartDate:{header:me.messages.headers.scheduledStartDate,flex:1},
                        scheduledEndDate:{header:me.messages.headers.scheduledEndDate,flex:1},
                        executionStartDate:{header:me.messages.headers.executionStartDate,flex:1},
                        executionEndDate:{header:me.messages.headers.executionEndDate,flex:1},
                        manHours:{header:me.messages.headers.manHours,flex:1},
                        machineHours:{header:me.messages.headers.machineHours,flex:1},
                        description:{header:me.messages.headers.description,flex:3},
                        workShopName:{header:me.messages.headers.workShopName,flex:2},
                        quadrilleName:{header:me.messages.headers.quadrilleName,flex:2},
                        worshopCoordinatorName:{header:me.messages.headers.worshopCoordinatorName,flex:3},
                        equipmentName:{header:me.messages.headers.equipmentName,flex:3},
                        attentionMaximumDate: {header: me.messages.headers.attentiunMaximunDate, flex: 1},
                        percentageUsageResources: {hideable: false, hidden: true},
                        percentageAdvance: {hideable: false, hidden: true},
                        isDirectWorkOrder: {header: me.messages.headers.direct, flex: 1},
                        reportLink: {
                        xtype: 'actioncolumn',
                        header: me.messages.headers.print,
                        hideable: false,
                        align: 'center',
                        excludeForExport: true,
                        sortable: false,
                        filter: null,
                        hidden: true
//                        items: [
//                            {
//                                icon: sisprod.getApplication().getImagePath('print.png'),
//                                handler: function(grid, rowIndex, colIndex){
//                                    var record = grid.getStore().getAt(rowIndex);
//                                    if(record){
////                                        var reportLink = Ext.String.format("reports.htm?reportName=pedido_de_trabajo_pdf.rptdesign&rp_InWorkRequest={0}",
////                                            record.raw['idWorkRequest']);
////                                        var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
////                                            forPrintingList: false,
////                                            formData: {
////                                                url: reportLink,
////                                                defaultFormat: sisprod.BasePrintWindow.PDF
////                                            }
////                                        });
////                                        printWindow.show();
//                                    }
//                                }
//                            }
//                        ]
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: {
                allowAdd: false,
                allowUpdate: false,
                allowDelete: false,
                allowPrint: false
            },
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.closeWorkOrder,
                    iconCls: 'accept',
                    action: 'execute'
                }
            ]
       };
       
       me.callParent(arguments);
   }
   
});