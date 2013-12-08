/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.WorkRequestMasterReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
    
    messages: {
        reportTitle: 'Master Report Work Request / Work Order',
        labels: {
            lot: 'Lot',
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
                    name: 'idLot'+me.id,
                    id: 'idLot'+me.id,
                    store: Ext.create('sisprod.store.LotAll'),
                    fieldLabel: me.messages.labels.lot,
                    displayField: 'lotName',
                    valueField: 'idLot',
                    forceSelection: true,
                    width: 500
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
                            endDateField: 'dateTo' + me.getId(),                            
                            fieldLabel: me.messages.labels.fromDate
                       },
                       {
                            xtype: 'datefield',
                            name: 'dateTo'+me.id,
                            id: 'dateTo'+me.id,
                            fieldLabel: me.messages.labels.toDate,
                            vtype: 'daterange',
                            startDateField: 'dateFrom' + me.getId(),
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
                            var dateFrom = Ext.Date.format(Ext.getCmp('dateFrom'+me.id).getValue(), 'Y-m-d');
                            var dateTo = Ext.Date.format(Ext.getCmp('dateTo'+me.id).getValue(), 'Y-m-d');
                            var reportLink = Ext.String.format("reports.htm?reportName=reporte_maestro_de_OT_PT.rptdesign&rp_InIdLot={0}"+
                                    "&rp_InStartRequestDate={1}&rp_InEndRequestDate={2}", values['idLot'+me.id],
                                    dateFrom, dateTo);
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