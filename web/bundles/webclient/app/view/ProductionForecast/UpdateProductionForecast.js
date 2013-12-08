/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.ProductionForecast.UpdateProductionForecast', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateProductionForecast',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Forecast',
    modal: true,
    width: 600,
    height: 370,
    layout: 'fit',
    hasButtons: false,
    
    messages: {
        msgForecastData: 'Forecast Data',
        msgId: 'Id',
        msgLot: 'Lot',
        msgTitle: 'Title',
        msgEffectiveStartDate: 'Fecha de Inicio',
        msgEffectiveEndDate: 'Fecha de Fin',
        msgButtonStart: 'Generate Forecast',
        msgIdBattery: 'Id Battery',
        msgBattery: 'Battery',
        msgCode: 'Code',
        msgZone: 'Zone'
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
                    xtype:'fieldset',
                    title: me.messages.msgForecastData,
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name : 'idProductionForecast',
                            fieldLabel: 'id',
                            id: 'idProductionForecast'
                        },
                        {
                            xtype: 'textfield',
                            name : 'idProductionForecast',
                            id: 'idProductionForecas°t',
                            fieldLabel: me.messages.msgId,
                            hidden:true  
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 2,
                                    showButtons: false,
                                    name: 'idLot',
                                    id: 'idLot',
                                    store: Ext.create('sisprod.store.LotAll').load(),
                                    fieldLabel: me.messages.msgLot,
                                    displayField: 'lotName',
                                    valueField: 'idLot',
                                    emptyText: 'Seleccione',
                                    forceSelection: true,
                                    allowBlank: false,
                                    margins: '0 10 0 0',
                                    labelWidth: 35,
                                    readOnly: true
                                },
                                {
                                    xtype: 'monthYearField',
                                    submitFormat: 'Y-m-d',
                                    name: 'idMonth',
                                    id: 'idMonth',
                                    labelWidth: 30,
                                    fieldLabel: me.messages.msgMonth,
                                    format: 'F, Y',
                                    flex: 1,
                                    margins: '0 0 0 5',
                                    allowBlank: false,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            name: 'productionForecastName',
                            fieldLabel: me.messages.msgTitle,
                            allowBlank: false,
                            maxLength: 100,
                            labelWidth: 35,
                            readOnly: true
                        }
                    ]
                },
                {
                    margins: '5 0 0 0',
                    xtype: 'gridpanel',
                    id: 'gridProductionForecast',
                    title: 'Baterias',
                    store: 'BatteryByLotStore',
                    collapsible: true,
                    frame: true,
                    height: 243,
                    columns: [
                        {
                            text: me.messages.msgIdBattery,
                            dataIndex: 'idBattery',
                            flex: 1,
                            hidden:true
                        },
                        {
                            text: me.messages.msgBattery,
                            dataIndex: 'batteryName',
                            flex: 10
                        },
                        {
                            text: me.messages.msgCode,
                            dataIndex: 'batteryCode',
                            flex: 5
                        },
                        {
                            text: me.messages.msgZone,
                            dataIndex: 'zoneName',
                            flex: 5
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 20,
                            sortable: false,
                            menuDisabled: true,
                            items: [{
                                iconCls: 'viewDetail',
                                tooltip: me.messages.msgForecastDetail,
                                scope: me.getController(),
                                handler: me.getController().showProductionForecastDetailFromImage
                            }]
                        }
                    ]
                }
            ]
        };
        me.callParent(arguments);
    }
});