/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ExtractionType.ExtractionTypeDetail',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.extractionTypeDetail',
    
    messages: {
        title: 'Extraction Types',
        columnHeaders: {
            extractionTypeName: 'Extraction Type',
            extractionTypeAcronym: 'Acronym'
        },
        validation: {
            repeteadName: 'Extraction Type Name already exists!',
            repeteadAcronym: 'Extraction Type Acronym already exists'
        },
        buttons: {
            addMessage: 'Add',
            deleteMessage: 'Delete'
        },
        tips: {
            msgConfigurationFeatures: 'Configuration Features'
        }
    },
    
    grow: true,
    title: 'Extraction Types',
    id: 'extractionTypeDetail',
    store: null,
    height: 250,
    controller: null,
    
    constructor: function(config){
        var me = this;
        me.callParent([config]);
    },
    
    initComponent: function(){
        var me = this;
        me.store = me.controller.createExtractionTypeStore();
        me.title = me.messages.title;
        me.columns = [
            {
                text: me.messages.columnHeaders.extractionTypeName,
                dataIndex: 'extractionTypeName',
                flex: 2,
                renderer: me.getColumnRenderer(),
                editor: {
                    allowBlank: false,
                    maxLength: 150
                }
            },
            {
                text: me.messages.columnHeaders.acronym,
                dataIndex: 'extractionTypeAcronym',
                flex: 1,
                renderer: me.getColumnRenderer(),
                editor: {
                    allowBlank: false,
                    maxLength: 20
                }
            },
            {
                xtype: 'actioncolumn',
                width: 20,
                sortable: false,
                menuDisabled: true,
                items: [{
                    scope: me.controller,
                    iconCls: 'config',
                    tooltip: me.messages.tips.msgConfigurationFeatures,
                    handler: me.controller.showFormExtractionTypeFeatures
                }]
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
                    var extractionTypeName = context.newValues['extractionTypeName'].trim();
                    var acronym = context.newValues['extractionTypeAcronym'].trim();
                    if(extractionTypeName!==""){
                        context.cancel = false;
                        for(var i=0;i<context.store.getCount();i++){
                            if(i===context.rowIdx) continue;
                            var row = context.store.getAt(i);
                            if(row.data['extractionTypeName']===extractionTypeName){
                                Ext.Msg.alert(me.messages.title, me.messages.validation.repeteadName);
                                context.cancel = true;
                                break;
                            }
                            if(row.data['extractionTypeAcronym']===acronym){
                                Ext.Msg.alert(me.messages.title, me.messages.validation.repeteadAcronym);
                                context.cancel = true;
                                break;
                            }
                        }
                    }
                }
            }
        });
        me.plugins = [rowEditing];
        
        me.tbar = [
            {
                text: me.messages.buttons.addMessage,
                iconCls: 'add',
                handler: function(){
                    rowEditing.cancelEdit();
                    var row = Ext.create('sisprod.model.ExtractionTypeModel',
                    {
                        extractionTypeName: '',
                        acronym: ''
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
                    var idExtractionType = sm.getSelection()[0].data.idExtractionType;
                    if(idExtractionType !== 0){
                        Ext.Ajax.request({
                            url: 'rest/extractionType/verifyDelete.htm',
                            method: 'POST',
                            params: {idExtractionType: idExtractionType},
                            success: function(response, options){
                                var objResponse = Ext.decode(response.responseText);
                                if(objResponse.success == true){
                                    me.getStore().remove(sm.getSelection());
                                    sm.select(0);
                                }
                                else{
                                    showAlertMessage(objResponse.message);
                                }
                            },
                            failure: function(response, options){}
                        });
                    }
                    else{
                        me.getStore().remove(sm.getSelection());
                        sm.select(0);
                    }
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
            
    getColumnRenderer: function(){
        var renderFunction = function(value, metaData, record, rowIndex, colIndex, store, view){
              return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
        };
        return renderFunction;
    }
});