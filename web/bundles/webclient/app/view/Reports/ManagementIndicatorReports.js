/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.ManagementIndicatorReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
    
    alias: 'widget.managementIndicatorReports',
    
    messages: {
        reportTitle: 'Management Indicator',
        messageText: 'Message',
        labels: {
            year: 'Year',
            lot: 'Lot',
            workRequestSource: 'Request Source',
            fromDate: 'Start Date',
            toDate: 'End Date',
            print: 'Print',
            resetForm: 'Reset'
        }
    },
    
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: '20 0 0 0',
    initComponent: function(){
       var me = this;
       
       var currentYear = (new Date()).getFullYear();
       
       me.items = new Array();
       
       var form = Ext.create('Ext.form.Panel', {
           title: me.messages.reportTitle,
           frame: true,
           layout: 'anchor',
           width: 450,
           defaults: {
                labelWidth: 120
           },
           items:[
                {
                    xtype: 'numberfield',
                    name: 'year' + me.id,
                    fieldLabel: me.messages.labels.year,
                    minValue: 1900,
                    maxValue: currentYear,
                    value: currentYear,
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    name: 'idLot' + me.id,
                    labelWidth: 120,
                    store: Ext.create('sisprod.store.LotAll'),
                    fieldLabel: me.messages.labels.lot,
                    displayField: 'lotName',
                    valueField: 'idLot',
                    forceSelection: true
//                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    name: 'idWorkRequestSource' + me.id,
                    id: 'idWorkRequestSource' + me.id,
                    store: Ext.create('sisprod.store.WorkRequestSourceAll'),
                    fieldLabel: me.messages.labels.workRequestSource,
                    labelWidth: 120,
                    displayField: 'workRequestSourceName',
                    valueField: 'idWorkRequestSource',
                    forceSelection: true,
//                    allowBlank: false,
                    width: 400
                }
            ],
            buttons:[
                {
//                    id:'btnPrintManagmentIndicatorReport' + me.id,
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function(){
                        if(form.getForm().isValid()){
                            var values = form.getValues();
                            //
                            var reportLink = Ext.String.format("reports.htm?reportName=management_indicator_report.rptdesign&rp_InYear={0}&rp_InIdLot={1}"+
                                    "&rp_InIdWorkRequestSource={2}",
                                    values['year' + me.id], values['idLot' + me.id], values['idWorkRequestSource' + me.id]);
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                formData: {
                                    url: reportLink,
                                    defaultFormat: sisprod.BasePrintWindow.XLS,
//                                    selectableFormat: false,
                                    hiddenTitle: true
                                }
                            });
                            printWindow.show();
                        }
                    }
                },
                {
                    text: me.messages.labels.resetForm,
                    iconCls: 'clear',
                    handler: function(){
                        form.getForm().reset();
                    }
                }
            ]
        });
       me.items.push(form);
       me.callParent(arguments);
    }
});