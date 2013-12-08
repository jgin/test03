Ext.define('sisprod.view.WorkRequestAll.ConsultWorkRequest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.consultWorkRequest',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Consult Work Request',
    modal: true,
    width: 700,
    height: 400,
    layout: 'fit',
    hasButtons: false,
    
    messages: {
        workRequestFullNumber: 'Request Nbr.',
        locationName: 'Location',
        workRequestSourceName: 'Request Source',
        equipmentName: 'Equipment',
        sectorName: 'Sector',
        taskScheduler: 'Scheduler',
        workCategoryName: 'Work Category',
        workCategoryDetail: 'Work Type',
        attentionMaximumDate: 'Attent. Max. Date',
        description: 'Description',
        msgWorkRequestData: 'Data Work Request',
        workOrderLabel: {
            idWorkOrderLabel: 'ID',
            workOrderFullNumberLabel: 'Request Nbr.',
            descriptionLabel: 'Description',
            sectorNameLabel: 'Sector',
            taskSchedulerLabel: 'Scheduler',
            workShopLabel: 'Work Shop',
            workShopCoordinatorLabel: 'Coordinator',
            quadrilleLabel: 'Quadrille',
            workCategoryLabel: 'Work Category',
            workCategoryDetailLabel: 'Work Type',
            locationLabel: 'Location',
            workOrderDateLabel: 'Work Order Date',
            scheduledStartDateLabel: 'Scheduled Start Date',
            scheduledEndDateLabel: 'Scheduled End Date',
            executionStartDateLabel: 'Execution Start Date',
            executionEndDateLabel: 'Execution End Date',
            annulledWorkOrderLabel: 'Anulled',
            manHoursLabel: 'Man Hours',
            machineHoursLabel: 'Machine Hours',
            workStatusLabel: 'Status'
        }
    },
    
    initComponent: function(){
        var me = this;
        var tabItems = new Array();
//        var mainDataItems = new Array();
//        mainDataItems.push(me.getMainDataItems());   
        
        tabItems.push({
            title: 'Orden de Pedido',
            fieldDefaults: {
                labelWidth: 100,
                margins: '0 0 0 5',
                anchor: '100%'
            },
            bodyPadding: 5,
            items: [
                {
                    xtype:'fieldset',
                    title: me.messages.msgWorkRequestData,
                    layout: 'anchor',
                    items: [
                        {
                            id: 'idWorkRequest',
                            name: 'idWorkRequest',
                            xtype: 'hiddenfield'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                padding: '0 10 0 0'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'workRequestFullNumber',
                                    id: 'workRequestFullNumber',
                                    flex: 1,
                                    fieldLabel: me.messages.workRequestFullNumber,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'location.locationName',
                                    id: 'locationName',
                                    flex: 1,
                                    fieldLabel: me.messages.locationName,
                                    readOnly: true,
                                    margin: '0 0 0 10'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                padding: '0 10 0 0'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'workRequestSource.workRequestSourceName',
                                    id: 'workRequestSourceName',
                                    flex: 1,
                                    fieldLabel: me.messages.workRequestSourceName,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'equipment.equipmentName',
                                    id: 'equipmentName',
                                    flex: 1,
                                    fieldLabel: me.messages.equipmentName,
                                    readOnly: true,
                                    margin: '0 0 0 10'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'sectorName',
                                    id: 'sectorName',
                                    flex: 3,
                                    fieldLabel: me.messages.sectorName,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'taskSchedulerName',
                                    fieldLabel: me.messages.taskScheduler,
                                    id: 'taslSchedulerName',
                                    readOnly: true,
                                    flex: 5,
                                    margin: '0 0 0 10'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'workCategoryName',
                                    id: 'workCategoryName',
                                    flex: 1,
                                    fieldLabel: me.messages.workCategoryName, 
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    margin: '0 0 0 10',
                                    fieldLabel: me.messages.workCategoryDetail,
                                    name: 'workCategoryDetailName',
                                    id: 'workCategoryDetailName',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'datefield',
                            name: 'attentionMaximumDate',
                            id: 'attentionMaximumDate',
                            fieldLabel: me.messages.attentionMaximumDate,
                            anchor: '40%',
                            readOnly: true
                        },
                        {
                            xtype:'fieldset',
                            columnWidth: 0.5,
                            title: me.messages.description,
                            defaultType: 'textfield',
                            defaults: {anchor: '100%'},
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    name: 'description',
                                    id: 'description',
                                    allowBlank: false,
                                    readOnly: true
                                }
                            ]
                        }
                    ]
                }
//                {
//                    margins: '5 0 0 0',
//                    xtype: 'gridpanel',
//                    id: 'gridWorkOrder',
//                    title: 'Ordenes de Trabajo',
//                    store: Ext.create('sisprod.store.WorkOrderByWorkRequestStore'),
//                    collapsible: true,
//                    frame: true,
//                    height: 120,
//                    columns: [
//                        {
//                            text: me.messages.workOrderLabel.idWorkOrderLabel,
//                            dataIndex: 'idWorkOrder',
//                            hidden:true
//                        },
//                        {
//                            text: 'workRequest',
//                            dataIndex: 'idWorkRequest',
//                            hidden:true,
//                            hideable:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.workOrderFullNumberLabel,
//                            dataIndex: 'workOrderFullNumber',
//                            flex: 1,
//                            hidden:false,
//                            width:50
//                        },
//                        {
//                            text: me.messages.workOrderLabel.descriptionLabel,
//                            dataIndex: 'description',
//                            flex: 2,
//                            hidden:true
//                        },
//                        {
//                            text: 'idSector',
//                            dataIndex: 'idSector',
//                            hidden:true,
//                            hideable:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.sectorNameLabel,
//                            dataIndex: 'sectorName',
//                            flex: 1,
//                            hidden:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.taskSchedulerLabel,
//                            dataIndex: 'taskSchedulerName',
//                            flex: 2,
//                            hidden:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.workShopLabel,
//                            dataIndex: 'workShopName',
//                            flex: 1,
//                            hidden:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.workShopCoordinatorLabel,
//                            dataIndex: 'worshopCoordinatorName',
//                            flex: 2,
//                            hidden:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.quadrilleLabel,
//                            dataIndex: 'quadrilleName',
//                            flex: 1,
//                            hidden:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.workCategoryLabel,
//                            dataIndex: 'workCategoryName',
//                            flex: 1.5,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.workCategoryDetailLabel,
//                            dataIndex: 'workCategoryDetailName',
//                            flex: 1.5,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.locationLabel,
//                            dataIndex: 'locationName',
//                            flex: 1.5,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.workOrderDateLabel,
//                            dataIndex: 'workOrderDate',
//                            flex: 1,
//                            hidden:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.scheduledStartDateLabel,
//                            dataIndex: 'scheduledStartDate',
//                            flex: 1,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.scheduledEndDateLabel,
//                            dataIndex: 'scheduledEndDate',
//                            flex: 2,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.executionStartDateLabel,
//                            dataIndex: 'executionStartDate',
//                            flex: 2,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.executionEndDateLabel,
//                            dataIndex: 'executionEndDate',
//                            flex: 2,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.annulledWorkOrderLabel,
//                            dataIndex: 'annulledWorkOrder',
//                            flex: 2,
//                            hidden:true,
//                            hideable:false
//                        },
//                        {
//                            text: me.messages.workOrderLabel.manHoursLabel,
//                            dataIndex: 'manHours',
//                            flex: 0.5,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.machineHoursLabel,
//                            dataIndex: 'machineHours',
//                            flex: 0.5,
//                            hidden:true
//                        },
//                        {
//                            text: me.messages.workOrderLabel.workStatusLabel,
//                            dataIndex: 'workOrderStatusName',
//                            flex: 1,
//                            hidden:false,
//                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
//                                metaData.style = Ext.String.format("background-color: {0};background-image: none;",
//                                    record.raw['workOrderStatus']['workOrderStatusColor']);
//                                return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
//                            }
//                        }
//                    ]
//                }
            ]
        });
        
        tabItems.push(me.getDataGridWorkOrderItems());
        
        var tabPanel = Ext.create('Ext.tab.Panel', {
            items: tabItems
        });
        me.formOptions = {
            region: 'center',
            labelWidth: 120,
            bodyStyle: 'padding:5px 5px 0',
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    autoScroll: true,
                    items: tabPanel
                }
            ]
        };
        
        me.callParent(arguments);
    },
    getDataGridWorkOrderItems: function(){
        var me = this;
        var items = {};    
        items = {
            margins: '5 0 0 0',
            xtype: 'gridpanel',
            id: 'gridWorkOrder',
            title: 'Ordenes de Trabajo',
            store: Ext.create('sisprod.store.WorkOrderByWorkRequestStore'),
            collapsible: true,
            frame: true,
            height: 310,
            columns: [
                {
                    text: me.messages.workOrderLabel.idWorkOrderLabel,
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
                    text: me.messages.workOrderLabel.workOrderFullNumberLabel,
                    dataIndex: 'workOrderFullNumber',
                    flex: 1,
                    hidden:false,
                    width:50
                },
                {
                    text: me.messages.workOrderLabel.descriptionLabel,
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
                    text: me.messages.workOrderLabel.sectorNameLabel,
                    dataIndex: 'sectorName',
                    flex: 1,
                    hidden:false
                },
                {
                    text: me.messages.workOrderLabel.taskSchedulerLabel,
                    dataIndex: 'taskSchedulerName',
                    flex: 2,
                    hidden:false
                },
                {
                    text: me.messages.workOrderLabel.workShopLabel,
                    dataIndex: 'workShopName',
                    flex: 1,
                    hidden:false
                },
                {
                    text: me.messages.workOrderLabel.workShopCoordinatorLabel,
                    dataIndex: 'worshopCoordinatorName',
                    flex: 2,
                    hidden:false
                },
                {
                    text: me.messages.workOrderLabel.quadrilleLabel,
                    dataIndex: 'quadrilleName',
                    flex: 1,
                    hidden:false
                },
                {
                    text: me.messages.workOrderLabel.workCategoryLabel,
                    dataIndex: 'workCategoryName',
                    flex: 1.5,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.workCategoryDetailLabel,
                    dataIndex: 'workCategoryDetailName',
                    flex: 1.5,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.locationLabel,
                    dataIndex: 'locationName',
                    flex: 1.5,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.workOrderDateLabel,
                    dataIndex: 'workOrderDate',
                    flex: 1,
                    hidden:false
                },
                {
                    text: me.messages.workOrderLabel.scheduledStartDateLabel,
                    dataIndex: 'scheduledStartDate',
                    flex: 1,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.scheduledEndDateLabel,
                    dataIndex: 'scheduledEndDate',
                    flex: 2,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.executionStartDateLabel,
                    dataIndex: 'executionStartDate',
                    flex: 2,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.executionEndDateLabel,
                    dataIndex: 'executionEndDate',
                    flex: 2,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.annulledWorkOrderLabel,
                    dataIndex: 'annulledWorkOrder',
                    flex: 2,
                    hidden:true,
                    hideable:false
                },
                {
                    text: me.messages.workOrderLabel.manHoursLabel,
                    dataIndex: 'manHours',
                    flex: 0.5,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.machineHoursLabel,
                    dataIndex: 'machineHours',
                    flex: 0.5,
                    hidden:true
                },
                {
                    text: me.messages.workOrderLabel.workStatusLabel,
                    dataIndex: 'workOrderStatusName',
                    flex: 1,
                    hidden:false,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                        metaData.style = Ext.String.format("background-color: {0};background-image: none;",
                            record.raw['workOrderStatus']['workOrderStatusColor']);
                        return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                    }
                }
            ]
        };
        return items;
    }
});