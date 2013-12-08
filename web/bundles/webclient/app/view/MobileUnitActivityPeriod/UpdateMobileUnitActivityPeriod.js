Ext.define('sisprod.view.MobileUnitActivityPeriod.UpdateMobileUnitActivityPeriod', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateMobileUnitActivityPeriod',
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    messages: {
        mobileUnitLabel: 'Mobile Unit',
        operativeHourLabel: 'Operative Hours',
        operativeEfficiencyLabel: 'Operative Efficiency (%)',
        mobileUnitActivityNameLabel: 'Mobile Unit Activity Name',
        activityHourLabel: 'Activity Hour',
        isOperativeTimeLabel: 'Is Operative Time',
        operativeHoursWarning: "Operative hours can't be greater than 24",
        warningTitle: 'Warning'
    },
    title: 'Update Mobile Unit Activity Period',
    modal: true,
    width: 450,
    initComponent: function() {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            errorSummary: false,
            listeners: {
                'canceledit': function(editor, context, options) {
                    if (context.value === "") {
                        var sm = context.grid.getSelectionModel();
                        context.store.remove(sm.getSelection());
                        sm.select(0);
                    }
                },
                'afteredit': function(editor, object, eventOptions) {
                    var store = me.down('#activitysGrid').getStore();
                    var sum = 0;
                    for (var i = 0; i < store.getTotalCount(); i++) {
                        var data = store.getAt(i).data;
                        if (data['isOperativeTime']) {
                            sum += data['activityHour'];
                        }
                    }
                    if (sum <= 24) {
                        Ext.getCmp('operativeHour').setValue(sum);
                        Ext.getCmp('operativeEfficiency').setValue(Ext.util.Format.number(((sum / 24) * 100), '0.00'));
                    } else {
                        object.record.set(object.field, 0);
                        sum = 0;
                        for (var i = 0; i < store.getTotalCount(); i++) {
                            var data = store.getAt(i).data;
                            if (data['isOperativeTime']) {
                                sum += data['activityHour'];
                            }
                        }
                        Ext.getCmp('operativeHour').setValue(sum);
                        Ext.getCmp('operativeEfficiency').setValue(Ext.util.Format.number(((sum / 24) * 100), '0.00'));
                        Ext.Msg.alert(me.messages.warningTitle, me.messages.operativeHoursWarning);
                    }
                }
            }
        });
        me.formOptions = {
            bodyPupdateing: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idMobileUnitActivityPeriod',
                    id: 'idMobileUnitActivityPeriod'
                },
                {
                    xtype: 'combofieldcontainer',
                    showButtons: false,
                    comboBoxOptions: {
                        xtype: 'combobox',
                        anchor: '100%',
                        fieldLabel: me.messages.mobileUnitLabel,
                        labelWidth: 120,
                        store: Ext.create('sisprod.store.MobileUnitAll').load(),
                        displayField: 'equipmentName',
                        valueField: 'idMobileUnit',
                        name: 'idMobileUnit',
                        id: 'idMobileUnit',
                        allowBlank: false,
                        forceSelection: true,
                        editable: false,
                        width: 300
                    }
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'operativeHour',
                    id: 'operativeHour',
                    fieldLabel: me.messages.operativeHourLabel,
                    labelWidth: 120,
                    anchor: '50%',
                    allowBlank: false,
                    readOnly: true,
                    maxValue: 24,
                    minValue: 0,
                    value: 0
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'operativeEfficiency',
                    id: 'operativeEfficiency',
                    fieldLabel: me.messages.operativeEfficiencyLabel,
                    labelWidth: 120,
                    anchor: '50%',
                    allowBlank: false,
                    readOnly: true,
                    value: '0.0%'
                },
                {
                    //title: 'Caracteristicas de Tipo de Equipo',
                    xtype: 'gridpanel',
                    id: 'activitysGrid',
                    height: 200,
                    store: Ext.StoreManager.lookup('mobileUnitActivityStoreGrid').load(),
                    collapsible: true,
                    columns: [
                        {
                            text: 'ID',
                            dataIndex: 'idMobileUnitActivity',
                            flex: 1,
                            hidden: true
                        },
                        {
                            text: me.messages.mobileUnitActivityNameLabel,
                            dataIndex: 'mobileUnitActivityName',
                            flex: 2
                        },
                        {
                            text: me.messages.activityHourLabel,
                            dataIndex: 'activityHour',
                            flex: 2,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                minValue: 0,
                                maxValue: 24
                            }
                        },
                        {
                            text: me.messages.isOperativeTimeLabel,
                            dataIndex: 'isOperativeTime',
                            flex: 1,
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value)
                                    metaData.tdCls = 'checked';
                            }
                        }
                    ],
                    plugins: [rowEditing]
                }
            ]
        };
        me.callParent(arguments);
    }
});