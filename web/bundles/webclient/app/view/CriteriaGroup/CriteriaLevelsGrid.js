/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.CriteriaGroup.CriteriaLevelsGrid',{
    extend: 'Ext.grid.Panel',
    
    messages: {
        columnHeaders: {
            criteriaLevelName: 'Name',
            criteriaLevelValue: 'Value',
            criteriaLevelOrder: 'Order'
        },
        validation: {
            repeteadItem: 'There are repeated items: {0}!'
        },
        buttons: {
            addMessage: 'Add',
            deleteMessage: 'Delete'
        }
    },
    
    grow: true,
    title: 'Levels',
    id: 'criteriaFactorsGrid',
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.CriteriaLevelModel',
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
        me.getStore().removeAll();
//        me.title = me.messages.title;
        me.columns = [
            {
                text: me.messages.columnHeaders.criteriaLevelName,
                dataIndex: 'criteriaLevelName',
                flex: 3,
                editor: {
                    allowBlank: false,
                    fieldStyle: {textTransform: 'uppercase'}
                }
            },
            {
                text: me.messages.columnHeaders.criteriaLevelValue,
                dataIndex: 'criteriaLevelValue',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 1
                }
            },
            {
                text: me.messages.columnHeaders.criteriaLevelOrder,
                dataIndex: 'criteriaLevelOrder',
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    minValue: 1
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
                    me.checkDuplicatedValue.apply(me, [editor, context, options]);
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
                    var row = Ext.create('sisprod.model.CriteriaLevelModel',
                    {
                        criteriaLevelName: '',
                        criteriaLevelValue: 1,
                        criteriaLevelOrder: 1
                    });
                    me.getStore().insert(0, row);
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
    },
            
    checkDuplicatedValue: function(editor, context, options){
        var me = this;
        var newValue = context.newValues;
        var name = context.newValues['criteriaLevelName'].toUpperCase();
        var value = context.newValues['criteriaLevelValue'];
        var order = context.newValues['criteriaLevelOrder'];
        if(name!=="" && value!==0){
            context.cancel = false;
            for(var i=0;i<context.store.getCount();i++){
                if(i===context.rowIdx) continue;
                var row = context.store.getAt(i);
                var fields = [];
                if(row.data['criteriaLevelName'].toUpperCase()===name)
                    fields.push(me.messages.columnHeaders['criteriaLevelName']);
                if(row.data['criteriaLevelValue']==value)
                    fields.push(me.messages.columnHeaders['criteriaLevelValue']);
                if((order!="" || order!=0) && row.data['criteriaLevelOrder']==order)
                    fields.push(me.messages.columnHeaders['criteriaLevelOrder']);
                if(fields.length>0){
                    Ext.Msg.alert(me.title, Ext.String.format(me.messages.validation.repeteadItem, fields.join(',')));
                    context.cancel = true;
                    break;
                }
            }
        }
    }
});