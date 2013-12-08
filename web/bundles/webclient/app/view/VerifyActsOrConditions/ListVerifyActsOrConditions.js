Ext.define('sisprod.view.VerifyActsOrConditions.ListVerifyActsOrConditions', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    alias: 'widget.listVerifyActsOrConditions',
    options: {},
    usedInPAndP: true,
    entityName: '',
    listTitle: 'Work Requests List',
    messages: {
        headers: {
            idWorkRequest: 'ID',
            lotName: 'Lot',
            workRequestSourceName: 'Work Request Source',
            workCategoryName: 'Work Category',
            workCategoryDetailName: 'Work Type',
            dependencyName: 'Dependency',
            applicantFullName: 'Applicant',
            recipientFullName: 'Recipient',
            senderFullName: 'Sender',
            locationName: 'Location',
            equipmentName: 'Equipment',
            workRequestFullNumber: 'Request Number',
            requestDate: 'Date',
            attentionMaximumDate: 'Max. Attention Date',
            workRequestStatusName: 'Status',
            description: 'Description',
            reportLink: 'Print',
            isSubstandardCondition: '¿Is A or C?',
            detectionDate: 'Detection Date',
            substandardName: 'Substandard Type',
            observations: 'Observations'
        },
        nullifyButtonText: 'Nullify',
        attachFilesButtonText: 'Attach Files',
        monthLabel: 'Select month'
    },
    showCheckInactive: false,
    initComponent: function() {
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            id: 'gridVerifyActsOrConditions',
            autoGenerationOptions: {
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idWorkRequest: {header: me.messages.headers.idWorkRequest, hideable: false, hidden: true},
                    idLot: {hideable: false, hidden: true},
                    'lot.lotName': {header: me.messages.headers.lotName, hideable: false, hidden: true},
                    idWorkRequestSource: {hideable: false, hidden: true},
                    'workRequestSource.workRequestSourceName': {header: me.messages.headers.workRequestSourceName, flex: 2, hideable: false, hidden: true},
                    idDependency: {hideable: false, hidden: true},
                    'dependency.dependencyName': {header: me.messages.headers.dependencyName, hideable: false, hidden: true},
                    idEmployee: {hideable: false, hidden: true},
                    applicantFullName: {header: me.messages.headers.applicantFullName, flex: 2, hideable: false, hidden: true},
//                    recipientFullName: { header: me.messages.headers.recipientFullName, flex: 2},
                    senderFullName: {header: me.messages.headers.senderFullName, flex: 2, hideable: false, hidden: true},
                    idLocation: {hideable: false, hidden: true},
                    'location.locationName': {header: me.messages.headers.locationName, hideable: false, hidden: true},
                    idEquipment: {hideable: false, hidden: true},
                    'equipment.equipmentName': {header: me.messages.headers.equipmentName, hideable: false, hidden: true},
                    workRequestYear: {hideable: false, hidden: true},
                    workRequestNumber: {hideable: false, hidden: true},
                    workRequestFullNumber: {header: me.messages.headers.workRequestFullNumber, flex: 1.5},
                    requestDate: {header: me.messages.headers.requestDate},
                    attentionMaximumDate: {header: me.messages.headers.attentionMaximumDate, hideable: false, hidden: true},
                    idWorkRequestStatus: {hideable: false, hidden: true},
                    'workRequestStatus.workRequestStatusName': {
                        header: me.messages.headers.workRequestStatusName,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = Ext.String.format("background-color: {0};background-image: none;",
                                    record.raw['workRequestStatus']['workRequestStatusColor']);
                            return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                        }, hideable: false, hidden: true
                    },
                    idWorkRequestStatusReason: {hideable: false, hidden: true},
                    'workRequestStatusReason.workRequestStatusReasonName': {hideable: false, hidden: true},
                    'workCategoryDetail.workCategory.idWorkCategory': {hideable: false, hidden: true},
                    'workCategoryDetail.workCategory.workCategoryName': {header: me.messages.headers.workCategoryName, flex: 1},
                    'workCategoryDetail.idWorkCategoryDetail': {hideable: false, hidden: true},
                    'workCategoryDetail.workCategoryDetailName': {header: me.messages.headers.workCategoryDetailName, flex: 1},
                    description: {header: me.messages.headers.description, hideable: true, flex: 2},
                    isSubstandardCondition: {header: me.messages.headers.isSubstandardCondition, flex: 0.5,
                        editor: {
                            xtype: 'checkboxfield',
                            inputValue: true,
                            handler: function(checkbox) {
                                var grid = Ext.getCmp('gridVerifyActsOrConditions');
                                var record = grid.getSelectionModel().getSelection()[0];
                                me.performedActivity(checkbox.getValue(), record);
                                Ext.getCmp('editorDetectionDate').setMaxValue(record.get('requestDate'));
                            }
                        },
                        width: 60,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value !== undefined) {
                                if (value) {
                                    metaData.tdCls = 'checked';
                                }
                            }
                            return '';
                        }
                    },
                    'detectionDate': {header: me.messages.headers.detectionDate, flex: 1,
                        editor: {
                            xtype: 'datefield',
                            id: 'editorDetectionDate',
                            allowBlank: false
                        }
                    },
                    'idSubstandard': {hideable: false, hidden: true},
                    'substandardName': {header: me.messages.headers.substandardName, flex: 1,
                        editor: {
                            xtype: 'combobox',
                            store: Ext.create('sisprod.store.SubstandardAll').load(),
                            displayField: 'substandardName',
                            valueField: 'substandardName',
                            id: 'editorSubstandard',
                            allowBlank: false,
                            listeners: {
                                'select': function(combobox, records, eventOptions) {
                                    me.controller.onSelectSubstandard.apply(me.controller, [combobox, records, eventOptions]);
//                                    var grid = Ext.getCmp('gridVerifyActsOrConditions');
//                                    var activity = grid.getSelectionModel().getSelection()[0];
//                                    var ur = records[0];
//                                    activity.set('idSubstandard', ur.data.idSubstandard);
                                }
                            }
                        }
                    },
                    idSubstandardConditionAction: {hideable: false, hidden: true},
                    'observations': {header: me.messages.headers.observations, flex: 3,
                        editor: {
                            id: 'observationsEdit',
                            xtype: 'textfield'
                        }
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: {
                allowDelete: false,
                allowAdd: false,
                allowUpdate: true
            },
            topBarButtons: [
                {
                    xtype: 'combofieldcontainer',
                    anchor: '100%',
                    name: 'month',
                    showButtons: false,
                    margins: '0 0 0 10',
                    comboBoxOptions: {
                        xtype: 'combobox',
                        anchor: '100%',
                        fieldLabel: me.messages.monthLabel,
                        labelWidth: 120,
                        store: Ext.create('Ext.data.Store', {
                            fields: [{name: 'idMonth', type: 'int'}, {name: 'monthName', type: 'string'}],
                            proxy: {
                                type: 'memory',
                                reader: {
                                    type: 'json'
                                },
                                data: [
                                    {idMonth: 0, monthName: 'Enero'},
                                    {idMonth: 1, monthName: 'Febrero'},
                                    {idMonth: 2, monthName: 'Marzo'},
                                    {idMonth: 3, monthName: 'Abril'},
                                    {idMonth: 4, monthName: 'Mayo'},
                                    {idMonth: 5, monthName: 'Junio'},
                                    {idMonth: 6, monthName: 'Julio'},
                                    {idMonth: 7, monthName: 'Agosto'},
                                    {idMonth: 8, monthName: 'Setiembre'},
                                    {idMonth: 9, monthName: 'Octubre'},
                                    {idMonth: 10, monthName: 'Noviembre'},
                                    {idMonth: 11, monthName: 'Diciembre'}
                                ]
                            }
                        }).load(),
                        displayField: 'monthName',
                        valueField: 'idMonth',
                        name: 'month',
                        id: 'month',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        width: 335,
                        value: (new Date()).getMonth(),
                        listeners: {
                            'select': function(combobox, record, eventOptions) {
                                var gridStore = Ext.getCmp('gridVerifyActsOrConditions').getStore();
                                var monthValue = Ext.getCmp('month').getValue();
                                if (Ext.isDefined(gridStore) && gridStore !== null) {
//                                    gridStore.reload({params: {month: monthValue}});
                                    gridStore.proxy.extraParams['month'] = monthValue;
                                    gridStore.reload();
                                }
                            }
                        }
                    }
                }
            ],
            editorOptions: {
                listeners: {
//                    'beforeedit': function(editor, context, eventOptions) {
//                        me.controller.beforeEdit.apply(me.controller, [editor, context, eventOptions]);
//                    },
                    'afteredit': function(editor, context, eventOptions) {
                        me.controller.afterEdit.apply(me.controller, [editor, context, eventOptions]);
                    },
                    'canceledit': function(editor, context, eventOptions) {
                        me.controller.cancelEdit.apply(me.controller, [editor, context, eventOptions]);
                    }
                }
            }
        };
        me.callParent(arguments);
    },
    performedActivity: function(value, record) {
        Ext.getCmp('editorSubstandard').setDisabled(!value);
        Ext.getCmp('editorDetectionDate').setDisabled(!value);
        Ext.getCmp('observationsEdit').setDisabled(!value);
        if (value) {
            record.set('substandardWorkRequest.detectionDate', new Date());
        }
        else {
            Ext.getCmp('editorSubstandard').clearValue();
            Ext.getCmp('editorDetectionDate').setValue(null);
            Ext.getCmp('observationsEdit').setValue(null);
            record.set('substandardWorkRequest.substandard.idSubstandard', null);
            record.set('substandardWorkRequest.substandard.substandardName', '');
            record.set('substandardWorkRequest.detectionDate', '');
            record.set('substandardWorkRequest.observations', '');
        }
    }
});
