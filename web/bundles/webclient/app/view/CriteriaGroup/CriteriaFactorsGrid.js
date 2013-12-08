/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.CriteriaGroup.CriteriaFactorsGrid',{
    extend: 'Ext.grid.Panel',
    
    messages: {
        columnHeaders: {
            criteriaFactorName: 'Name',
            criteriaFactorAcronym: 'Acronym'
        },
        validation: {
            repeteadItem: 'There are repeated values: {0}'
        },
        buttons: {
            addMessage: 'Add',
            deleteMessage: 'Delete'
        }
    },
    
    grow: true,
    title: 'Factors',
    id: 'criteriaFactorsGrid',
//    store: Ext.StoreManager.lookup('criteriaFactorsGridStore'),
    store: Ext.create('Ext.data.Store', {
//        storeId: 'criteriaFactorsGridStore',
        model: 'sisprod.model.CriteriaFactorModel',
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
                text: me.messages.columnHeaders.criteriaFactorName,
                dataIndex: 'criteriaFactorName',
                flex: 3,
                editor: {
                    allowBlank: false,
                    maxLength: 50,
                    fieldStyle: {textTransform: 'uppercase'}
                }
            },
            {
                text: me.messages.columnHeaders.criteriaFactorAcronym,
                dataIndex: 'criteriaFactorAcronym',
                flex: 1,
                editor: {
                    allowBlank: false,
                    maxLength: 5,
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
                    var row = Ext.create('sisprod.model.CriteriaFactorModel',
                    {
                        criteriaFactorName: '',
                        criteriaFactorAcronym: ''
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
        var name = context.newValues['criteriaFactorName'].toUpperCase();
        var acronym = context.newValues['criteriaFactorAcronym'].toUpperCase();
        if(name!=="" && acronym!==""){
            context.cancel = false;
            for(var i=0;i<context.store.getCount();i++){
                if(i===context.rowIdx) continue;
                var row = context.store.getAt(i);
                var fields = [];
                if(row.data['criteriaFactorName'].toUpperCase()===name)
                    fields.push(me.messages.columnHeaders['criteriaFactorName']);
                if(row.data['criteriaFactorAcronym'].toUpperCase()===acronym)
                    fields.push(me.messages.columnHeaders['criteriaFactorAcronym']);
                if(fields.length>0){
                    Ext.Msg.alert(me.title, Ext.String.format(me.messages.validation.repeteadItem, fields.join(',')));
                    context.cancel = true;
                    break;
                }
            }
        }
    } 
});