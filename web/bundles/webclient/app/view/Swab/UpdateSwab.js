Ext.define('sisprod.view.Swab.UpdateSwab', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateSwab',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    title: 'Update SWAB',
    readOnly: true,
    messages: {
        labels: {
            productionPeriod: 'Period',
            well: 'Well',
            wellEmptyText: 'You have to select an well...',
            oil: 'Oil',
            oilMeasureUnit: 'Oil Measure Unit',
            battery: 'Battery',
            water: 'Water',
            waterMeasureUnit: 'Water Measure Unit',
            runNumber: 'Run Number',
            pistonDepth: 'Piston Depth',
            stayTime: 'Stay Time',
            initialLevel: 'Initial Level',
            finalLevel: 'Final Level',
            entity: 'Entity',
            entityEmptyText: 'You have to select an entity...'
        },
        buttons: {
        }
    },
    modal: true,
    width: 570,
    initComponent: function() {
        var me = this;
        var envProductionPeriodDateInput = Ext.getCmp('envProductionPeriodDate');
        var envProductionPeriodDate = new Date();
        if (Ext.isDefined(envProductionPeriodDateInput) && envProductionPeriodDateInput !== null) {
            envProductionPeriodDate = envProductionPeriodDateInput.getRawValue();
        }

        var formItems = [
            {
                xtype: 'textfield',
                grow: true,
                name: 'productionPeriodDate',
                id: 'productionPeriodDate',
                fieldLabel: me.messages.labels.productionPeriod,
                margins: '0 5 0 0',
                value: envProductionPeriodDate,
                readOnly: true,
                labelWidth: 110
            },
            {
                xtype: 'hiddenfield',
                name: 'idSwab',
                id: 'idSwab'
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'combobox',
                        grow: true,
                        name: 'idLot',
                        id: 'idLot',
                        store: Ext.create('sisprod.store.LotAll'),
                        fieldLabel: me.messages.labels.lot,
                        displayField: 'lotName',
                        valueField: 'idLot',
                        margins: '0 5 0 0',
                        editable: false,
                        labelWidth: 110
                    },
                    {
                        xtype: 'combobox',
                        grow: true,
                        name: 'idWell',
                        id: 'idWell',
                        store: Ext.create('sisprod.store.WellOperativeByLotStore', {
                            listeners: {
                                beforeload: function(store, operation, options) {
                                    var idLot = me.down('#idLot').getValue();
                                    if (Ext.isDefined(idLot) && idLot !== null) {
                                        if (Ext.isDefined(operation.params) && operation.params !== null)
                                            operation.params.idLot = idLot;
                                    }
                                    else {
                                        Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.selectLotFirst);
                                        return false;
                                    }
                                }
                            }
                        }),
                        fieldLabel: me.messages.labels.well,
                        displayField: 'wellCode',
                        valueField: 'idWell',
                        margins: '0 0 0 10',
                        editable: false,
                        labelWidth: 110
                    }
                ]
            },
            {
                xtype: 'sensitivecombocontainer',
                showAddButton: false,
                sensitiveComboBoxOptions: {
                    hideTrigger: false,
                    name: 'idEntity',
                    id: 'idEntity',
                    fieldLabel: me.messages.labels.entity,
                    anchor: '100%',
                    labelWidth: 110,
                    store: Ext.create('sisprod.store.SwabEntityAll', {}),
                    emptyText: me.messages.entityEmptyText,
                    forceSelection: true,
                    allowBlank: false,
                    readOnly: true,
                    valueField: 'entityId',
                    displayField: 'entityName'
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'idBattery',
                id: 'idBattery'
            },
            {
                labelWidth: 110,
                anchor: '100%',
                xtype: 'textfield',
                allowBlank: false,
                name: 'battery',
                id: 'battery',
                fieldLabel: me.messages.labels.battery,
                readOnly: true
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        labelWidth: 110,
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'oil',
                        id: 'oil',
                        fieldLabel: me.messages.labels.oil
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'oilIdMeasureUnit',
                        id: 'oilIdMeasureUnit'
                    },
                    {
                        margins: '0 0 0 10',
                        labelWidth: 110,
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'water',
                        id: 'water',
                        fieldLabel: me.messages.labels.water
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'waterIdMeasureUnit',
                        id: 'waterIdMeasureUnit'
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        labelWidth: 110,
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'runNumber',
                        id: 'runNumber',
                        fieldLabel: me.messages.labels.runNumber
                    },
                    {
                        margins: '0 0 0 10',
                        labelWidth: 110,
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'pistonDepth',
                        id: 'pistonDepth',
                        fieldLabel: me.messages.labels.pistonDepth
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        labelWidth: 110,
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'initialLevel',
                        id: 'initialLevel',
                        fieldLabel: me.messages.labels.initialLevel
                    },
                    {
                        margins: '0 0 0 10',
                        labelWidth: 110,
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'finalLevel',
                        id: 'finalLevel',
                        fieldLabel: me.messages.labels.finalLevel
                    }
                ]
            },
            {
                labelWidth: 110,
                xtype: 'numberfield',
                allowBlank: false,
                name: 'stayTime',
                id: 'stayTime',
                fieldLabel: me.messages.labels.stayTime
            }
        ];
        me.formOptions = {
            region: 'center',
            labelWidth: 100,
            layout: 'fit',
            bodyStyle: 'padding:5px 5px 0',
            items: [
                {
                    xtype: 'panel',
                    layout: 'anchor',
                    border: false,
                    autoScroll: true,
                    items: formItems
                }
            ]
        };
        me.callParent(arguments);
    }
});