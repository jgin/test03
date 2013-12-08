/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.PerformedActivitiesReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
    
    alias: 'widget.performedActivitiesReports',
    
    messages: {
        reportTitle: 'Performed Activities',
        messageText: 'Message',
        labels: {
            lot: 'Lot',
            workCategory: 'Work Category',
            workCategoryDetail: 'Work Type',
            fromDate: 'Start Date',
            toDate: 'End Date',
            print: 'Print',
            resetForm: 'Reset'
        },
        validations: {
            selectWorkCategory: 'Select work category first...'
        },
        workCategoryDetailEmptyText: 'Type work type...'
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
           width: 600,
           defaults: {
                labelWidth: 120
           },
           items:[
                {
                    xtype: 'combobox',
                    name: 'idLot' + me.id,
                    id: 'idLot' + me.id,
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
                    name: 'idWorkCategory' + me.id,
                    id: 'idWorkCategory' + me.id,
                    anchor: '80%',
                    flex: 1,
                    labelWidth: 120,
                    fieldLabel: me.messages.labels.workCategory,
                    store: Ext.create('sisprod.store.WorkCategoryAll').load(),
                    displayField: 'workCategoryName',
                    valueField: 'idWorkCategory',
                    forceSelection: true,
                    allowBlank: false,
                    editable: false
                },
                {
                    xtype: 'sensitivecombocontainer',
                    anchor: '100%',
                    showAddButton: false,
                    sensitiveComboBoxOptions:{
                        hideTrigger: false,
                        labelWidth: 120,
                        name: 'idWorkType' + me.id,
                        id: 'idWorkType' + me.id,
                        fieldLabel: me.messages.labels.workCategoryDetail,
                        store: Ext.create('sisprod.store.WorkCategoryDetailByCategory',{
                            listeners: {
                                beforeload: function(store, operation, options){
                                    var idWorkCategory = me.down('#idWorkCategory' + me.id).getValue();
                                    if(Ext.isDefined(idWorkCategory) && idWorkCategory!==null){
                                        if(Ext.isDefined(operation.params) && operation.params!==null)
                                            operation.params.idWorkCategory = idWorkCategory;
                                        else operation.params = {query: '', idWorkCategory: idWorkCategory};
                                    }
                                    else{
                                        Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectWorkCategory);
                                        return false;
                                    }
                                }
                            }
                        }),
                        emptyText: me.messages.workCategoryDetailEmptyText,
                        forceSelection : true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{workCategoryDetailName}','</tpl>'),
                        valueField: 'idWorkCategoryDetail',
                        listConfig: {
                            getInnerTpl: function() {
                                return "{workCategoryDetailName}";
                            }
                        }
                    }
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
                            labelWidth: 80,
                            vtype: 'daterange',
                            startDateField: 'dateFrom' + me.id,
                            padding: '0 0 0 10',
                            allowBlank: false
                       }
                    ]
                }
            ],
            buttons:[
                {
                    id:'btnPrintWorkOrderReports' + me.id,
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function(){
                        if(form.getForm().isValid()){
                            var values = form.getValues();
                            //
                            var reportLink = Ext.String.format("reports.htm?reportName=performed_activities.rptdesign&rp_InIdLot={0}"+
                                    "&rp_InIdWorkCategoryDetail={1}&rp_InStartDate={2}&rp_InEndDate={3}", values['idLot'+me.id],
                                    values['idWorkType'+me.id],
                                    sisprod.getApplication().formatSpanishDate(values['dateFrom'+me.id]),
                                    sisprod.getApplication().formatSpanishDate(values['dateTo'+me.id]));
                            var printWindow = Ext.create('sisprod.view.base.BasePrintWindow', {
                                controller: me.controller,
                                forPrintingList: false,
                                formData: {
                                    url: reportLink,
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