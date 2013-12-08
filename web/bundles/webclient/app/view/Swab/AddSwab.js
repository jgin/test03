Ext.define('sisprod.view.Swab.AddSwab', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSwab',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    title: 'Add SWAB',
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
            entityEmptyText: 'You have to select an entity...',
            lot: 'Lot'
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
                                        Ext.Msg.alert('Advertencia', 'Seleccione un lote primero');
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
                        fieldLabel: me.messages.labels.oil,
                        minValue: 0
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
                        fieldLabel: me.messages.labels.water,
                        minValue: 0
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
                        fieldLabel: me.messages.labels.runNumber,
                        minValue: 0
                    },
                    {
                        margins: '0 0 0 10',
                        labelWidth: 110,
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'pistonDepth',
                        id: 'pistonDepth',
                        fieldLabel: me.messages.labels.pistonDepth,
                        minValue: 0
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
                        fieldLabel: me.messages.labels.initialLevel,
                        minValue: 0
                    },
                    {
                        margins: '0 0 0 10',
                        labelWidth: 110,
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'finalLevel',
                        id: 'finalLevel',
                        fieldLabel: me.messages.labels.finalLevel,
                        minValue: 0
                    }
                ]
            },
            {
                labelWidth: 110,
                xtype: 'numberfield',
                allowBlank: false,
                name: 'stayTime',
                id: 'stayTime',
                fieldLabel: me.messages.labels.stayTime,
                minValue: 0
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