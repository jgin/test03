/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.WorkRequestStatusHistoryReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
//    width: 300,
    
    messages: {
        reportTitle: 'Work Request Status History',
        labels: {
            workRequestSource: 'Request Source',
            workRequestDate: 'Request Date',
            statusHistory: 'Had The State',
            status: 'State',
            fromDate: 'From',
            toDate: 'To',
            sectorName: 'Sector',
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
                    name: 'idSector'+me.id,
                    id: 'idSector'+me.id,
//                    flex: 3,
//                            anchor: '60%',
                    store: Ext.create('sisprod.store.SectorAll').load(),
                    fieldLabel: me.messages.labels.sectorName,
                    displayField: 'sectorName',
                    valueField: 'idSector',
                    forceSelection: true
                },
                {
                    xtype: 'combobox',
                    name: 'idStatus'+me.id,
                    id: 'idStatus'+me.id,
//                    flex: 6,
//                    anchor: '60%',
                    store: Ext.create('sisprod.store.WorkRequestStatusAll').load(),
                    fieldLabel: me.messages.labels.status,
                    displayField: 'workRequestStatusName',
                    valueField: 'idWorkRequestStatus',
                    forceSelection: true,
                    width: 400
                },
                {
                    xtype: 'combobox',
                    name: 'idStatusHistory'+me.id,
                    id: 'idStatusHistory'+me.id,
//                    flex: 6,
//                            anchor: '60%',
                    store: Ext.create('sisprod.store.WorkRequestStatusAll').load(),
                    fieldLabel: me.messages.labels.statusHistory,
                    displayField: 'workRequestStatusName',
                    valueField: 'idWorkRequestStatus',
                    forceSelection: true,
                    width: 400
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
                            fieldLabel: me.messages.labels.fromDate
                       },
                       {
                            xtype: 'datefield',
                            id: 'dateTo'+me.id,
                            name: 'dateTo'+me.id,
                            fieldLabel: me.messages.labels.toDate,
                            vtype: 'daterange',
                            startDateField: 'dateFrom'+me.id,
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
                            var dateFrom=Ext.util.Format.date(Ext.getCmp('dateFrom'+me.id).getValue(),'Y-m-d');
                            var dateTo=Ext.util.Format.date(Ext.getCmp('dateTo'+me.id).getValue(),'Y-m-d');
//                            var dateFrom=Ext.Date.parse(Ext.getCmp("dateFromtabReportsWorkRequestStatusHistory").getValue(),'Y-m-d');
                            var reportLink = Ext.String.format("reports.htm?reportName=work_request_status_history.rptdesign&rp_InRequestDate1={0}"+
                                    "&rp_InRequestDate2={1}&rp_InIdSector={2}&rp_InIdStatusHistory={3}&rp_InIdStatus={4}",
                                    dateFrom,dateTo,values['idSector'+me.id],values['idStatusHistory'+me.id],values['idStatus'+me.id]);
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                formData: {
                                    url: reportLink,
                                    defaultFormat: sisprod.BasePrintWindow.PDF,
                                    selectableFormat: false,
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