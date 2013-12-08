/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Reports.DeferredProductionReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    alias: 'widget.workOrderRatioReports',
    closable: true,
    height: 300,
    messages: {
        reportTitle: 'Deferred Production Report',
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
                            xtype: 'datefield',
                            name: 'reportDate' + me.id,
                            id: 'reportDate' + me.id,
                            fieldLabel: me.messages.labels.reportDate,
                            forceSelection: true,
                            allowBlank: false
                        }
                    ]
                }
            ],
            buttons: [
                {
                    id: 'btnPrintDeferredProductionReport',
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function() {
                        if (form.getForm().isValid) {
                            var values = form.getValues();
                            var lot = null;
                            var lotName = "Todos";
                            if (values['idLot' + me.id] !== null && !isNaN(values['idLot' + me.id]) && values['idLot' + me.id] !== '') {
                                lot = values['idLot' + me.id];
                                lotName = Ext.getCmp("idLot" + me.id).getRawValue();
                            }
                            var repoLink = Ext.String.format("reports.htm?reportName=deferred_production.rptdesign&reportDate={0}" +
                                    "&rp_Title={1}&rp_idLote={2}&lot_name={3}",
                                    sisprod.getApplication().formatSpanishDate(values['reportDate' + me.id]),
                                    "PARTE DIARIO DE PRODUCCION DIFERIDA", lot, lotName);
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
                    id: 'btnClearDeferredProduction',
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