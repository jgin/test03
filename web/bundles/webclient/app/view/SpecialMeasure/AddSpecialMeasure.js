Ext.define('sisprod.view.SpecialMeasure.AddSpecialMeasure', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSpecialMeasure',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    title: 'Add Special Measure',
    messages: {
        labels: {
            lot: 'Lot',
            well: 'Well',
            wellEmptyText: 'You have to select an well...',
            oil: 'Oil',
            oilMeasureUnit: 'Oil Measure Unit',
            battery: 'Battery',
            water: 'Water',
            waterMeasureUnit: 'Water Measure Unit',
            totalHours: 'Total Hours',
            observation: 'Observation'
        }
    },
    modal: true,
    width: 555,
    initComponent: function() {
        var me = this;
        var formItems = [
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
                        labelWidth: 70
                    }
                ]
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
                        minValue: 0,
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
                        minValue: 0,
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
                labelWidth: 110,
                anchor: '50%',
                xtype: 'numberfield',
                minValue: 0,
                maxValue: 24,
                allowBlank: false,
                name: 'totalHours',
                id: 'totalHours',
                fieldLabel: me.messages.labels.totalHours
            },
            {
                labelWidth: 110,
                anchor: '100%',
                xtype: 'textareafield',
                name: 'observation',
                id: 'observation',
                fieldLabel: me.messages.labels.observation
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