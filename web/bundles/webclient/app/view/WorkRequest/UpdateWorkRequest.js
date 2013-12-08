/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequest.UpdateWorkRequest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateWorkRequest',
    
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    
    messages: {
        validation: {
            alertTitle: 'Message',
            firstSelectWorkCategoryText: 'Please, first select work category...'
        },
        formTitle: 'Request Data',
        lotLabel: 'Lot',
        requestDateLabel: 'Date',
        workCategoryLabel: 'Work Category',
        workCategoryDetailLabel: 'Work Type',
        workCategoryDetailEmptyText: 'Type work type name',
        workCategoryEmptyText: 'Type work category',
        workRequestSourceLabel: 'Work Request Source',
        workRequestFullNumberLabel: 'Request Number',
        equipmentTypeLabel: 'Equipment Type',
        equipmentLabel: 'Equipment',
        equipmentEmptyText: 'Type an equipment name...',
        locationLabel: 'Location',
        locationEmptyText: 'Type a location name',
        applicantLabel: 'Applicant',
        applicantEmptyText: 'Type an employee name',
        recipientLabel: 'Recipient',
        recipientEmptyText: 'Type an employee name',
        workDetailsLabel: 'Type work detail to perform',
        firstSelectAlertText: 'Select equipment type before perform search!',
        firstSelectWorkCategoryAlertText: 'Select work category before perform search!',
        isSubstandardConditionLabel: 'Condition SubStandard',
        detectionDateLabel: 'Detencion Date',
        subStandardLabel: 'SubStandard',
        subStandardConditionActionLabel: 'SubStandard Condition Action',
        hsseSupervisorLabel: 'Supervisor',
        hsseSupervisorEmptyText: 'Hsse Supervisor',
        subStandardTitle: 'SubStandard'
    },
    
    title: 'Update Work Request',
    modal: true,
    width: 750,
    layout: 'fit',
    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            region: 'center',
            bodyStyle: 'padding:5px 5px 0',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWorkRequest',
                    id: 'idWorkRequest'
                },
                {
                    xtype:'fieldset',
                    title: me.messages.formTitle,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%', labelWidth: 120},
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'workRequestFullNumber',
                            id: 'workRequestFullNumber',
                            anchor: '45%',
                            fieldLabel: me.messages.workRequestFullNumberLabel,
                            labelWidth: 120,
                            readOnly: true
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            anchor: '100%',
                            items: [
                                {
                                    xtype: 'combofieldcontainer',
                                    flex: 5,
                                    showButtons: false,
                                    comboBoxOptions: {
                                        name: 'idLot',
                                        id: 'idWorkRequestLot',
                                        labelWidth: 120,
                                        store: Ext.create('sisprod.store.LotAll', {autoLoad: true}),
                                        fieldLabel: me.messages.lotLabel,
                                        displayField: 'lotName',
                                        valueField: 'idLot',
                                        emptyText: 'Seleccione',
                                        forceSelection: true,
                                        allowBlank: false
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: 'requestDate',
                                    name: 'requestDate',
                                    fieldLabel: me.messages.requestDateLabel,
                                    flex: 2,
                                    startDateField: 'detectionDate',
                                    value: new Date(),
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'combofieldcontainer',
                            comboBoxOptions: {
                                name: 'idWorkRequestSource',
                                id: 'idWorkRequestSource',
                                store: Ext.create('sisprod.store.WorkRequestSourceAll', {autoLoad: true}),
                                fieldLabel: me.messages.workRequestSourceLabel,
                                labelWidth: 120,
                                displayField: 'workRequestSourceName',
                                valueField: 'idWorkRequestSource',
                                emptyText: 'Seleccione',
                                forceSelection: true,
                                allowBlank: false,
                                width: 400
                            }
                        },
                        {
                            xtype: 'sensitivecombocontainer',
                            anchor: '100%',
                            showAddButton: false,
                            sensitiveComboBoxOptions: {
                                hideTrigger: false,
                                name: 'idWorkCategory',
                                id: 'idWorkCategory',
                                labelWidth: 120,
                                store: Ext.create('sisprod.store.WorkCategoryByNameStore'),
                                fieldLabel: me.messages.workCategoryLabel,
                                emptyText: me.messages.workCategoryEmptyText,
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">','{workCategoryName}','</tpl>'),
                                valueField: 'idWorkCategory',
                                listConfig: {
                                    getInnerTpl: function() {
                                        return "{workCategoryName}";
                                    }
                                },
                                forceSelection: true,
                                allowBlank: false
                            }
                        },
                        {
                            xtype: 'sensitivecombocontainer',
                            anchor: '100%',
                            showAddButton: false,
                            sensitiveComboBoxOptions:{
                                hideTrigger: false,
                                name: 'idWorkCategoryDetail',
                                id: 'idWorkCategoryDetail',
                                fieldLabel: me.messages.workCategoryDetailLabel,
                                labelWidth: 120,
//                                store: Ext.create('sisprod.store.WorkCategoryDetailByCategory'),
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
                                                Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.firstSelectWorkCategoryText);
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
//                        {
//                            xtype: 'combobox',
//                            name: 'idWorkCategory',
//                            id: 'idWorkCategory',
//                            anchor: '65%',
//                            labelWidth: 120,
//                            store: Ext.create('sisprod.store.WorkCategoryAll'),
//                            fieldLabel: me.messages.workCategoryLabel,
//                            displayField: 'workCategoryName',
//                            valueField: 'idWorkCategory',
//                            forceSelection: true,
//                            allowBlank: false
//                        },
//                        {
//                            xtype: 'sensitivecombocontainer',
//                            anchor: '70%',
//                            showAddButton: false,
//                            sensitiveComboBoxOptions:{
//                                name: 'idWorkCategoryDetail',
//                                id: 'idWorkCategoryDetail',
//                                fieldLabel: me.messages.workCategoryDetailLabel,
//                                labelWidth: 120,
//                                store: Ext.create('sisprod.store.WorkCategoryDetailByCategory',{
//                                    listeners: {
//                                        beforeload: function(store, operation, options){
//                                            var form = me.down('form');
//                                            var workCategoryInput = form.queryById('idWorkCategory');
//                                            var selectedWorkCategory = workCategoryInput.getValue();
//                                            if(Ext.isDefined(selectedWorkCategory) && selectedWorkCategory!==null)
//                                                operation.params.idWorkCategory = selectedWorkCategory;
//                                            else{
//                                                Ext.Msg.alert(me.messages.formTitle, me.messages.firstSelectWorkCategoryAlertText);
//                                                return false;
//                                            }
//                                        }
//                                    }
//                                }),
//                                emptyText: me.messages.workCategoryDetailEmptyText,
//                                forceSelection : true,
//                                allowBlank: false,
//                                displayTpl: Ext.create('Ext.XTemplate',
//                                    '<tpl for=".">','{workCategoryDetailName}','</tpl>'),
//                                valueField: 'idWorkCategoryDetail',
//                                listConfig: {
//                                    getInnerTpl: function() {
//                                        return "{workCategoryDetailName}";
//                                    }
//                                }
//                            }
//                        },
                        {
                            xtype: 'combobox',
                            anchor: '50%',
                            fieldLabel : me.messages.equipmentTypeLabel,
                            labelWidth: 120,
                            store : Ext.create('sisprod.store.EquipmentTypeAll', {autoLoad: true}),
                            displayField: 'equipmentTypeName',
                            valueField: 'idEquipmentType',
                            name:'idSelectEquipmentType',
                            id:'idSelectEquipmentType',
                            emptyText: 'Seleccione',
                            allowBlank:false,
                            forceSelection : true
                        },
                        {
                            xtype: 'sensitivecombocontainer',
                            anchor: '90%',
                            sensitiveComboBoxOptions:{
                                name: 'idEquipment',
                                id: 'idEquipment',
                                fieldLabel: me.messages.equipmentLabel,
                                labelWidth: 120,
                                store: Ext.create('sisprod.store.EquipmentAllByTypeAndLot',{
                                    listeners: {
                                        beforeload: function(store, operation, options){
                                            var form = me.down('form');
                                            var equipmentTypeInput = form.queryById('idSelectEquipmentType');
                                            var lotInput = form.queryById('idWorkRequestLot');
                                            var selectedEquipmentType = equipmentTypeInput.getValue();
                                            var selectedLot = lotInput.getValue();
                                            if(Ext.isDefined(selectedEquipmentType) && selectedEquipmentType!==null){
                                                if(Ext.isDefined(selectedLot) && selectedLot!==null){
                                                    if(Ext.isDefined(operation.params) && operation.params!==null) {
                                                        operation.params.idEquipmenType = selectedEquipmentType;
                                                        operation.params.idLot = selectedLot;
                                                    }
                                                    else operation.params = {
                                                        query: '',
                                                        idEquipmenType: selectedEquipmentType,
                                                        idLot: selectedLot
                                                    };
                                                }
                                                else{
                                                    Ext.Msg.alert(me.messages.formTitle, me.messages.validation.firstSelectLotAlertText);
                                                    return false;
                                                }
                                            }
                                            else{
//                                                Ext.Msg.alert(me.messages.formTitle, me.messages.firstSelectAlertText);
                                                return false;
                                            }
                                        }
                                    }
                                }),
                                emptyText: me.messages.equipmentEmptyText,
                                forceSelection : true,
                                hideTrigger: false,
                                allowBlank: false,
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">','{equipmentName} - {equipmentCode} ({locationName})','</tpl>'),
                                valueField: 'idEquipment',
                                listConfig: {
                                    getInnerTpl: function() {
                                        return "{equipmentName} - {equipmentCode} ({locationName})";
                                    }
                                }
                            }
                        },
//                        {
//                            xtype: 'sensitivecombocontainer',
//                            anchor: '70%',
//                            sensitiveComboBoxOptions:{
//                                name: 'idWorkRequestLocation',
//                                id: 'idWorkRequestLocation',
//                                fieldLabel: me.messages.locationLabel,
//                                labelWidth: 120,
//                                store: Ext.create('sisprod.store.LocationTemplate'),
//                                emptyText: me.messages.locationEmptyText,
//                                forceSelection : true,
//                                displayTpl: Ext.create('Ext.XTemplate',
//                                    '<tpl for=".">','{locationName}','</tpl>'),
//                                valueField: 'idLocation',
//                                allowBlank: false,
//                                listConfig: {
//                                    getInnerTpl: function() {
//                                        return "{locationName}";
//                                    }
//                                }
//                            }
//                        },
                        {
                            xtype: 'sensitivecombocontainer',
                            showAddButton: false,
                            anchor: '80%',
                            sensitiveComboBoxOptions:{
                                name: 'idApplicant',
                                fieldLabel: me.messages.applicantLabel,
                                labelWidth: 120,
                                store: Ext.create('sisprod.store.EmployeeFromGMP'),
                                emptyText: me.messages.applicantEmptyText,
                                id: 'idApplicant',
                                forceSelection : true,
                                hideTrigger: false,
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
                            xtype: 'checkbox',
                            name: 'isSubstandardCondition',
                            id: 'isSubstandardCondition',
                            anchor: '50%',
//                                    fieldLabel: 'is Substandard Condition',
                            labelWidth: '50%',
                            fieldLabel: me.messages.isSubstandardConditionLabel,
                            inputValue: true
                        }   
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: me.messages.subStandardTitle,
                    layout: 'anchor',
                    id: 'ipPanelSubstandard',
                    hidden: true,
                    bodyPadding: 2,
//                    defaults: {anchor: '100%', labelWidth: '120'},
                    items: [
//                        {
//                            xtype: 'sensitivecombocontainer',
//                            showAddButton: false,
//                            anchor: '100%',
//                            
//                            sensitiveComboBoxOptions:{
//                                name: 'idHsseSupervisor',
//                                hideTrigger: false,
//                                labelWidth:100,
//                                fieldLabel: me.messages.hsseSupervisorLabel,
//                                store: Ext.create('sisprod.store.HsseSupervisorTemplate'),
//                                emptyText: me.messages.applicantEmptyText,
//                                id: 'idHsseSupervisor',
//                                forceSelection : true,
//                                displayTpl: Ext.create('Ext.XTemplate',
//                                    '<tpl for=".">','{personFullName} ({fullDocumentNumber})','</tpl>'),
//                                valueField: 'idHsseSupervisor',
//                                listConfig: {
//                                    getInnerTpl: function() {
//                                        return '{personFullName} ({fullDocumentNumber})';
//                                    }
//                                }
//                            }
//                            
//                        },
                        {
                            xtype: 'fieldcontainer',
                            anchor:'100%',
                            layout: {
                                type: 'hbox',
                                padding: '0 0 0 0'
                            }, 
                            items: [
                                {
                                    xtype: 'combobox',
//                                    anchor: '50%',      
//                                    margin: '0 10 0 0',
                                    flex:1,
                                    labelWidth:100,
                                    id: 'idSubstandard',
                                    fieldLabel : me.messages.subStandardLabel,
                                    store : Ext.create('sisprod.store.SubstandardAll').load(),
                                    displayField : 'substandardName',
                                    valueField : 'idSubstandard',
                                    name:'idSubstandard',
                                    emptyText: ' ',
                                    forceSelection : true,
                                    editable : false
                                },
//                                {
//                                    xtype: 'combobox',
////                                    anchor: '50%',   
//                                    flex:1,
//                                    labelWidth:100,
//                                    fieldLabel : me.messages.subStandardConditionActionLabel,
//                                    margin: '0 0 0 10',
//                                    store : Ext.create('sisprod.store.SubstandardConditionActionAll').load(),
//                                    displayField : 'description',
//                                    valueField : 'idSubstandardConditionAction',
//                                    name:'idSubstandardConditionAction',
//                                    id:'idSubstandardConditionAction',
//                                    emptyText: ' ',
//                                    forceSelection : true,
//                                    editable : false
//                                }          
                                  {
                                        xtype: 'datefield',
                                        name: 'detectionDate',
                                        id: 'detectionDate',
                                        margin: '0 0 0 10',
                                        maxValue:me.record.raw.requestDate,
                                        labelWidth:100,
                                        anchor: '50%',
//                                        value : new Date(),
                                        fieldLabel: me.messages.detectionDateLabel
                                   }
                            ]
                        },
                        
                    ]
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: me.messages.workDetailsLabel,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            name: 'description',
                            id: 'description',
                            maxLength: 5000,
                            allowBlank: false
                        }
                    ]
                }
            ]
        };
        
        me.callParent(arguments);
    }
});