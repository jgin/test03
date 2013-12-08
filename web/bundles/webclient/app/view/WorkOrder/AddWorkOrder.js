/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrder.AddWorkOrder', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addWorkOrder',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Work Order',
    messages: {
        labels: {
            generalData: 'General Data',
            manHours: 'Man Hours',
            machineHours: 'Machine Hours',
            workRequestFullNumber: 'Request Nbr.',
            locationName: 'Location',
            workRequestSourceName: 'Request Source',
            equipmentName: 'Equipment',
            sectorName: 'Sector',
            taskScheduler: 'Scheduler',
            workCategoryName: 'Work Category',
            workCategoryDetail: 'Work Type',
            attentionMaximumDate: 'Attent.Max.Date',
            description: 'Description',
            workShop: 'Work Shop',
            quadrille: 'Quadrille',
            workShopCoordinator: 'Coordinator',
            scheduledDate: 'Scheduled Date',
            scheduledStartDate: 'Start',
            scheduledEndDate: 'End',
            serviceOrder: 'Is it Service Order?',
            contractor: 'Contractor',
            serviceOrderNumber: 'Service Nbr.',
            scheduling: 'Scheduling',
            workOrderService: 'Order Service',
            supplier: 'Supplier'
        },
        validations: {
            selectSector: 'Select sector first...',
            selectWorkCategory: 'Select work category first...',
            selectWorkShop: 'Select workshop first...'
        },
        taskSchedulerEmptyText: 'Type and scheduler name...',
        workCategoryDetailEmptyText: 'Type work type description...',
        loadTemplateText: 'Load Template',
        saveTemplateText: 'Save as Template',
        workRequestData: 'Work Request Data',
        resourcesData: 'Resources',
        messageText: 'Message',
        generateOrderButtonText: 'Generate WO',
        partialSaveButtonText: 'Save partial data'
    },
    modal: true,
    width: 780,
    layout: 'fit',
    
    initComponent: function(){
        var me = this;
        
        var tabItems = new Array();
        
        var mainDataItems = new Array();
        mainDataItems.push(me.getMainDataItems());
        mainDataItems.push(me.getScheduleItems());
        mainDataItems.push(me.getWorkServiceItems());
        
        tabItems.push({
            xtype: 'panel',
            title: me.messages.labels.generalData,
            items: mainDataItems
        });
        
        var resourcesTabItems = new Array();
        resourcesTabItems.push(Ext.create('sisprod.view.WorkOrder.ActivityOtGrid'));
//        resourcesTabItems.push(Ext.create('sisprod.view.WorkOrder.EquipmentGrid', {id:'equipmentGrid'}));
        resourcesTabItems.push(Ext.create('sisprod.view.WorkOrder.PPEquipmentGrid'));
        resourcesTabItems.push(Ext.create('sisprod.view.WorkOrder.ProductGrid'));
        var resourcesTab = Ext.create('Ext.tab.Panel', {
            items: resourcesTabItems
        });
        
        tabItems.push({
            xtype: 'panel',
            title: me.messages.resourcesData,
            items: [resourcesTab],
            tbar: [
                {
                    xtype: 'numberfield',
                    id: 'manHours',
                    name: 'manHours',
                    fieldLabel: me.messages.labels.manHours,
//                    labelWidth:100,
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
//                    labelWidth:100,
                    fieldLabel: me.messages.labels.machineHours,
                    readOnly:true,
                    allowDecimals: true,
                    decimalSeparator:'.',
                    value:0,
                    margin:'0 0 0 10',
                    minValue:0,
                    flex: 2
                },
                {
                    xtype: 'button',
                    text: me.messages.loadTemplateText,
                    iconCls: 'upload',
                    action: 'loadTemplate',
                    flex: 1
                },
                {
                    xtype: 'button',
                    text: me.messages.saveTemplateText,
                    iconCls: 'save',
                    action: 'saveTemplate',
                    flex: 1
                }
            ]
        });
        //
        
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
            ],
            buttons: [
                {
                    text: me.messages.generateOrderButtonText,
                    action: 'generateOrder',
                    iconCls: 'generateOrder'
                },
                {
                    text: me.messages.partialSaveButtonText,
                    action: 'partialSave',
                    iconCls: 'save'
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
        
        me.on('enableFieldsForGeneralScheduler', me.enableFieldsForGeneralScheduler, me);
        me.on('afterrender', me.afterrender, me);
        
        me.callParent(arguments);
    },
    
    afterrender: function(){
        var me = this;
        me.verifyGeneralScheduler();
//        me.callParent(arguments);
    },
    
    getMainDataItems: function(){
        var me = this;
        var items = {};
        items = {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: me.messages.workRequestData,
            defaultType: 'textfield',
            defaults: {anchor: '100%'},
            layout: 'anchor',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWorkRequest',
                    id: 'idWorkRequest',
                    value: me.data['idWorkRequest']
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
                            fieldLabel: me.messages.labels.workRequestFullNumber,
                            readOnly: true,
                            value: me.data['workRequestFullNumber']
                        },
                        {
                            xtype: 'textfield',
                            name: 'locationName',
                            id: 'locationName',
                            flex: 1,
                            fieldLabel: me.messages.labels.locationName,
                            readOnly: true,
                            margin: '0 0 0 10',
                            value: me.data['location']['locationName']
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
                            name: 'workRequestSourceName',
                            id: 'workRequestSourceName',
                            flex: 1,
                            fieldLabel: me.messages.labels.workRequestSourceName,
                            readOnly: true,
                            value: me.data['workRequestSource']['workRequestSourceName']
                        },
                        {
                            xtype: 'textfield',
                            name: 'equipmentName',
                            id: 'equipmentName',
                            flex: 1,
                            fieldLabel: me.messages.labels.equipmentName,
                            readOnly: true,
                            margin: '0 0 0 10',
                            value: me.data['equipment']['equipmentName']
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'idSector',
                            id: 'idSector',
                            flex: 3,
//                            anchor: '60%',
                            store: Ext.create('sisprod.store.SectorAll').load(),
                            fieldLabel: me.messages.labels.sectorName,
                            displayField: 'sectorName',
                            valueField: 'idSector',
                            forceSelection: true,
                            allowBlank: false,
                            readOnly: true,
                            editable: false,
                            value: me.data['sector']['idSector']
                        },
                        {
                            xtype: 'sensitivecombocontainer',
//                            anchor: '100%',
                            flex: 5,
                            showAddButton: false,
                            sensitiveComboBoxOptions:{
                                hideTrigger: false,
                                name: 'idTaskScheduler',
                                id: 'idTaskScheduler',
                                fieldLabel: me.messages.labels.taskScheduler,
//                                labelWidth: 120,
                                store: Ext.create('sisprod.store.TaskSchedulerBySector',{
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
                                emptyText: me.messages.taskSchedulerEmptyText,
                                forceSelection : true,
                                allowBlank: false,
                                readOnly: true,
                                margin: '0 0 0 10',
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">','{personFullName} ({fullDocumentNumber})','</tpl>'),
                                valueField: 'idTaskScheduler',
                                listConfig: {
                                    getInnerTpl: function() {
                                        return "{personFullName} ({fullDocumentNumber})";
                                    }
                                },
                                value: new Ext.create(sisprod.getApplication().getModelName('TaskScheduler'),{
                                    idTaskScheduler: me.data['taskScheduler']['idTaskScheduler'],
                                    personFullName: me.data['taskScheduler']['employee']['person']['personFullName'],
                                    fullDocumentNumber: me.data['taskScheduler']['employee']['person']['fullDocumentNumber']
                                })
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'idWorkCategory',
                            id: 'idWorkCategory',
//                            anchor: '65%',
                            flex: 1,
        //                    labelWidth: 120,
                            store: Ext.create('sisprod.store.WorkCategoryAll').load(),
                            fieldLabel: me.messages.labels.workCategoryName,
                            displayField: 'workCategoryName',
                            valueField: 'idWorkCategory',
                            forceSelection: true,
                            allowBlank: false,
                            readOnly: true,
                            editable: false,
                            value: me.data['workCategoryDetail']['workCategory']['idWorkCategory']
                        },
                        {
                            xtype: 'sensitivecombocontainer',
//                            anchor: '80%',
                            flex: 1,
                            showAddButton: false,
                            margin: '0 0 0 10',
                            sensitiveComboBoxOptions:{
                                hideTrigger: false,
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
                                readOnly: true,
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">','{workCategoryDetailName}','</tpl>'),
                                valueField: 'idWorkCategoryDetail',
                                listConfig: {
                                    getInnerTpl: function() {
                                        return "{workCategoryDetailName}";
                                    }
                                },
                                value: new Ext.create(sisprod.getApplication().getModelName('WorkCategoryDetail'),{
                                    idWorkCategoryDetail: me.data['workCategoryDetail']['idWorkCategoryDetail'],
                                    idWorkCategory: me.data['workCategoryDetail']['workCategory']['idWorkCategory'],
                                    workCategoryName: me.data['workCategoryDetail']['workCategory']['workCategoryName'],
                                    workCategoryDetailName: me.data['workCategoryDetail']['workCategoryDetailName']
                                })
                            }
                        }
                    ]
                },
                {
                    xtype: 'datefield',
                    name: 'attentionMaximumDate',
                    id: 'attentionMaximumDate',
                    fieldLabel: me.messages.labels.attentionMaximumDate,
                    allowBlank: false,
                    readOnly: true,
                    anchor: '30%',
                    value: me.data['attentionMaximumDate'],
                    listeners: {
                        change: function(field, newValue, oldValue, eventOptions){
                            me.down('#scheduledStartDate').setMaxValue(newValue);
                            me.down('#scheduledStartDate').validate();
                        }
                    }
                },
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
                            allowBlank: false,
                            value: me.data['description']
                        }
                    ]
                }
            ]
        };
        return items;
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
                    xtype: 'fieldcontainer',
                    anchor: '100%',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'sensitivecombo',
//                            anchor: '100%',
                            flex: 1,
                            hideTrigger: false,
                            name: 'idWorkShop',
                            id: 'idWorkShop',
                            fieldLabel: me.messages.labels.workShop,
//                            labelWidth: 120,
//                            allowBlank: false,
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
//                            emptyText: me.messages.taskSchedulerEmptyText,
                            forceSelection : true,
                            requiredForWorkOrder: true,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{workShopName}','</tpl>'),
                            valueField: 'idWorkShop',
                            listConfig: {
                                getInnerTpl: function() { return "{workShopName}"; }
                            }
                        },
//                        {
//                            xtype: 'combobox',
//                            name: 'idWorkShop',
////                            store: Ext.create('sisprod.store.WorkShopAll'),
//                            id: 'idWorkShop',
//                            flex: 1,
//                            fieldLabel: 'Workshop',
////                            disabled: true,
//                            displayField: 'workShopName',
//                            valueField: 'idWorkShop',
//                            allowBlank: false
//                        },
                        {
                            xtype: 'sensitivecombo',
                            hideTrigger: false,
                            name: 'idQuadrille',
                            id: 'idQuadrille',
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
                            requiredForWorkOrder: true,
//                            allowBlank: false,
//                            disabled: true,
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
                    requiredForWorkOrder: true,
//                    allowBlank: false,
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
                    fieldLabel: me.messages.labels.scheduledDate,
                    anchor: '60%',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'scheduledStartDate',
                            id: 'scheduledStartDate',
                            flex: 1,
                            fieldLabel: me.messages.labels.scheduledStartDate,
                            labelWidth: 30,
                            labelSeparator: '',
//                            allowBlank: false,
                            readOnly: true,
                            requiredForWorkOrder: true,
                            maxValue: me.data['attentionMaximumDate'],
                            listeners: {
                                change: function(field, newValue, oldValue, eventOptions){
                                    me.down('#scheduledEndDate').setMinValue(newValue);
                                    me.down('#scheduledEndDate').validate();
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'scheduledEndDate',
                            id: 'scheduledEndDate',
                            flex: 1,
//                            allowBlank: false,
                            labelWidth: 30,
                            labelSeparator: '',
                            fieldLabel: me.messages.labels.scheduledEndDate,
                            margin: '0 0 0 10',
                            readOnly: true,
                            requiredForWorkOrder: true
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
                            allowBlank: false,
                            margin: '0 0 0 10',
                            disabled: true
                        }
                    ]
                }
            ]
        };
        return items;
    },
    
    verifyGeneralScheduler: function(){
        var me = this;
        
        Ext.BaseAjax.request({
            url: 'rest/taskGeneralScheduler/isGeneralTaskScheduler.htm',
            async: false,
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    me.enableFieldsForGeneralScheduler(responseData.result);
                }
                else{
                    Ext.MessageBox.show({
                        title: me.controllerMessages.alertMessage,
                        msg: responseData.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            }
        });
    },
            
    enableFieldsForGeneralScheduler: function(enable){
        var me = this;
        me.down('#idSector').setReadOnly(!enable);
        me.down('#idTaskScheduler').setReadOnly(!enable);
        me.down('#idWorkCategory').setReadOnly(!enable);
        me.down('#idWorkCategoryDetail').setReadOnly(!enable);
        me.down('#attentionMaximumDate').setReadOnly(!enable);
        me.down('#scheduledStartDate').setReadOnly(!enable);
        me.down('#scheduledEndDate').setReadOnly(!enable);
//        if(enable){
//            me.down('#idSector').enable();
//            me.down('#idTaskScheduler').enable();
//            me.down('#idWorkCategory').enable();
//            me.down('#idWorkCategoryDetail').enable();
//            me.down('#attentionMaximumDate').enable();
//            me.down('#scheduledStartDate').enable();
//            me.down('#scheduledEndDate').enable();
//        }
//        else{
//            me.down('#idSector').disable();
//            me.down('#idTaskScheduler').disable();
//            me.down('#idWorkCategory').disable();
//            me.down('#idWorkCategoryDetail').disable();
//            me.down('#attentionMaximumDate').disable();
//            me.down('#scheduledStartDate').disable();
//            me.down('#scheduledEndDate').disable();
//        }
    }
});