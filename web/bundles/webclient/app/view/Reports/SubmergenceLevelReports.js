/* 
 * Filters:Fecha desde - hasta
 */
Ext.define('sisprod.view.Reports.SubmergenceLevelReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 300,
    
    messages: {
        reportTitle: 'Submergence Level',
        labels: {
            condition: 'Condition',
            submergenceValue: 'Value',
            print: 'Print',
            resetForm: 'Reset'
        },
        storeValues: {
            lessEqualThan: 'Less and equal than',
            lessThan: 'Less than',
            equalThan: 'Equal than',
            greaterThan: 'Greater than',
            greaterEqualThan: 'Greater and equal than'
        }
    },
    
    layout:{
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
           items:[
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: me.messages.labels.condition,
                            store: Ext.create('Ext.data.Store', {
                                fields: ['id', 'name'],
                                data: [
                                    {id: -2, name: me.messages.storeValues.lessEqualThan},
                                    {id: -1, name: me.messages.storeValues.lessThan},
                                    {id: 0, name: me.messages.storeValues.equalThan},
                                    {id: 1, name: me.messages.storeValues.greaterThan},
                                    {id: 2, name: me.messages.storeValues.greaterEqualThan}
                                ]
                            }),
                            name: 'condition',
                            displayField: 'name',
                            valueField: 'id',
                            forceSelection: true,
                            editable: false,
                            allowBlank: false,
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
                            name: 'submergenceValue',
                            margin: '0 0 0 10',
                            allowBlank: false,
                            fieldLabel: me.messages.labels.submergenceValue
                        }
                    ]
                }
            ],
            buttons:[
                {
                    id:'btnPrintSubmergenceLevelReports'+me.id,
                    iconCls: 'print',
                    text: me.messages.labels.print,
                    handler: function(){
                        if(form.getForm().isValid()){
                            var values = form.getValues();
                            //
                            var reportLink = Ext.String.format("reports.htm?reportName=submergence_level.rptdesign&rp_InCondition={0}"+
                                    "&rp_InSubmergenceValue={1}", values['condition'], values['submergenceValue']);
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
                    id:'btnClearSubmergenceLevelReports'+me.id,
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