
/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.CompressorStopReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
//    width: 300,
    
    messages: {
        reportTitle: 'Compressors Stop',
        labels: {
            lot: 'Lot',
            lotEmptyText: 'All Lots',
            month: 'Month',
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
                    labelWidth:100
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: me.messages.labels.workRequestDate,
                    defaults: {labelWidth: 100}, 
                    items: [
                        {
                            xtype: 'monthYearField',
                            id: 'month'+me.id,
                            name: 'month'+me.id,
                            format: 'F, Y',
                            fieldLabel: me.messages.labels.month,
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
                            var month=Ext.getCmp('month'+me.id).month;
                            var year=Ext.getCmp('month'+me.id).year;
                            var reportLink = Ext.String.format("reports.htm?reportName=parada_compresores.rptdesign&rpInMes={0}"+
                                    "&rpInAnio={1}&rpInLote={2}",
                                    month,year,idLot);
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                standardXls: true, 
                                formData: {
                                    url: reportLink,
                                    defaultFormat: sisprod.BasePrintWindow.STANDARD_XLS, 
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