/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkCategory.WorkCategoryDetailsGrid',{
    extend: 'Ext.grid.Panel',
    
    messages: {
        title: 'Work Category Details',
        columnHeaders: {
            workCategoryDetailName: 'Description'
        },
        validation: {
            repeteadItem: 'Work category detail already exists!'
        },
        buttons: {
            addMessage: 'Add',
            deleteMessage: 'Delete'
        }
    },
    
    grow: true,
    title: 'Work Category Details',
    id: 'workCategoryDetailsGrid',
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.WorkCategoryDetailModel',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }),
    height: 250,
    
    constructor: function(config){
        var me = this;
        me.callParent([config]);
    },
    
    initComponent: function(){
        var me = this;
        //
        me.getStore().removeAll();
        //
        me.title = me.messages.title;
        me.columns = [
            {
                text: me.messages.columnHeaders.workCategoryDetailName,
                dataIndex: 'workCategoryDetailName',
                flex: 1,
                editor: {
                    allowBlank: false,
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
                    var workCategoryDetailName = context.newValues['workCategoryDetailName'];
                    if(workCategoryDetailName!==""){
                        context.cancel = false;
                        for(var i=0;i<context.store.getCount();i++){
                            if(i===context.rowIdx) continue;
                            var row = context.store.getAt(i);
                            if(row.data['workCategoryDetailName']===workCategoryDetailName){
                                Ext.Msg.alert(me.messages.title, me.messages.validation.repeteadItem);
                                context.cancel = true;
                                break;
                            }
                        }
                    }
                },
                'afteredit': function(editor, object, eventOptions){
                    object.record.set(object.field, object.record.data[object.field].toUpperCase());
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
                    var row = Ext.create('sisprod.model.WorkCategoryDetailModel',
                    {
                        workCategoryDetailName: ''
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