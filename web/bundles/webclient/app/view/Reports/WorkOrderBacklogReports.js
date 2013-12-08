/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.WorkOrderBacklogReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
    
    messages: {
        reportTitle: 'Work Order Backlog',
        labels: {
            workRequestSource: 'Request Source',
            workRequestGenerationDate: 'Request Generation Date',
            fromDate: 'From',
            toDate: 'To',
            print: 'Print',
            resetForm: 'Reset'
        }
    },
    
    layout:{
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
           defaults: {
                labelWidth: 120
           },
           items:[
                {
                    xtype: 'combobox',
                    name: 'idWorkRequestSource'+me.id,
                    id: 'idWorkRequestSource'+me.id,
                    store: Ext.create('sisprod.store.WorkRequestSourceAll'),
                    fieldLabel: me.messages.labels.workRequestSource,
//                    labelWidth: 120,
                    displayField: 'workRequestSourceName',
                    valueField: 'idWorkRequestSource',
                    forceSelection: true,
                    allowBlank: false,
                    width: 500
//                    padding: '0 0 0 6'//top right bottom left
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: me.messages.labels.workRequestGenerationDate,
                    defaults: {labelWidth: 40}, 
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'dateFrom'+me.id,
                            id: 'dateFrom'+me.id,
                            vtype: 'daterange',
                            endDateField: 'dateTo' + me.id,                            
                            fieldLabel: me.messages.labels.fromDate
                       },
                       {
                            xtype: 'datefield',
                            name: 'dateTo'+me.id,
                            id: 'dateTo'+me.id,
                            fieldLabel: me.messages.labels.toDate,
                            vtype: 'daterange',
                            startDateField: 'dateFrom' + me.id,
                            padding: '0 0 0 10'
                       }
                    ]
                }
            ],
            buttons:[
                {
                    id:'btnPrintWorkOrderReports'+me.id,
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function(){
                        if(form.getForm().isValid()){
                            var values = form.getValues();
                            //
                            var reportLink = Ext.String.format("reports.htm?reportName=work_order_backlog.rptdesign&rp_InIdWorkRequestSource={0}"+
                                    "&rp_InStartDate={1}&rp_InEndDate={2}", values['idWorkRequestSource'+me.id],
                                    values['dateFrom'+me.id], values['dateTo'+me.id]);
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                standardXls: true,
                                formData: {
                                    url: reportLink,
                                    defaultFormat: sisprod.BasePrintWindow.STANDARD_XLS,
                                    selectableFormat: false,
                                    hiddenTitle: true
                                }
                            });
                            printWindow.show();
                        }
                    }
                },
                {
                    id:'btnClearWorkOrderReports'+me.id,
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