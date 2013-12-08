/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Reports.ForecastProductionReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    alias: 'widget.forecastProductionReports',
    closable: true,
    height: 300,
    messages: {
        reportTitle: 'Forecast Production Report',
        labels: {
            month: 'Month',
            year: 'Year',
            lot: 'Lot',
            print: 'Print',
            resetForm: 'Clear'
        },
        message: 'Message'
    },
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: '20 0 0 0',
    initComponent: function() {
        var me = this;
        me.items = new Array();
        var form = Ext.create('Ext.form.Panel', {
            title: me.messages.reportTitle,
            frame: true,
            width: 550,
            defaults: {
                labelWidth: 120
            },
            layout: {
                type: 'anchor'
            },
            items: [
                {
                    anchor: '100%',
                    xtype: 'combobox',
                    grow: true,
                    name: 'idLot' + me.id,
                    id: 'idLot' + me.id,
                    store: Ext.create('sisprod.store.LotAll'),
                    fieldLabel: me.messages.labels.lot,
                    displayField: 'lotName',
                    valueField: 'idLot',
                    editable: false
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: '',
                    defaults: {labelWidth: 120},
                    anchor: '100%',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'idMonth' + me.id,
                            id: 'idMonth' + me.id,
                            fieldLabel: me.messages.labels.month,
                            anchor: '100%',
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
                            forceSelection: true,
                            allowBlank: false,
                            editable: false,
                            value: (new Date()).getMonth()
                        },
                        {
                            padding: '0 0 0 10',
                            xtype: 'numberfield',
                            name: 'idYear' + me.id,
                            id: 'idYear' + me.id,
                            value: new Date().getFullYear(),
                            minValue: 2013,
                            fieldLabel: me.messages.labels.year,
                            forceSelection: true,
                            allowBlank: false
                        }
                    ]
                }
            ],
            buttons: [
                {
                    id: 'btnPrintForecastProductionReport',
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function() {
                        if (form.getForm().isValid) {
                            var values = form.getValues();
                            var lot;
                            var lotName = "Todos";
                            if (values['idLot' + me.id] !== null && !isNaN(values['idLot' + me.id]) && values['idLot' + me.id] !== '') {
                                lot = values['idLot' + me.id];
                                lotName = Ext.getCmp("idLot" + me.id).getRawValue();
                            }
                            var repoLink = Ext.String.format("reports.htm?reportName=forecast_production_report_copia.rptdesign&reportDate={0}" +
                                    "&rp_Title={1}&rp_idLot={2}&lot_name={3}&rp_nombre_mes={4}&rp_year={5}",
                                    sisprod.getApplication().formatSpanishDate(new Date(values['idYear' + me.id], values['idMonth' + me.id], 1)),
                                    "PRONOSTICO DE PRODUCCION DIARIA DE CAMPO", lot, lotName, Ext.getCmp("idMonth" + me.id).getRawValue(), values['idYear' + me.id]);
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                formData: {
                                    url: repoLink,
                                    defaultFormat: sisprod.BasePrintWindow.XLS,
                                    hiddenTitle: true
                                }
                            });
                            printWindow.show();
                        }
                    }
                },
                {
                    id: 'btnClearForecastProduction',
                    text: me.messages.labels.resetForm,
                    iconCls: 'clear',
                    handler: function() {
                        form.getForm().reset();
                    }
                }
            ]
        });
        me.items.push(form);
        me.callParent(arguments);
    },
    checkdate: function(m, d, y) {
        return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
    }
});