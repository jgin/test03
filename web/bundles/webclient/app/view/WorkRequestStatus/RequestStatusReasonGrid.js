/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkRequestStatus.RequestStatusReasonGrid',{
    extend: 'Ext.grid.Panel',
    
    messages: {
        title: 'Reasons',
        columnHeaders: {
            workRequestStatusReasonName: 'Name',
            workRequestStatusReasonDescription: 'Description'
        },
        validation: {
            repeteadItem: 'The following field(s) has repeated value(s): {0}. Please change it(them)!'
        },
        buttons: {
            addMessage: 'Add',
            deleteMessage: 'Delete'
        }
    },
    
    grow: true,
//    collapsible: true,
    title: 'Reasons',
    id: 'requestStatusReasonGrid',
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.WorkRequestStatusReasonModel',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }),
    height: 250,
    hidden: true,
    
    constructor: function(config){
        var me = this;
        me.callParent([config]);
    },
    
    initComponent: function(){
        var me = this;
        me.getStore().removeAll();
        //
        me.title = me.messages.title;
        me.columns = [
            {
                text: me.messages.columnHeaders.workRequestStatusReasonName,
                dataIndex: 'workRequestStatusReasonName',
                flex: 1,
                editor: {
                    allowBlank: false,
                    fieldStyle: {textTransform: 'uppercase'}
                }
            },
            {
                text: me.messages.columnHeaders.workRequestStatusReasonDescription,
                dataIndex: 'workRequestStatusReasonDescription',
                flex: 3,
                editor: {
                    allowBlank: true,
                    fieldStyle: {textTransform: 'uppercase'}
                }
            }
        ];
        
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            errorSummary: false,
            listeners:{
                'canceledit': function(editor, context, options){
                    if(context.value===""){
                        var sm = context.grid.getSelectionModel();
                        context.store.remove(sm.getSelection());
                        sm.select(0);
                    }
                },
                'validateedit': function(editor, context, options){
                    var newValue = context.newValues;
                    var workRequestStatusReasonName = context.newValues['workRequestStatusReasonName'];
                    var workRequestStatusReasonDescription = context.newValues['workRequestStatusReasonDescription'];
                    if(workRequestStatusReasonName!==""){
                        context.cancel = false;
                        for(var i=0;i<context.store.getCount();i++){
                            if(i===context.rowIdx) continue;
                            var row = context.store.getAt(i);
                            var fields = [];
                            if(row.data['workRequestStatusReasonName']===workRequestStatusReasonName)
                                fields.push(me.messages.columnHeaders['workRequestStatusReasonName']);
                            if(workRequestStatusReasonDescription!=="" && row.data['workRequestStatusReasonDescription']===workRequestStatusReasonDescription)
                                fields.push(me.messages.columnHeaders['workRequestStatusReasonDescription']);
                            if(fields.length>0){
                                Ext.Msg.alert(me.messages.title, Ext.String.format(me.messages.validation.repeteadItem, fields.join(',')));
                                context.cancel = true;
                                break;
                            }
                        }
                    }
                },
                'afteredit': function(editor, object, eventOptions){
                    var value = object.record.data[object.field];
                    if(Ext.isString(value)) object.record.set(object.field, value.toUpperCase());
                }
            }
        });
        me.plugins = [rowEditing];
        
//        var store = me.store;
        //
        me.tbar = [
            {
                text: me.messages.buttons.addMessage,
                iconCls: 'add',
                handler: function(){
                    rowEditing.cancelEdit();
                    var row = Ext.create('sisprod.model.WorkRequestStatusReasonModel',
                    {
                        workRequestStatusReasonName: '',
                        workRequestStatusReasonDescription: ''
                    });
                    me.getStore().insert(me.getStore().getCount(), row);
                    rowEditing.startEdit(row, 0);
                }
            },
            {
                itemId: 'remove',
                text: me.messages.buttons.deleteMessage,
                iconCls: 'remove',
                handler: function() {
                    var sm = me.getSelectionModel();
                    rowEditing.cancelEdit();
                    me.getStore().remove(sm.getSelection());
                    sm.select(0);
                },
                disabled: true
            }
        ];
        
        me.listeners = {
            'selectionchange': function(view, records){
                me.down('#remove').setDisabled(!records.length);
            }
        };
        
        me.callParent(arguments);
    }
});