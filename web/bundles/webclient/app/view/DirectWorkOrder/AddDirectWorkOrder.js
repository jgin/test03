/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DirectWorkOrder.AddDirectWorkOrder', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addDirectWorkOrder',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Direct Work Order',
    record: null,
    showWarningBeforeCancel: true,
    messages: {
        labels: {
            equipmentType: 'Equipment Type',
            equipment: 'Equipment',
            lot: 'Lot',
            workRequestNumber: 'Work Request Number',
            workRequestFullNumber: 'Request Nbr.',
            workOrderDate: 'Work Order Date',
            workOrderNumber: 'Work Order Number',
            workRequestSource: 'Work Request Source',
            workOrderReason: 'Work Order Reason',
            generalData: 'General Data',
            manHours: 'Man Hours',
            machineHours: 'Machine Hours',
            locationName: 'Location',
            workRequestSourceName: 'Request Source',
            equipmentName: 'Equipment',
            sectorName: 'Sector',
            taskScheduler: 'Scheduler',
            workCategoryName: 'Work Category',
            workCategoryDetail: 'Work Type',
            attentionMaximumDate: 'Attent. Max. Date',
            description: 'Description',
            workShop: 'Work Shop',
            quadrille: 'Quadrille',
            workShopCoordinator: 'Coordinator',
            executionDate: 'Execution Date',
            executionStartDate: 'Start',
            executionEndDate: 'End',
            serviceOrder: 'Is it Service Order?',
            contractor: 'Contractor',
            serviceOrderNumber: 'Service Nbr.',
            execution: 'Execution',
            workOrderService: 'Order Service',
            plannedHours: 'Planned Hours',
            peformedHours: 'Performed Hours',
            activityTab: 'Activities',
            productTab: 'Materials',
            partialSave: 'Partial Save',
            closeOrder: 'Close Order',
            executeData: 'Execution',
            percentageUseResources: 'Percentage usage resources',
            percentageAdvance: 'Percenge Advance',
            executionData: 'Execution Data',
            comment: 'Comment',
            responsibleOfInstallation: 'Responsible Of Installation'
        },
        validations: {
            alertTitle: 'Message',
            firstSelectEquipmentAlertText: 'Select equipment type before perform search!',
            selectSector: 'Select sector first...',
            selectWorkCategory: 'Select work category first...',
            selectWorkShop: 'Select workshop first...'
        },
        equipmentEmptyText: 'Type an equipment name...',
        workCategoryDetailEmptyText: 'Type work type',
        loadTemplateText: 'Load Template',
        workRequestData: 'Work Request Data',
        resourcesData: 'Resources',
        messageText: 'Message',
        quadrilleData:'Quadrille',
        evidenceData:'Evidence Files'
    },
    modal: true,
    width: 850,
    layout: 'fit',
    controller: null,
    initComponent: function(){
        var me = this;
        
        var tabItems = new Array();
        
        var mainDataItems = new Array();
        mainDataItems.push(me.getGeneralDataItems());
        //mainDataItems.push(me.getExecutionItems());
        mainDataItems.push(me.getWorkServiceItems());
        
        tabItems.push({
            xtype: 'panel',
            title: me.messages.labels.generalData,
            items: mainDataItems
        });
        
        tabItems.push({
            xtype: 'panel',
            title: me.messages.labels.executionData,
            items: [
                me.getExecutionItems()
            ]
        });
        
        var resourcesTabItems = new Array();
        resourcesTabItems.push(Ext.create('sisprod.view.DirectWorkOrder.ActivityOtGrid', {id:'directWOActivityOtGrid'}));
        resourcesTabItems.push(Ext.create('sisprod.view.DirectWorkOrder.ProductGrid', {id: 'directWOProductGrid'}));
        
        var resourcesTab = Ext.create('Ext.tab.Panel', {
            items: resourcesTabItems
        });
        
        tabItems.push({
            xtype: 'panel',
            title: me.messages.resourcesData,
            items: resourcesTab,
            tbar: [
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
                    margin:'0 0 0 10',
                    minValue:0,
                    flex: 2
                }
            ]
        });
        
        var quadrilleGrid=Ext.create('sisprod.view.WorkOrderExecution.QuadrilleEmployeeGrid', {id:'directWOQuadrilleEmployeesGrid'});
        var quadrilleEmployeeControls = new Array();
        quadrilleEmployeeControls.push(quadrilleGrid);
        tabItems.push({
            xtype: 'panel',
            id: 'quadrillePanel',
            title: me.messages.quadrilleData,
            items: quadrilleEmployeeControls
        });
        
        var tabPanel = Ext.create('Ext.tab.Panel', {
            items: tabItems,
            id: 'tabContainer'
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
            ],
            buttons: [
                {
                    text: me.messages.generate,
                    action: 'generateOrder',
                    iconCls: 'generateOrder'
                },
                {
                    text: me.windowMessages.closeText,
                    iconCls: 'cancel',
                    action: 'close',
                    handler: function() {
                        var window = me;
                        window.close();
                    }
                }
            ]
        };
        
        me.callParent(arguments);
    },
    
    getGeneralDataItems: function(){
        var me = this;
        
        var items = {};
        items = {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: me.messages.labels.generalData,
            defaultType: 'textfield',
            defaults: {anchor: '100%'},
            layout: 'anchor',
            items: [
                {
                    xtype: 'combofieldcontainer',
                    showButtons: false,
//                            flex: 1,
                    comboBoxOptions: {
                        name: 'idLot',
                        id: 'idLot',
                        labelWidth: 120,
                        store: Ext.create('sisprod.store.LotAll'),
                        fieldLabel: me.messages.labels.lot,
                        displayField: 'lotName',
                        valueField: 'idLot',
                        forceSelection: true,
                        allowBlank: false
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'idSector',
                    id: 'idSector',
                    labelWidth: 120,
                    anchor: '50%',
                    store: Ext.create('sisprod.store.SectorAll').load(),
                    fieldLabel: me.messages.labels.sectorName,
                    displayField: 'sectorName',
                    valueField: 'idSector',
                    forceSelection: true,
                    allowBlank: false,
                    editable: false
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
//                    anchor: '100%',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel : me.messages.labels.equipmentType,
                            labelWidth: 120,
                            store : Ext.create('sisprod.store.EquipmentTypeAll'),
                            displayField: 'equipmentTypeName',
                            valueField: 'idEquipmentType',
                            name:'idSelectEquipmentType',
                            id:'idSelectEquipmentType',
                            allowBlank:false,
                            forceSelection : true,
                            flex: 3
                        },
                        {
                            xtype: 'sensitivecombocontainer',
                            margin: '0 0 0 10',
                            showAddButton: false,
                            flex: 4,
//                            anchor: '80%',
                            sensitiveComboBoxOptions:{
                                name: 'idEquipment',
                                id: 'idEquipment',
                                fieldLabel: me.messages.labels.equipment,
                                labelWidth: 100,
                                hideTrigger: false,
                                store: Ext.create('sisprod.store.EquipmentAllByType',{
                                    listeners: {
                                        beforeload: function(store, operation, options){
                                            var form = me.down('form');
                                            var equipmentTypeInput = form.queryById('idSelectEquipmentType');
                                            var selectedEquipmentType = equipmentTypeInput.getValue();
                                            if(Ext.isDefined(selectedEquipmentType) && selectedEquipmentType!==null)
                                                if(Ext.isDefined(operation.params) && operation.params!==null)
                                                    operation.params.idEquipmenType = selectedEquipmentType;
                                                else operation.params = {query: '', idEquipmenType: selectedEquipmentType};
                                            else{
                                                Ext.Msg.alert(me.messages.messageText, me.messages.validations.firstSelectEquipmentAlertText);
                                                return false;
                                            }
                                        }
                                    }
                                }),
                                emptyText: me.messages.equipmentEmptyText,
                                forceSelection : true,
                                allowBlank: false,
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">','{equipmentName} ({locationName})','</tpl>'),
                                valueField: 'idEquipment',
                                listConfig: {
                                    getInnerTpl: function() {
                                        return "{equipmentName} ({locationName})";
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'idWorkCategory',
                    id: 'idWorkCategory',
                    anchor: '80%',
                    flex: 1,
                    labelWidth: 120,
                    store: Ext.create('sisprod.store.WorkCategoryAll').load(),
                    fieldLabel: me.messages.labels.workCategoryName,
                    displayField: 'workCategoryName',
                    valueField: 'idWorkCategory',
                    forceSelection: true,
                    allowBlank: false,
                    editable: false
                },
                {
                    xtype: 'sensitivecombocontainer',
                    anchor: '100%',
                    showAddButton: false,
                    sensitiveComboBoxOptions:{
                        hideTrigger: false,
                        labelWidth: 120,
                        name: 'idWorkCategoryDetail',
                        id: 'idWorkCategoryDetail',
                        fieldLabel: me.messages.labels.workCategoryDetail,
                        store: Ext.create('sisprod.store.WorkCategoryDetailByCategory',{
                            listeners: {
                                beforeload: function(store, operation, options){
                                    var idWorkCategory = me.down('#idWorkCategory').getValue();
                                    if(Ext.isDefined(idWorkCategory) && idWorkCategory!==null){
                                        if(Ext.isDefined(operation.params) && operation.params!==null)
                                            operation.params.idWorkCategory = idWorkCategory;
                                        else operation.params = {query: '', idWorkCategory: idWorkCategory};
                                    }
                                    else{
                                        Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectWorkCategory);
                                        return false;
                                    }
                                }
                            }
                        }),
                        emptyText: me.messages.workCategoryDetailEmptyText,
                        forceSelection : true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{workCategoryDetailName}','</tpl>'),
                        valueField: 'idWorkCategoryDetail',
                        listConfig: {
                            getInnerTpl: function() {
                                return "{workCategoryDetailName}";
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'idWorkOrderReason',
                    id: 'idWorkOrderReason',
                    labelWidth: 120,
                    anchor: '45%',
                    store: Ext.create('sisprod.store.AllWorkOrderReasonStore'),
                    fieldLabel: me.messages.labels.workOrderReason,
                    displayField: 'workOrderReasonName',
                    valueField: 'idWorkOrderReason',
                    forceSelection: true,
                    allowBlank: false
                },
//                {
//                    xtype: 'combobox',
//                    name: 'idWorkOrderReason',
//                    id: 'idWorkOrderReason',
//                    labelWidth: 120,
//                    anchor: '50%',
//                    store: Ext.create('sisprod.store.WorkOrderReasonAll').load(),
//                    fieldLabel: me.messages.labels.workOrderReason,
//                    displayField: 'workOrderReasonName',
//                    valueField: 'idWorkOrderReason',
//                    forceSelection: true,
//                    allowBlank: false,
//                    editable: false
//                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,                    
                    title: me.messages.labels.description,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            name: 'description',
                            id: 'description',
                            allowBlank: false
                        }
                    ]
                }
            ]
        };
        return items;
    },
    
     getExecutionItems: function(){
        var me = this;
        var items = {};
        items = {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: me.messages.labels.execution,
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
                            xtype: 'sensitivecombo',
                            flex: 1,
                            hideTrigger: false,
                            name: 'idWorkShop',
                            id: 'idWorkShop',
                            allowBlank: false,
                            fieldLabel: me.messages.labels.workShop,
//                            labelWidth: 120,
                            store: Ext.create('sisprod.store.AllWorkShopBySectorStore',{
                                listeners: {
                                    beforeload: function(store, operation, options){
                                        var form = me.down('form');
                                        var sectorInput = form.queryById('idSector');
                                        var selectedSector = sectorInput.getValue();
                                        if(Ext.isDefined(selectedSector) && selectedSector!==null){
                                            if(Ext.isDefined(operation.params) && operation.params!==null)
                                                operation.params.idSector = selectedSector;
                                            else operation.params = {query: '', idSector: selectedSector};
                                        }
                                        else{
                                            Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectSector);
                                            return false;
                                        }
                                    }
                                }
                            }),
                            forceSelection : true,
                            requiredForWorkOrder: true,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{workShopName}','</tpl>'),
                            valueField: 'idWorkShop',
                            listConfig: {
                                getInnerTpl: function() { return "{workShopName}"; }
                            }
                        },
                        {
                            xtype: 'sensitivecombo',
                            hideTrigger: false,
                            name: 'idQuadrille',
                            id: 'idQuadrille',
                            allowBlank: false,
                            store: Ext.create('sisprod.store.AllQuadrilleByWorkShopStore',{
                                listeners: {
                                    beforeload: function(store, operation, options){
                                        var idWorkShop = me.down('#idWorkShop').getValue();
                                        if(Ext.isDefined(idWorkShop) && idWorkShop !== null){
                                            if(Ext.isDefined(operation.params) && operation.params!==null)
                                            operation.params.idWorkShop = idWorkShop;
                                            else operation.params = {query: '', idWorkShop: idWorkShop};
                                        }
                                        else{
                                            Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectWorkShop);
                                        }
                                    }
                                }
                            }),
                            flex: 1,
                            fieldLabel: me.messages.labels.quadrille,
                            margin: '0 0 0 10',
                            forceSelection : true,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{quadrilleName}','</tpl>'),
                            valueField: 'idQuadrille',
                            listConfig: {
                                getInnerTpl: function() {
                                    return "{quadrilleName}";
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'sensitivecombo',
                    hideTrigger: false,
                    anchor: '65%',
                    name: 'idWorkShopCoordinator',
                    id: 'idWorkShopCoordinator',
                    allowBlank: false,
                    fieldLabel: me.messages.labels.workShopCoordinator,
                    store: Ext.create('sisprod.store.AllCoordinatorByWorkShopStore',{
                        listeners: {
                            beforeload: function(store, operation, options){
                                var idWorkShop = me.down('#idWorkShop').getValue();
                                if(Ext.isDefined(idWorkShop) && idWorkShop !== null){
                                    if(Ext.isDefined(operation.params) && operation.params!==null)
                                    operation.params.idWorkShop = idWorkShop;
                                    else operation.params = {query: '', idWorkShop: idWorkShop};
                                }
                                else{
                                    Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectWorkShop);
                                }
                            }
                        }
                    }),
                    forceSelection : true,
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">','{personFullName} ({fullDocumentNumber})','</tpl>'),
                    valueField: 'idWorkShopCoordinator',
                    listConfig: {
                        getInnerTpl: function() {
                            return "{personFullName} ({fullDocumentNumber})";
                        }
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: me.messages.labels.executionDate,
                    anchor: '60%',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'executionStartDate',
                            id: 'executionStartDate',
                            flex: 1,
                            fieldLabel: me.messages.labels.executionStartDate,
                            labelWidth: 30,
                            labelSeparator: '',
                            allowBlank: false,
                            vtype: 'daterange',
                            endDateField: 'executionEndDate'
                        },
                        {
                            xtype: 'datefield',
                            name: 'executionEndDate',
                            id: 'executionEndDate',
                            flex: 1,
                            labelWidth: 30,
                            labelSeparator: '',
                            allowBlank: false,
                            fieldLabel: me.messages.labels.executionEndDate,
                            margin: '0 0 0 10',
                            vtype: 'daterange',
                            startDateField: 'executionStartDate'
                        }
                    ]
                },
                { 
                    xtype: 'sensitivecombocontainer', 
                    showAddButton: false, 
                    anchor: '80%', 
                    sensitiveComboBoxOptions:{ 
                        labelWidth: 120, 
                        hideTrigger: false, 
                        fieldLabel: me.messages.labels.responsibleOfInstallation, 
                        store: Ext.create('sisprod.store.EmployeeFromGMP'), 
                        emptyText: me.messages.labels.responsibleOfInstallation, 
                        id: 'idResponsibleOfInstallation', 
                        name: 'idResponsibleOfInstallation',
                        forceSelection : true, 
                        allowBlank: false, 
                        displayTpl: Ext.create('Ext.XTemplate', 
                            '<tpl for=".">','{personFullName} ({fullDocumentNumber})','</tpl>'), 
                        valueField: 'idEmployee', 
                        listConfig: { 
                            getInnerTpl: function() { 
                                return '{personFullName} ({fullDocumentNumber})'; 
                            } 
                        } 
                    } 
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
                            id: 'comment'
                        }
                    ]
                }                        /*,
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    anchor: '100%',
                    fieldDefaults: { labelWidth: 180 },
                    items: [
                        {
                            xtype: 'numberfield',
                            hideTrigger: false,
                            id: 'percentageUsageResources',
                            name: 'percentageUsageResources',
                            minValue: 0,
                            maxValue: 100,
                            fieldLabel: me.messages.labels.percentageUseResources + '(%)',
                            readOnly: true
                        },
                        {
                            xtype: 'numberfield',
                            name: 'percentageAdvance',
                            id: 'percentageAdvance',
                            labelWidth: 150,
                            minValue: 0,
                            maxValue: 100,
                            fieldLabel: me.messages.labels.percentageAdvance + '(%)',
                            margins: '0 0 0 10',
                            allowBlank: false
                        }
                    ]
                }*/
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
            anchor: '100%',
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
                            xtype: 'checkbox',
                            name: 'ownResources',
                            id: 'ownResources',
                            flex: .8,
                            fieldLabel: me.messages.labels.serviceOrder,
                            inputValue: true
                        },
                        {
                            xtype: 'combobox',            
                            fieldLabel : me.messages.labels.supplier,
                            store : Ext.create('sisprod.store.AllAuthorizedSupplier').load(),
                            displayField : 'entityName',
                            valueField : 'idSupplier',
                            name:'idSupplier',
                            id:'idSupplier',
                            flex: 3,
                            forceSelection : true,
                            allowBlank : false,
                            editable : false,
                            disabled: true
                        },
                        {
                            xtype: 'textfield',
                            flex: 2,
                            name: 'serviceOrderNumber',
                            id: 'serviceOrderNumber',
                            fieldLabel: me.messages.labels.serviceOrderNumber,
                            maxLength: 20,
                            margin: '0 0 0 10',
                            disabled: true
                        }
                    ]
                }
            ]
        };
        return items;
    }
});