/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Reports.DailyOperationsReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    alias: 'widget.workOrderRatioReports',
    closable: true,
    height: 300,
    messages: {
        reportTitle: 'Daily Operation Report',
        labels: {
            reportDate: 'Date',
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
                    name: 'idLot',
                    id: 'idLot',
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
                            xtype: 'datefield',
                            name: 'reportDate',
                            id: 'reportDate',
                            fieldLabel: me.messages.labels.reportDate,
                            forceSelection: true,
                            allowBlank: false
                        }
                    ]
                }
            ],
            buttons: [
                {
                    id: 'btnPrintScheduledDaysReport',
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function() {
                        if (form.getForm().isValid) {
                            var values = form.getValues();
                            var lot = null;
                            var lotName = "Todos";
                            if (values['idLot'] !== null && !isNaN(values['idLot']) && values['idLot'] !== '') {
                                lot = values['idLot'];
                                lotName = Ext.getCmp("idLot").getRawValue();
                            }
                            var repoLink = Ext.String.format("reports.htm?reportName=daily_operations_report.rptdesign&report_date={0}" +
                                    "&rp_Title={1}&id_lot={2}&lot_name={3}",
                                    sisprod.getApplication().formatSpanishDate(values['reportDate']),
                                    "REPORTE DIARIO DE OPERACIONES", lot, lotName);
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
                    id: 'btnClearDailyOperations',
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
    }
});