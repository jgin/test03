/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.WorkRequestEffectivenessPlanningReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
    
    alias: 'widget.workRequestEffectivenessPlanningReports',
    
    messages: {
        reportTitle: 'Effectiveness Planning',
        messageText: 'Message',
        labels: {
            lot: 'Lot',
            date: 'Date',
            fromDate: 'From',
            toDate: 'To',
            print: 'Print',
            resetForm: 'Reset'
        },
        lotEmptyText: 'All Lots...'
    },
    
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: '20 0 0 0',
    initComponent: function(){
       var me = this;
       
       me.items = new Array();
       
       var form = Ext.create('Ext.form.Panel', {
           title: me.messages.reportTitle,
           frame: true,
           layout: 'anchor',
           width: 350,
           defaults: {
                labelWidth: 80
           },
           items:[
                {
                    xtype: 'combobox',
                    name: 'idLot' + me.id,
                    id: 'idLot' + me.id,
                    anchor: '80%',
//                    labelWidth: 120,
                    store: Ext.create('sisprod.store.LotAll'),
                    fieldLabel: me.messages.labels.lot,
                    displayField: 'lotName',
                    valueField: 'idLot',
                    forceSelection: true,
                    emptyText: me.messages.lotEmptyText
//                    allowBlank: false
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    fieldLabel: me.messages.labels.date,
                    defaults: {labelWidth: 40}, 
                    anchor: '100%',
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'dateFrom'+me.id,
                            id: 'dateFrom'+me.id,
                            vtype: 'daterange',
                            endDateField: 'dateTo' + me.id,
                            fieldLabel: me.messages.labels.fromDate,
                            allowBlank: false
                       },
                       {
                            xtype: 'datefield',
                            name: 'dateTo' + me.id,
                            id: 'dateTo' + me.id,
                            fieldLabel: me.messages.labels.toDate,
//                            labelWidth: 80,
                            vtype: 'daterange',
                            startDateField: 'dateFrom' + me.id,
//                            padding: '0 0 0 10',
                            allowBlank: false
                       }
                    ]
                }
            ],
            buttons:[
                {
                    id:'btnPrintReport' + me.id,
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function(){
                        if(form.getForm().isValid()){
                            var values = form.getValues();
                            //
                            var reportLink = Ext.String.format("reports.htm?reportName=work_request_effectiveness_planning.rptdesign&rp_InIdLot={0}"+
                                    "&rp_InStartDate={1}&rp_InEndDate={2}", values['idLot'+me.id],
                                    sisprod.getApplication().formatSpanishDate(values['dateFrom'+me.id]),
                                    sisprod.getApplication().formatSpanishDate(values['dateTo'+me.id]));
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                formData: {
                                    url: reportLink,
                                    defaultFormat: sisprod.BasePrintWindow.PDF,
//                                    selectableFormat: false,
                                    hiddenTitle: true
                                }
                            });
                            printWindow.show();
                        }
                    }
                },
                {
                    id:'btnClearWorkOrderReports' + me.id,
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