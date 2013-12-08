/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.TestProgram.ProgramBattery', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.programBattery',
    require: [
        'sisprod.view.base.BaseDataWindow',
        'Ext.panel.Panel',
        'Ext.toolbar.Toolbar'
    ],
    messages: {
        msgBattery: 'Battery',
        msgBatteryCode: 'Code',
        msgZone: 'Zone',
        msgListBattery: 'Batteries',
        msgEmployeeElaboration: 'Processor by',
        msgElaborationDate: 'Date of Preparation',
        msgLot: 'Lot',
        msgMonth: 'Month',
        msgTitleFielSet: 'Program Data',
        msgListTitle: 'Program Batteries',
        msgTipAdd: 'Add Battery Per Develop',
        msgTipEidt: 'Edit Programming Battery',
        msgTipRemove: 'Remove Programming Battery'
    },
    
    title: 'Develop Program',
    modal: true,
    width: 650,
    height: 355,
    layout: 'fit',
    hasButtons: false,
    gridStore: null,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 5,
                    
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idTestProgram',
                    id: 'idTestProgram'
                },
                {
                    xtype: 'monthYearField',
                    name: 'idMonth',
                    format: 'F, Y',
                    id: 'idMonth',
                    hidden: true
                },
                {
                    xtype: 'hiddenfield',
                    name: 'idLot',
                    id: 'idLot'
                },
                {
                    xtype: 'fieldset',
                    layou: 'hbox',
                    frame: true,
                    title: me.messages.msgTitleFielSet,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: me.messages.msgEmployeeElaboration,
                                    id: 'txtEmployeeElaboration',
                                    flex: 5,
                                    readOnly: true
                                },
                                {
                                    xtype: 'datefield',
                                    id: 'txtElaborationDate',
                                    margins: '0 0 0 5',
                                    fieldLabel: me.messages.msgElaborationDate,
                                    flex: 2.5,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txtLot',
                                    flex: 5,
                                    fieldLabel: me.messages.msgLot,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtMonth',
                                    flex: 2.5,
                                    margins: '0 0 0 5',
                                    fieldLabel: me.messages.msgMonth,
                                    readOnly: true
                                }
                            ]
                        }
                    ]
                },
                {
                    title: me.messages.msgListTitle,
                    xtype: 'panel',
                    height: 230,
                    frame: true,
                    layout: 'fit',
                    dockedItems: [{
                        dock: 'top',
                        xtype: 'toolbar',
                        items: [
                            {
                                iconCls: 'add',
                                xtype: 'button',
                                tooltip: me.messages.msgTipAdd,
                                action: 'addBattery'
                            },
                            '-',
                            {
                                iconCls: 'edit',
                                xtype: 'button',
                                tooltip: me.messages.msgTipEdit ,
                                action: 'editBattery'
                            },
                            '-',
                            {
                                iconCls: 'remove',
                                xtype: 'button',
                                tooltip: me.messages.msgTipRemove,
                                action: 'removeBattery'
                            }
                        ]
                    }],
                    items: [
                        {
                            margins: '5 0 0 0',
                            xtype: 'gridpanel',
                            id: 'gridTestProgram',
                            store: me.gridStore,
                            columns: [
                                {
                                    text: me.messages.msgId,
                                    dataIndex: 'idBattery',
                                    flex: 1,
                                    hidden:true
                                },
                                {
                                    text: me.messages.msgBattery,
                                    dataIndex: 'batteryName',
                                    flex: 10
                                },
                                {
                                    text: me.messages.msgBatteryCode,
                                    dataIndex: 'batteryCode',
                                    flex: 5
                                },
                                {
                                    text: me.messages.msgZone,
                                    dataIndex: 'zoneName',
                                    flex: 5
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        me.callParent(arguments);
    }
});

