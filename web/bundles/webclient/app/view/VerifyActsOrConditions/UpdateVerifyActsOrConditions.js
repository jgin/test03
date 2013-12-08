Ext.define('sisprod.view.VerifyActsOrConditions.UpdateVerifyActsOrConditions', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateVerifyActsOrConditions',
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
        subStandardTitle: 'SubStandard',
        observationsLabel: 'Observations'
    },
    title: 'Update Work Request',
    modal: true,
    width: 660,
    layout: 'fit',
    initComponent: function() {
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
                    xtype: 'fieldset',
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
                                        readOnly: true,
                                        name: 'idLot',
                                        id: 'idLot',
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
                                    name: 'requestDate',
                                    fieldLabel: me.messages.requestDateLabel,
                                    flex: 2,
                                    value: new Date(),
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'combofieldcontainer',
                            showButtons: false,
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
                                readOnly: true,
                                width: 400
                            }
                        },
                        {
                            xtype: 'sensitivecombocontainer',
                            anchor: '80%',
                            showAddButton: false,
                            sensitiveComboBoxOptions: {
                                hideTrigger: false,
                                readOnly: true,
                                name: 'idWorkCategory',
                                id: 'idWorkCategory',
                                labelWidth: 120,
                                store: Ext.create('sisprod.store.WorkCategoryByNameStore'),
                                fieldLabel: me.messages.workCategoryLabel,
                                emptyText: me.messages.workCategoryEmptyText,
                                displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">', '{workCategoryName}', '</tpl>'),
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
                            anchor: '80%',
                            showAddButton: false,
                            sensitiveComboBoxOptions: {
                                hideTrigger: false,
                                readOnly: true,
                                name: 'idWorkCategoryDetail',
                                id: 'idWorkCategoryDetail',
                                fieldLabel: me.messages.workCategoryDetailLabel,
                                labelWidth: 120,
                                store: Ext.create('sisprod.store.WorkCategoryDetailByCategory', {
                                    listeners: {
                                        beforeload: function(store, operation, options) {
                                            var idWorkCategory = me.down('#idWorkCategory').getValue();
                                            if (Ext.isDefined(idWorkCategory) && idWorkCategory !== null) {
                                                if (Ext.isDefined(operation.params) && operation.params !== null)
                                                    operation.params.idWorkCategory = idWorkCategory;
                                                else
                                                    operation.params = {query: '', idWorkCategory: idWorkCategory};
                                            }
                                            else {
                                                Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.firstSelectWorkCategoryText);
                                                return false;
                                            }
                                        }
                                    }
                                }),
                                emptyText: me.messages.workCategoryDetailEmptyText,
                                forceSelection: true,
                                allowBlank: false,
                                displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">', '{workCategoryDetailName}', '</tpl>'),
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
                            anchor: '50%',
                            fieldLabel: me.messages.equipmentTypeLabel,
                            labelWidth: 120,
                            store: Ext.create('sisprod.store.EquipmentTypeAll', {autoLoad: true}),
                            displayField: 'equipmentTypeName',
                            valueField: 'idEquipmentType',
                            name: 'idSelectEquipmentType',
                            id: 'idSelectEquipmentType',
                            emptyText: 'Seleccione',
                            allowBlank: false,
                            readOnly: true,
                            showAddButton: false,
                            forceSelection: true
                        },
                        {
                            xtype: 'sensitivecombocontainer',
                            anchor: '80%',
                            showAddButton: false,
                            sensitiveComboBoxOptions: {
                                name: 'idEquipment',
                                id: 'idEquipment',
                                fieldLabel: me.messages.equipmentLabel,
                                labelWidth: 120,
                                readOnly: true,
                                store: Ext.create('sisprod.store.EquipmentAllByType', {
//                                    autoLoad: true,
                                    listeners: {
                                        beforeload: function(store, operation, options) {
                                            var form = me.down('form');
                                            var equipmentTypeInput = form.queryById('idSelectEquipmentType');
                                            var selectedEquipmentType = equipmentTypeInput.getValue();
                                            if (Ext.isDefined(selectedEquipmentType) && selectedEquipmentType !== null)
                                                operation.params.idEquipmenType = selectedEquipmentType;
                                            else {
                                                Ext.Msg.alert(me.messages.formTitle, me.messages.firstSelectAlertText);
                                                return false;
                                            }
                                        }
                                    }
                                }),
                                emptyText: me.messages.equipmentEmptyText,
                                forceSelection: true,
                                hideTrigger: false,
                                allowBlank: false,
                                displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">', '{equipmentName} ({locationName})', '</tpl>'),
                                valueField: 'idEquipment',
                                listConfig: {
                                    getInnerTpl: function() {
                                        return "{equipmentName} ({locationName})";
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'sensitivecombocontainer',
                            showAddButton: false,
                            anchor: '80%',
                            sensitiveComboBoxOptions: {
                                name: 'idApplicant',
                                fieldLabel: me.messages.applicantLabel,
                                labelWidth: 120,
                                store: Ext.create('sisprod.store.EmployeeFromGMP'),
                                emptyText: me.messages.applicantEmptyText,
                                id: 'idApplicant',
                                forceSelection: true,
                                hideTrigger: false,
                                readOnly: true,
                                allowBlank: false,
                                displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">', '{personFullName} ({fullDocumentNumber})', '</tpl>'),
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
                    items: [
//                        {
//                            xtype: 'sensitivecombocontainer',
//                            showAddButton: false,
//                            anchor: '100%',
//                            hidden: true,
//                            sensitiveComboBoxOptions: {
//                                name: 'idHsseSupervisor',
//                                hideTrigger: false,
//                                labelWidth: 100,
//                                fieldLabel: me.messages.hsseSupervisorLabel,
//                                store: Ext.create('sisprod.store.HsseSupervisorTemplate'),
//                                emptyText: me.messages.applicantEmptyText,
//                                id: 'idHsseSupervisor',
//                                value: 0,
//                                forceSelection: true,
//                                displayTpl: Ext.create('Ext.XTemplate',
//                                        '<tpl for=".">', '{personFullName} ({fullDocumentNumber})', '</tpl>'),
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
                            anchor: '100%',
                            layout: {
                                type: 'hbox',
                                padding: '0 0 0 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    anchor: '50%',
                                    margin: '0 0 0 10',
                                    flex: 1,
                                    labelWidth: 100,
                                    id: 'idSubstandard',
                                    fieldLabel: me.messages.subStandardLabel,
                                    store: Ext.create('sisprod.store.SubstandardAll').load(),
                                    displayField: 'substandardName',
                                    valueField: 'idSubstandard',
                                    name: 'idSubstandard',
                                    emptyText: ' ',
                                    forceSelection: true,
                                    editable: false
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'detectionDate',
                                    id: 'detectionDate',
                                    margin: '0 0 0 10',
                                    labelWidth: 100,
                                    anchor: '50%',
                                    maxValue: me.record.raw.requestDate,
                                    fieldLabel: me.messages.detectionDateLabel
                                }
                            ]
                        },
                        {
                            xtype: 'sensitivecombo',
                            anchor: '100%',
                            name: 'idSubstandardConditionAction',
                            hideTrigger: false,
                            labelWidth: 100,
                            fieldLabel: me.messages.subStandardConditionActionLabel,
                            store: Ext.create('sisprod.store.SubstandardConditionActionAutocomplete'),
                            id: 'idSubstandardConditionAction',
                            emptyText: '',
                            valueField: 'idSubstandardConditionAction',
                            displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">', '{description}', '</tpl>'),
                            listConfig: {
                                getInnerTpl: function() {
                                    return '{description}';
                                }
                            }
                        },
                        {
                            xtype: 'textareafield',
                            name: 'observations',
                            id: 'observations',
                            maxLength: 5000,
                            allowBlank: true,
                            labelWidth: 100,
                            anchor: '100%',
                            fieldLabel: me.messages.observationsLabel
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
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
                            readOnly: true,
                            allowBlank: false
                        }
                    ]
                }
            ]
        };

        me.callParent(arguments);
    }
});