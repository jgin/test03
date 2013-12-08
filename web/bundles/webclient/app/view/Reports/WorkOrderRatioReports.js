/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Reports.WorkOrderRatioReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    alias: 'widget.workOrderRatioReports',
    closable: true,
    height: 300,
    messages: {
        reportTitle: 'Estimated Days For Work',
        labels: {
            startDate: 'Start Date',
            endDate: 'End Date',
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
                            name: 'startDate',
                            id: 'startDate',
                            fieldLabel: me.messages.labels.startDate,
                            forceSelection: true,
                            allowBlank: false
                        },
                        {
                            padding: '0 0 0 10',
                            xtype: 'datefield',
                            name: 'endDate',
                            id: 'endDate',
                            fieldLabel: me.messages.labels.endDate,
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
                            var lot = 0;
                            var lotName = "Todos";
                            if (values['idLot'] !== null && !isNaN(values['idLot']) && values['idLot'] !== '') {
                                lot = values['idLot'];
                                lotName = Ext.getCmp("idLot").getRawValue();
                            }
                            var repoLink = Ext.String.format("reports.htm?reportName=work_order_ratio.rptdesign&start_Date={0}" +
                                    "&end_date={1}&rp_Title={2}&id_lot={3}&lot_name={4}",
                                    sisprod.getApplication().formatSpanishDate(values['startDate']),
                                    sisprod.getApplication().formatSpanishDate(values['endDate']),
                                    "Dias Estimados Por Trabajo", lot, lotName);
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
                    id: 'btnClearWorkOrderRatio',
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