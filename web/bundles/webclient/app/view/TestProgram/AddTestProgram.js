/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.TestProgram.AddTestProgram', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addTestProgram',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages: {
        msgId: 'id',
        msgEmployeeElaboration: 'Processor by',
        msgElaborationDate: 'Date of Preparation',
        msgLot: 'Lot',
        msgMonth: 'Month',
        msgComment: 'Comment',
        msgFieldSetProgramData: 'Program Data',
        msgEmployeeElaborationEmpty: 'Employee Enter',
        msgButtonStart: 'Develop Test Program'
    },
    
    title: 'Testing Program',
    modal: true,
    width: 680,
    layout: 'fit',
    hasButtons: false,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            fieldDefaults: {
                labelWidth: 70,
                anchor: '100%'
            },
            buttons:[
                {
                    id: 'startTestProgram',
                    text: me.messages.msgButtonStart,
                    iconCls: 'startProgram',
                    action: 'startTestProgram'
                }
            ],            
            bodyPadding: 5,
            items: [
                {
                    xtype:'fieldset',
                    title: me.messages.msgFieldSetProgramData,
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textfield',
                            //name : 'idTestProgram',
                            id: 'idTestProgram',
                            fieldLabel: me.messages.msgId,
                            hidden:true  
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'sensitivecombocontainer',
                                    showAddButton: false,
                                    flex: 5,
                                    sensitiveComboBoxOptions:{
                                        name: 'idEmployee',
                                        fieldLabel: me.messages.msgEmployeeElaboration,
                                        store: Ext.create('sisprod.store.EmployeeTemplate'),
                                        emptyText: me.messages.msgEmployeeElaborationEmpty,
                                        id: 'idEmployee',
                                        forceSelection : true,
                                        allowBlank: false,
                                        displayTpl: Ext.create('Ext.XTemplate',
                                            '<tpl for=".">','{personFullName} ({fullDocumentNumber})','</tpl>'),
                                        valueField: 'idEmployee',
                                        listConfig: {
                                            getInnerTpl: function() {
                                                return '{personFullName} ({fullDocumentNumber})';
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'elaborationDate',
                                    id: 'elaborationDate',
                                    margins: '0 0 0 5',
                                    fieldLabel: me.messages.msgElaborationDate,
                                    allowBlank: false,
                                    flex: 2.5,
                                    value: new Date()
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 5,
                                    showButtons: false,
                                    name: 'idLot',
                                    id: 'idLot',
                                    store: 'LotAll',
                                    fieldLabel: me.messages.msgLot,
                                    displayField: 'lotName',
                                    valueField: 'idLot',
                                    emptyText: 'Seleccione',
                                    forceSelection: true,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'monthYearField',
                                    submitFormat: 'Y-m-d',
                                    name: 'idMonth',
                                    id: 'idMonth',
                                    fieldLabel: me.messages.msgMonth,
                                    format: 'F, Y',
                                    flex: 2.5,
                                    margins: '0 0 0 5',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            name: 'comment',
                            id: 'comment',
                            fieldLabel: me.messages.msgComment
                        }
                    ]
                }
            ]
        };
        me.callParent(arguments);
    }    
});