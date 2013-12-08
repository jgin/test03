
/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.EfficiencyProductsReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
//    width: 300,
    
    messages: {
        reportTitle: 'Efficiency - Products',
        labels: {
            lot: 'Lot',
            lotEmptyText: 'All Lots',
            fromDate: 'From',
            toDate: 'To',
            print:'Print',
            resetForm:'Clear'
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
                    store: Ext.create('sisprod.store.LotAll').load(),
                    fieldLabel: me.messages.labels.lot,
                    displayField: 'lotName',
                    valueField: 'idLot',
                    emptyText:me.messages.labels.lotEmptyText,
                    forceSelection: true,
                    labelWidth:40
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: me.messages.labels.workRequestDate,
                    defaults: {labelWidth: 40}, 
                    items: [
                        {
                            xtype: 'datefield',
                            id: 'dateFrom'+me.id,
                            name: 'dateFrom'+me.id,
                            vtype: 'daterange',
                            endDateField: 'dateTo'+me.id,                            
                            fieldLabel: me.messages.labels.fromDate,
                            allowBlank:false
                       },
                       {
                            xtype: 'datefield',
                            id: 'dateTo'+me.id,
                            name: 'dateTo'+me.id,
                            fieldLabel: me.messages.labels.toDate,
                            vtype: 'daterange',
                            startDateField: 'dateFrom'+me.id,
                            padding: '0 0 0 10',
                            allowBlank:false
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
                            var idLot = -1;
                            if(Ext.getCmp('idLot'+me.id).getValue()!=null)
                                idLot=Ext.getCmp('idLot'+me.id).getValue();
                            var dateFrom=Ext.util.Format.date(Ext.getCmp('dateFrom'+me.id).getValue(),'Y-m-d');
                            var dateTo=Ext.util.Format.date(Ext.getCmp('dateTo'+me.id).getValue(),'Y-m-d');
//                            var dateFrom=Ext.Date.parse(Ext.getCmp("dateFromtabReportsWorkRequestStatusHistory").getValue(),'Y-m-d');
                            var reportLink = Ext.String.format("reports.htm?reportName=work_order_efficiency_products.rptdesign&rp_StartDate={0}"+
                                    "&rp_EndDate={1}&rp_idLote={2}",
                                    dateFrom,dateTo,idLot);
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
                    name:'btnClearWorkOrderReports'+me.id,
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