/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrderClosable.WorkOrderConsult', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.workOrderConsult',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    id: 'consulta',
    title: 'Work Order Consult',
    record: null,
    messages: {
        labels: {
            workOrderDate: 'Work Order Date',
            workOrderNumber: 'Work Order Number',
            manHours: 'Man Hours',
            machineHours: 'Machine Hours',
            taskScheduler: 'Scheduler',
            workCategoryName: 'Work Category',
            workCategoryDetail: 'Work Type',
            attentionMaximumDate: 'Attent. Max. Date',
            workShop: 'Work Shop',
            quadrille: 'Quadrille',
            workShopCoordinator: 'Coordinator',
            generalData: 'General Data',
            scheduledDate: 'Scheduled Date',
            scheduledStartDate: 'Start',
            scheduledEndDate: 'End',
            serviceOrder: 'Is it Service Order?',
            contractor: 'Contractor',
            serviceOrderNumber: 'Service Nbr.',
            scheduling: 'Scheduling',
            workOrderService: 'Order Service',
            plannedHours: 'Planned Hours',
            peformedHours: 'Performed Hours',
            activityTab: 'Activities',
            productTab: 'Materials',
            saveObservation: 'Observation Save',
            closeOrder: 'Close Order',
            executeData: 'Closable',
            percentageUseResources: 'Percentage usage resources',
            percentageAdvance: 'Percenge Advance',
            comment: 'Comment'
        },
        loadTemplateText: 'Load Template',
        workRequestData: 'Work Request Data',
        resourcesData: 'Resources',
        messageText: 'Message',
        quadrilleData:'Quadrille',
        evidenceData:'Evidence Files'
    },
    modal: true,
    width: 750,
    layout: 'fit',
    controller: null,
    initComponent: function(){
        var me = this;
        
        var tabItems = new Array();
        
        var mainDataItems = new Array();
        mainDataItems.push(me.getScheduleItems());
//        mainDataItems.push(me.getExecuteItems());
        if(!me.record.data.ownResources){
            mainDataItems.push(me.getWorkServiceItems());
        }
        else{
            this.width = 700;
        }
        
        tabItems.push({
            xtype: 'panel',
            title: me.messages.labels.generalData,
            items: mainDataItems
        });
        
        tabItems.push({
            xtype: 'panel',
            title: me.messages.labels.executeData,
            items: [
                me.getExecuteItems()
            ]
        });
        
        var resourcesTabItems = new Array();
        
        var activityTabs = new Array();
        activityTabs.push(Ext.create('sisprod.view.WorkOrderClosable.ActivityClosableOtGrid', {id:'activityClosableOtGrid', controller:this.controller}));
        activityTabs.push(Ext.create('sisprod.view.WorkOrderClosable.NewActivityGrid', {id:'newActivityGrid', controller: this.controller}));
        resourcesTabItems.push({
            xtype: 'tabpanel',
            title: me.messages.labels.activityTab,
            items: activityTabs,
            tabPosition: 'bottom'
        });
        
        var productTabs = new Array();
        productTabs.push(Ext.create('sisprod.view.WorkOrderClosable.WorkOrderScheduledProductGrid'));
        productTabs.push(Ext.create('sisprod.view.WorkOrderClosable.WorkOrderProductGrid'));
        resourcesTabItems.push({
            xtype: 'tabpanel',
            title: me.messages.labels.productTab,
            items: productTabs,
            tabPosition: 'bottom'
        });
        var quadrilleGrid=Ext.create('sisprod.view.WorkOrderClosable.QuadrilleEmployeeGrid', {id:'quadrilleEmployeesGrid'});
        var quadrilleEmployeeControls = new Array();
        quadrilleEmployeeControls.push(quadrilleGrid);
        var evidenceFilesGrid=Ext.create('sisprod.view.WorkOrderClosable.EvidenceFilesGrid', {
            id:'evidenceFilesGrid',
            idWorkOrder:me.record.data.idWorkOrder,
            store: Ext.create('sisprod.store.EvidenceFileByWorkOrderStore').load({params:{idWorkOrder:me.record.data.idWorkOrder}})
        });
        var evidenceFilesControls = new Array();
        evidenceFilesControls.push(evidenceFilesGrid);
        
        var resourcesTab = Ext.create('Ext.tab.Panel', {
            items: resourcesTabItems
        });
       
        
        tabItems.push({
            xtype: 'panel',
            title: me.messages.resourcesData,
            items: [resourcesTab],
            layou: 'hbox',
            tbar: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    title: me.messages.labels.plannedHours,
                    margins: '0 0 0 5',
                    items: [
                        {
                            xtype: 'numberfield',
                            id: 'manHours',
                            name: 'manHours',
                            fieldLabel: me.messages.labels.manHours,
                            readOnly:true,
                            allowDecimals: true,
                            decimalSeparator:'.',
                            value:0,
                            minValue:0,
                            flex: 2
                        },
                        {
                            xtype: 'numberfield',
                            id: 'machineHours',
                            name: 'machineHours',
                            fieldLabel: me.messages.labels.machineHours,
                            readOnly:true,
                            allowDecimals: true,
                            decimalSeparator:'.',
                            value:0,
                            minValue:0,
                            flex: 2
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: me.messages.labels.peformedHours,
                    margins: '0 5 0 5',
                    flex: 1,
                    items: [
                        {
                            xtype: 'numberfield',
                            id: 'performedManHours',
                            name: 'performedManHours',
                            fieldLabel: me.messages.labels.manHours,
                            readOnly:true,
                            allowDecimals: true,
                            decimalSeparator:'.',
                            value:0,
                            minValue:0,
                            flex: 2
                        },
                        {
                            xtype: 'numberfield',
                            id: 'performedMachineHours',
                            name: 'performedMachineHours',
                            fieldLabel: me.messages.labels.machineHours,
                            readOnly:true,
                            allowDecimals: true,
                            decimalSeparator:'.',
                            value:0,
                            minValue:0,
                            flex: 2
                        }
                    ]
                }
            ]
        },
//        {
//            xtype: 'panel',
//            title: me.messages.quadrilleData,
//            items: quadrilleEmployeeControls,
//            layou: 'hbox'
//        },
        {
            xtype: 'panel',
            title: me.messages.evidenceData,
            items: evidenceFilesControls,
            layou: 'hbox'
        }
        );
            
        if(me.record.data.ownResources){
            var quadrilleGrid=Ext.create('sisprod.view.WorkOrderClosable.QuadrilleEmployeeGrid', {id:'quadrilleEmployeesGrid'});
            var quadrilleEmployeeControls = new Array();
            quadrilleEmployeeControls.push(quadrilleGrid);
            tabItems.push({
                xtype: 'panel',
                title: me.messages.labels.quadrille,
                items: quadrilleEmployeeControls
            });
        }
        
        var tabPanel = Ext.create('Ext.tab.Panel', {
            items: tabItems
        });
        
        me.formOptions = {
            region: 'center',
            labelWidth: 120,
            bodyStyle: 'padding:5px 5px 0',
            layout: 'fit',
            buttons: [
                {
                    text: me.windowMessages.closeText,
                    iconCls: 'cancel',
                    action: 'close',
                    handler: function() {
                        var window = me;
                        window.close();
                    }
                }
            ],
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
    getScheduleItems: function(){
        var me = this;
        var items = {};
        items = {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: me.messages.labels.scheduling,
            defaultType: 'textfield',
            defaults: {anchor: '100%'},
            layout: 'anchor',
            items: [
                {
                    id: 'idWorkOrder',
                    name: 'idWorkOrder',
                    xtype: 'hiddenfield'
                },
                {
                    id: 'idQuadrille',
                    name: 'idQuadrille',
                    xtype: 'hiddenfield'
                },
                {
                    xtype: 'fieldcontainer',
                    anchor: '100%',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            name: 'workshopName',
                            id: 'workshopName',
                            fieldLabel: me.messages.labels.workShop,
                            readOnly: true  
                        },
                        {
                            xtype: 'textfield',
                            name: 'quadrileName',
                            id: 'quadrileName',
                            flex: 1,
                            fieldLabel: me.messages.labels.quadrille,
                            margin: '0 0 0 10',
                            readOnly: true
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: me.messages.labels.workShopCoordinator,
                    anchor: '65%',
                    name: 'workshopCoordinatorName',
                    id: 'workshopCoordinatorName',
                    readOnly: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: me.messages.labels.scheduledDate,
                    anchor: '60%',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'startDate',
                            id: 'startDate',
                            flex: 1,
                            fieldLabel: me.messages.labels.scheduledStartDate,
                            labelWidth: 30,
                            labelSeparator: '',
                            readOnly: true
                        },
                        {
                            xtype: 'datefield',
                            name: 'endDate',
                            id: 'endDate',
                            flex: 1,
                            readOnly: true,
                            labelWidth: 30,
                            labelSeparator: '',
                            fieldLabel: me.messages.labels.scheduledEndDate,
                            margin: '0 0 0 10'
                        }
                    ]
                }
            ]
        };
        return items;
    },
    
    getWorkServiceItems: function(){
        var me = this;
        var items = {};
        items = {
            xtype:'fieldset',
            columnWidth: 0.5,
            id: 'workServicePanel',
            title: me.messages.labels.workOrderService,
            defaultType: 'textfield',
            defaults: {anchor: '100%'},
            layout: 'anchor',
            items: [
                {
                    xtype: 'fieldcontainer',
                    anchor: '100%',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 3,
                            hideTrigger: false,
                            name: 'entityName',
                            id: 'entityName',
                            fieldLabel: me.messages.labels.contractor,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            flex: 2,
                            name: 'serviceOrderNumber',
                            id: 'serviceOrderNumber',
                            fieldLabel: me.messages.labels.serviceOrderNumber,
                            readOnly: true,
                            margin: '0 0 0 10'
                        }
                    ]
                }
            ]
        };
        return items;
    },
            
    getRecord: function(){
        return this.record;
    },
    getExecuteItems: function(){
        var me = this;
        var items = {};
        items = {
            xtype:'fieldset',
            columnWidth: 0.5,
            id: 'executePanel',
            title: 'Datos de Ejecucion',
            defaultType: 'textfield',
            margins: '0 0 0 0',
            fieldDefaults: {anchor: '100%', labelWidth: 170},
            layout: 'anchor',
            items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    hideTrigger: false,
                                    id: 'percentageUsageResources',
                                    name: 'percentageUsageResources',
                                    minValue: 0,
                                    labelWidth: 120,
                                    fieldLabel: me.messages.labels.percentageUseResources + '(%)',
                                    readOnly: true
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'percentageAdvance',
                                    id: 'percentageAdvance',
                                    minValue: 0,
                                    maxValue: 100,
                                    labelWidth: 120,
                                    fieldLabel: me.messages.labels.percentageAdvance + '(%)',
                                    margins: '0 0 0 10',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: me.messages.labels.executionDates,
                            layout: 'hbox',
                            anchor: '80%',
                            labelWidth: 120,
                            items: [
                                {
                                    xtype: 'datefield',
                                    vtype: 'daterange',
                                    name: 'executionStartDate',
                                    id: 'executionStartDate',
                                    fieldLabel: me.messages.labels.scheduledStartDate,
                                    labelWidth: 35,
                                    flex: 1,
                                    labelSeparator: '',
                                    readOnly: true,
                                    endDateField: 'executionEndDate'
                                },
                                {
                                    xtype: 'datefield',
                                    vtype: 'daterange',
                                    name: 'executionEndDate',
                                    id: 'executionEndDate',
                                    labelWidth: 25,
                                    flex: 1,
                                    labelSeparator: '',
                                    fieldLabel: me.messages.labels.scheduledEndDate,
                                    margin: '0 0 0 10',
                                    startDateField: 'executionStartDate',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype:'fieldset',
                            columnWidth: 0.5,
                            title: me.messages.labels.comment,
                            defaultType: 'textfield',
                            defaults: {anchor: '100%'},
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    height: 40,
                                    name: 'comment',
                                    readOnly: true,
                                    id: 'comment'
                                }
                            ]
                        }
            ]
        };
        return items;
    }
});