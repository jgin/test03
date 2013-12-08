/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.WorkOrderEfficiencyReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
    
    messages: {
        reportTitle: 'Work Order Efficiency',
        labels: {
            sector: 'Sector',
            reportGenerationDate: 'Report Generation Date',
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
                    name: 'idSector',
                    id: 'idSectorWorkOrderEfficiency',
                    store: Ext.create('sisprod.store.SectorAll'),
                    fieldLabel: me.messages.labels.sector,
                    displayField: 'sectorName',
                    valueField: 'idSector',
                    forceSelection: true,
                    allowBlank: false,
                    width: 500
//                    padding: '0 0 0 6'//top right bottom left
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: me.messages.labels.reportGenerationDate,
                    defaults: {labelWidth: 40}, 
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'dateFrom',
                            id: 'dateFromWorkOrderEfficiency',
                            vtype: 'daterange',
                            endDateField: 'dateToWorkOrderEfficiency',                            
                            fieldLabel: me.messages.labels.fromDate
                       },
                       {
                            xtype: 'datefield',
                            name: 'dateTo',
                            id: 'dateToWorkOrderEfficiency',
                            fieldLabel: me.messages.labels.toDate,
                            vtype: 'daterange',
                            startDateField: 'dateFromWorkOrderEfficiency',
                            padding: '0 0 0 10'
                       }
                    ]
                }
            ],
            buttons:[
                {
                    id:'btnPrintWorkOrderEfficiencyReports',
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function(){
                        if(form.getForm().isValid()){
                            var values = form.getValues();
                            var dateFrom=Ext.util.Format.date(Ext.getCmp('dateFromWorkOrderEfficiency').getValue(),'Y-m-d');
                            var dateTo=Ext.util.Format.date(Ext.getCmp('dateToWorkOrderEfficiency').getValue(),'Y-m-d');
                            var reportLink = Ext.String.format("reports.htm?reportName=listWorkOrderEfficency.rptdesign&rp_InIdSector={0}"+
                                    "&rp_InDateStart={1}&rp_InDateEnd={2}", values['idSector'],
                                    dateFrom, dateTo);
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                formData: {
                                    url: reportLink,
                                    defaultFormat: sisprod.BasePrintWindow.XLS,
                                    selectableFormat: true,
                                    hiddenTitle: true
                                }
                            });
                            printWindow.show();
                        }
                    }
                },
                {
                    id:'btnClearWorkOrderEfficiencyReports',
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