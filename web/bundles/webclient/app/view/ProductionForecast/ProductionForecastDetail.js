/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.ProductionForecast.ProductionForecastDetail', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.productionForecastDetail',
    
    requires: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Forecast Detail',
    modal: true,
    width: 600,
    layout: 'fit',
    showWarningBeforeCancel: true,
    messages: {
        msgForecastWell: 'Forecast by Well',
        msgIdProductionForecast: 'Id',
        msgWellCode: 'Code',
        msgOil: 'Oil',
        msgWater: 'Water',
        msgGas: 'Gas',
        msgWorkingTime: 'Working Time',
        msgBreakTime: 'Break Time',
        msgTies: 'TIES',
        msgOnHours: 'On Hours',
        msgOffHours: 'Off Hours'
    },
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            fieldDefaults: {
                labelWidth: 100,
                margins: '0 0 0 5',
                anchor: '100%'
            },
            bodyPadding: 5,
            items: [
                {
                    margins: '5 0 0 0',
                    xtype: 'gridpanel',
                    id: 'gridProductionForecastDetail',
                    title: 'Pronostico por Pozo',
                    plugins: [new Ext.grid.plugin.CellEditing({clicksToEdit: 1})],
                    store: Ext.StoreManager.lookup('forecastDetailStore'),
                    collapsible: true,
                    columns: [
                        {
                            text: me.messages.msgId,
                            dataIndex: 'idProductionForecastWell',
                            flex: 1,
                            hidden:true
                        },
                        {
                            text: me.messages.msgWellCode,
                            dataIndex: 'wellCode',
                            flex: 5
                        },
                        {
                            text: me.messages.msgOil,
                            dataIndex: 'oil',
                            flex: 5,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals: false,
                                minValue: 0
                            }
                        },
                        {
                            text: me.messages.msgWater,
                            dataIndex: 'water',
                            flex: 5,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals: false,
                                minValue: 0
                            }
                        },
                        {
                            text: me.messages.msgGas,
                            dataIndex: 'gas',
                            flex: 5,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals: false,
                                minValue: 0
                            }
                        },
                        {
                            text: me.messages.msgTies,
                            dataIndex: 'extractionTypeAcronym',
                            flex: 5
                        },
                        {
                            text: me.messages.msgWorkingTime,
                            dataIndex: 'workingTime',
                            flex: 12,
                            editor: {
                                xtype: 'numberfield',
                                allowDecimals: false,
                                allowBlank: false,
                                minValue: 0,
                                maxValue: 24
                            }
                        },
                        {
                            text: me.messages.msgBreakTime,
                            dataIndex: 'breakTime',
                            flex: 12,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals: false,
                                minValue:0,
                                maxValue:24
                            }
                        },
                        {
                            text: me.messages.msgOnHours,
                            dataIndex: 'onHours',
                            flex: 10,
                            editor: {
                                xtype: 'numberfield',
                                allowDecimals: false,
                                allowBlank: false,
                                minValue: 0,
                                maxValue: 24
                            }
                        },
                        {
                            text: me.messages.msgOffHours,
                            dataIndex: 'offHours',
                            flex: 10,
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals: false,
                                minValue:0,
                                maxValue:24
                            }
                        }
                    ]
                }
            ]
        };
        me.callParent(arguments);
    }
});