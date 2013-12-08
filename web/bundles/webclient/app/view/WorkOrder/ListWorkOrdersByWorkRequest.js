/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrder.ListWorkOrdersByWorkRequest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.listWorkOrdersByWorkRequest',
    
    requires: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
//    title: 'Work Request',
//    autoScroll:true,
    modal: true,
    width: 700,
    height: 300,
    maxheight:400,
    layout: 'fit',
    hasButtons: false,
    messages: {
        alertMessage:'Message',
        selectWorkOrder:'Select a Work Order...',
        workOrderCantNoBeExecute:'This Work Order cant to be execute',
        gridTitle: 'Work Orders',
        idWorkOrderLabel: 'Id',
        workOrderFullNumberLabel: 'N°',
        descriptionLabel: 'Description',
        workOrderDateLabel: 'Work Order Date',
        scheduledStartDateLabel: 'Scheduled Start Date',
        scheduledEndDateLabel: 'Scheduled End Date',
        executionStartDateLabel: 'Execution Start Date',
        executionEndDateLabel: 'Execution End Date',
        sectorNameLabel: 'Sector',
        workShopLabel: 'Work Shop',
        workShopCoordinatorLabel: 'Coordinator',
        quadrilleLabel: 'Quadrille',
        taskSchedulerLabel: 'Scheduler',
        workCategoryLabel: 'Work Catgory',
        workCategoryDetailLabel: 'Work Type',
        locationLabel: 'Location',
        workStatusLabel: 'Status',
        annulledWorkOrderLabel: 'Anulled',
        manHoursLabel: 'Man Hours',
        machineHoursLabel: 'Machine Hours',
        executionLabel: 'Execute',
        printLabel: 'Print',
        editLabel: 'Edit'
    },
    
    initComponent: function(){
        var me = this;        
        me.title=me.data["workRequestFullNumber"];
        //
        var gridStore = Ext.create('sisprod.store.WorkOrderByWorkRequestStore',{
            id: 'workOrderByWorkRequestStore'
        }).load({params:{idWorkRequest:me.data["idWorkRequest"]}});
        //
        me.formOptions = {
            fieldDefaults: {
                labelWidth: 100,
                margins: '0 0 0 5',
                anchor: '100%'
            },
            bodyPadding: 5,
            items: [
                {
                    margins: '5 0 0 0',
                    xtype: 'gridpanel',
                    id: 'gridWorkOrder',
                    title: me.messages.gridTitle,
                    autoScroll: true,
                    enableColumnMove: false,
                    frame: true,
                    width:  '100%',
                    height: 250,
                    store: gridStore,
                    collapsible: false,
                    tbar :[
                        {
                            text: me.messages.editLabel,
                            iconCls: 'edit',
                            action: 'edit'
                        },
//                        {
//                            text:me.messages.executionLabel,
//                            iconCls: 'execute',
//                            handler: function(){
//                                var grid=Ext.getCmp('gridWorkOrder');
//                                var record = grid.getSelectionModel().getSelection()[0];
//                                if(Ext.isDefined(record)){
//                                    var idWorkOrder = record.raw.idWorkOrder;
//                                    Ext.BaseAjax.request({
//                                    url: 'rest/workOrder/checkIsExecutable.htm',
//                                    method: "POST",
//                                    params: {idWorkOrder: idWorkOrder},
//                                    success: function(response){
//                                        var responseData = Ext.decode(response.responseText);
//                                        if(Ext.isDefined(responseData.success) && responseData.success === true){
//                                            if(responseData.result){
//                                                var executeForm = Ext.create('sisprod.view.WorkOrderExecution.WorkOrderExecutionForm');
//                                                executeForm.show();
//                                            }else{
//                                                Ext.Msg.alert(me.messages.alertMessage,me.messages.workOrderCantNoBeExecute);                                                
//                                            }
//                                        }
//                                        }
//                                    });
//                                }else{
//                                    Ext.Msg.alert(me.messages.alertMessage,me.messages.selectWorkOrder);
//                                }
//                            }
//                        },
                        {
                            text:me.messages.printLabel,
                            iconCls: 'print',
                            handler: function(){
                                var grid=Ext.getCmp('gridWorkOrder');
                                var record = grid.getSelectionModel().getSelection()[0];
                                if(record){
                                    var reportLink = Ext.String.format("reports.htm?reportName=workOrder.rptdesign&rp_InIdWorkOrder={0}",
                                        record.raw['idWorkOrder']);
                                    console.log(me.controller);
                                    var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                        controller: me.controller,
                                        forPrintingList: false,
                                        formData: {
                                            url: reportLink,
                                            defaultFormat: sisprod.BasePrintWindow.PDF,
                                            hiddenTitle: true,
                                            selectableFormat: false
                                        }
                                    });
                                    printWindow.show();
                                }
                            }
                        }
                    ],
                    columns: [
                        {
                            text: me.messages.idWorkOrderLabel,
                            dataIndex: 'idWorkOrder',
                            hidden:true
                        },
                        {
                            text: 'workRequest',
                            dataIndex: 'idWorkRequest',
                            hidden:true,
                            hideable:false
                        },
                        {
                            text: me.messages.workOrderFullNumberLabel,
                            dataIndex: 'workOrderFullNumber',
                            flex: 1,
                            hidden:false,
                            width:50
                        },
                        {
                            text: me.messages.descriptionLabel,
                            dataIndex: 'description',
                            flex: 2,
                            hidden:true
                        },
                        {
                            text: 'idSector',
                            dataIndex: 'idSector',
                            hidden:true,
                            hideable:false
                        },
                        {
                            text: me.messages.sectorNameLabel,
                            dataIndex: 'sectorName',
                            flex: 1,
                            hidden:false
                        },
                        {
                            text: me.messages.taskSchedulerLabel,
                            dataIndex: 'taskSchedulerName',
                            flex: 2,
                            hidden:false
                        },
                        {
                            text: me.messages.workShopLabel,
                            dataIndex: 'workShopName',
                            flex: 1,
                            hidden:false
                        },
                        {
                            text: me.messages.workShopCoordinatorLabel,
                            dataIndex: 'worshopCoordinatorName',
                            flex: 2,
                            hidden:false
                        },
                        {
                            text: me.messages.quadrilleLabel,
                            dataIndex: 'quadrilleName',
                            flex: 1,
                            hidden:false
                        },
                        {
                            text: me.messages.workCategoryLabel,
                            dataIndex: 'workCategoryName',
                            flex: 1.5,
                            hidden:true
                        },
                        {
                            text: me.messages.workCategoryDetailLabel,
                            dataIndex: 'workCategoryDetailName',
                            flex: 1.5,
                            hidden:true
                        },
                        {
                            text: me.messages.locationLabel,
                            dataIndex: 'locationName',
                            flex: 1.5,
                            hidden:true
                        },
                        {
                            text: me.messages.workOrderDateLabel,
                            dataIndex: 'workOrderDate',
                            flex: 1,
                            hidden:false
                        },
                        {
                            text: me.messages.scheduledStartDateLabel,
                            dataIndex: 'scheduledStartDate',
                            flex: 1,
                            hidden:true
                        },
                        {
                            text: me.messages.scheduledEndDateLabel,
                            dataIndex: 'scheduledEndDate',
                            flex: 2,
                            hidden:true
                        },
                        {
                            text: me.messages.executionStartDateLabel,
                            dataIndex: 'executionStartDate',
                            flex: 2,
                            hidden:true
                        },
                        {
                            text: me.messages.executionEndDateLabel,
                            dataIndex: 'executionEndDate',
                            flex: 2,
                            hidden:true
                        },
                        {
                            text: me.messages.annulledWorkOrderLabel,
                            dataIndex: 'annulledWorkOrder',
                            flex: 2,
                            hidden:true,
                            hideable:false
                        },
                        {
                            text: me.messages.manHoursLabel,
                            dataIndex: 'manHours',
                            flex: 0.5,
                            hidden:true
                        },
                        {
                            text: me.messages.machineHoursLabel,
                            dataIndex: 'machineHours',
                            flex: 0.5,
                            hidden:true
                        },
                        {
                            text: me.messages.workStatusLabel,
                            dataIndex: 'workOrderStatusName',
                            flex: 1,
                            hidden:false,
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                                metaData.style = Ext.String.format("background-color: {0};background-image: none;",
                                    record.raw['workOrderStatus']['workOrderStatusColor']);
                                return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                            }
                        }                        
//                        {
//                            xtype: 'actioncolumn',
//                            text:me.messages.printLabel,
//                            flex:0.5,
//                            sortable: false,
//                            menuDisabled: true,
//                            align:'center',
//                            items: [{
//                                iconCls: 'print',
////                                tooltip: me.messages.msgForecastDetail,
////                                scope: me.getController(),
////                                handler: me.getController().showProductionForecastDetailFromImage
//                                handler: function(grid, rowIndex, colIndex){
//                                    var record = grid.getStore().getAt(rowIndex);
//                                    if(record){
//                                        var reportLink = Ext.String.format("reports.htm?reportName=orden_de_trabajo_pdf.rptdesign&rp_InWorkOrder={0}",
//                                            record.raw['idWorkOrder']);
//                                        var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
//                                            forPrintingList: false,
//                                            formData: {
//                                                url: reportLink,
//                                                defaultFormat: 'pdf'
//                                            }
//                                        });
//                                        printWindow.show();
//                                    }
//                                }
//                            }]
//>>>>>>> Stashed changes
//                        }
//                        {
//                            xtype:'actioncolumn',
//                            text:me.messages.executionLabel,
//                            flex:0.5,
//                            sortable: false,
//                            menuDisabled: true,
//                            align:'center',
//                            items: [{
//                                icon: sisprod.getApplication().getImagePath('execute.png'),                                
//                                handler: function(grid, rowIndex, colIndex){
//                                    var record = grid.getStore().getAt(rowIndex);
//                                    var idWorkOrder = record.raw.idWorkOrder;
//                                    Ext.BaseAjax.request({
//                                    url: 'rest/workOrder/checkIsExecutable.htm',
//                                    method: "POST",
//                                    params: {idWorkOrder: idWorkOrder},
//                                    success: function(response){
//                                        var responseData = Ext.decode(response.responseText);
//                                        if(Ext.isDefined(responseData.success) && responseData.success === true){
//                                            if(responseData.result){
//                                                var executeForm = Ext.create('sisprod.view.WorkOrderExecution.WorkOrderExecutionForm');
//                                                executeForm.down('form').loadRecord(record);
//                                                executeForm.show();
//                                            }
//                                        }
//                                        }
//                                    });
//                                }
//                            }]
//                        },
//                        {
//                            xtype: 'actioncolumn',
//                            text:me.messages.printLabel,
//                            flex:0.5,
//                            sortable: false,
//                            menuDisabled: true,
//                            align:'center',
//                            items: [{
//                                iconCls: 'print',
////                                tooltip: me.messages.msgForecastDetail,
////                                scope: me.getController(),
////                                handler: me.getController().showProductionForecastDetailFromImage
//                                handler: function(grid, rowIndex, colIndex){
//                                    var record = grid.getStore().getAt(rowIndex);
//                                    if(record){
//                                        var reportLink = Ext.String.format("reports.htm?reportName=orden_de_trabajo_pdf.rptdesign&rp_InWorkOrder={0}",
//                                            record.raw['idWorkOrder']);
//                                        var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
//                                            forPrintingList: false,
//                                            formData: {
//                                                url: reportLink,
//                                                defaultFormat: 'pdf'
//                                            }
//                                        });
//                                        printWindow.show();
//                                    }
//                                }
//                            }]
//                        }
                    ]
                }
            ]
        };
        me.callParent(arguments);
    }
});

