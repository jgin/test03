/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Reports.ChemicalTreatmentReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
    messages: {
        reportTitle: 'Chemical Treatment',
        labels: {
            year: 'Year',
            month: 'Month',
            print: 'Print',
            resetForm: 'Clear'
        },
        message: 'Message',
        selectFirst: 'Select a year first...'
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
            defaults: {
                labelWidth: 120
            },
            layout: {
                type: 'anchor'
            },
            items: [{
                    xtype: 'combobox',
                    name: 'idYear',
                    id: 'idYear',
                    store: Ext.create('sisprod.store.ChemicalTreatmentYearsAll'),
                    fieldLabel: me.messages.labels.year,
                    displayField: 'year',
                    valueField: 'year',
                    forceSelection: true,
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    name: 'idMonth',
                    id: 'idMonth',
                    store: Ext.create('sisprod.store.ChemicalTreatmentMonthsStore', {
                        listeners: {
                            beforeload: function(store, operation, options) {
                                var idYear= me.down('#idYear').getValue();
                                if(Ext.isDefined(idYear) && idYear !== null) {
                                    if(Ext.isDefined(operation.params) && operation.params !== null)
                                        operation.params.idYear = idYear;
                                    else
                                        operation.params = {query: '', idYear: idYear};
                                 
                                } else {
                                    Ext.Msg.alert(me.messages.message, me.messages.selectFirst);
                                    return false;
                                }
                            }
                        }
                    }),
                    fieldLabel: me.messages.labels.month,
                    displayField: 'monthName',
                    valueField: 'idMonth',
                    forceSelection: true,
                    allowBlank: false
                }
            ],
            buttons: [
                {
                    id: 'btnPrintChemicalTreatmentReport',
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function() {
                        if (form.getForm().isValid) {
                            var values = form.getValues();
                            var dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                            var repoLink = Ext.String.format("reports.htm?reportName=chemical_treatment.rptdesign&rp_start_date={0}" +
                                    "&rp_end_date={1}&rp_Title={2}", values['idYear'] + '-' + values['idMonth'] + '-01',
                                    values['idYear'] + '-' + values['idMonth'] + '-' + dias[values['idMonth']], 'REPORTE TRATAMIENTO QU&Iacute;MICO ' + form.down("#idMonth").getRawValue() + ' - ' + values['idYear']);
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                formData: {
                                    url: repoLink,
                                    defaultFormat: sisprod.BasePrintWindow.XLS,
                                    selectableFormat: false,
                                    hiddenTitle: true
                                }
                            });
                            printWindow.show();
                        }
                    }
                },
                {
                    id: 'btnClearChemicalTreatmentReports',
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