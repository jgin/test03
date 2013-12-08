/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrder.PPEquipmentGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        title: 'Equipment And Tool List',
        ppEquipmentLabel: 'Equipment',
        addButtonText: 'Add',
        removeButtonText: 'Remove',
        alertCaption: 'Message',
        duplicatePPEquipmentError: 'This equipment/tool has already been added',
        noPPEquipmentToAddError: 'Select a equipment/tool',
        ppEquipmentEmptyText: 'Type an equipment/tool',
        headers: {
            ppEquipment: 'Equipment/Tool',
            quantity: 'Quantity',
            isTool: 'Is Tool'
        }
    },
    collapsible: true,
    constructor: function(config){
        var me = this;
        me.callParent([config]);
    },
    id: 'schedulingPPEquipmentGrid',
    store: Ext.create('Ext.data.Store', {
        model: 'sisprod.model.WorkOrderScheduledEquipmentModel',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }),
    height: 200,
    autoScroll:true,
    
    initComponent: function(){
        var me = this;
        me.getStore().removeAll();
        me.title=me.messages.title;
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idPPEquipment',
                flex: 1,
                hidden:true,
                hideable:false
            },
            {
                text: me.messages.headers.ppEquipment,
                dataIndex: 'description',
                flex: 4
            },
            {
                text: me.messages.headers.isTool,
                dataIndex: 'isTool',
                flex: 1,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    if(value) metaData.tdCls = 'checked';
                    return '';
                }
            },
            {
                text: me.messages.headers.quantity,
                dataIndex: 'quantity',
                flex: 2,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 1
                }
            }
        ];
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 2,
            autoCancel: false,
            errorSummary: true,
            listeners:{
                'canceledit': function(editor, context, options){
                    if(context.value===""){
                        var sm = context.grid.getSelectionModel();
                        context.store.remove(sm.getSelection());
                        sm.select(0);
                    }
                }
            }
        });
        me.plugins = [rowEditing];
//        var store = me.store;     
        me.tbar= [
            {
                xtype: 'sensitivecombocontainer',
                flex:5,
                sensitiveComboBoxOptions:{
//                    xtype: 'sensitivecombo',
//                    flex:5,
                    name: 'cboPPEquipment',
                    fieldLabel: '',
                    hideTrigger: false,
                    store: Ext.create('sisprod.store.PPEquipmentTemplate'),
                    emptyText: me.messages.ppEquipmentEmptyText,
                    id: 'cboPPEquipment',
                    forceSelection : true,
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">','{description}','</tpl>'),
                    valueField: 'idPPEquipment',
                    listConfig: {
                        getInnerTpl: function() {
                            return "{description}";
                        }
                    }
                }
            },{
                xtype: 'tbseparator',
                margin: '0 5 0 5'
            },
//            {
//                xtype: 'sensitivecombo',
//                flex:5,
//                name: 'cboPPEquipment',
//                fieldLabel: '',
//                hideTrigger: false,
//                store: Ext.create('sisprod.store.PPEquipmentTemplate'),
//                emptyText: me.messages.ppEquipmentEmptyText,
//                id: 'cboPPEquipment',
//    //            forceSelection : true,
//                displayTpl: Ext.create('Ext.XTemplate',
//                    '<tpl for=".">','{description}','</tpl>'),
//                valueField: 'idPPEquipment',
//                listConfig: {
//                    getInnerTpl: function() {
//                        return "{description}";
//                    }
//                }
//            },
            {
                iconCls: 'add',
//                id: 'savePPEquipment',
                action: 'savePPEquipment',
                text: me.messages.addButtonText,
                flex:1,
                handler:function(){
                    me.onSavePPEquipment(rowEditing);
                }
            }, 
            {
                iconCls: 'remove',
                id: 'remove',
                text: me.messages.removeButtonText,
                flex: 1,
                handler: function(){
                    var sm = me.getSelectionModel();
                    rowEditing.cancelEdit();
                    me.getStore().remove(sm.getSelection());
                    sm.select(0);
                }
            }
        ];
    
        me.listeners = {
            'selectionchange': function(view, records){
                me.down('#remove').setDisabled(!records.length);
            }
        };
        
        me.callParent(arguments);
    },
            
    onSavePPEquipment: function(rowEditing){
        var me = this;
        //
        var combobox = me.down('#cboPPEquipment');
        var value = combobox.getValue();
        var record = combobox.findRecordByValue(value);            
        if(record){
            var store = me.getStore();
            var index = store.find('idPPEquipment', value);
            if(index < 0) {
                var model = Ext.create('sisprod.model.WorkOrderScheduledPPEquipmentModel', {
                    idPPEquipment: value,
                    description: record.data.description,
                    isTool: record.raw.isTool,
                    quantity: 1
                });
                var rowIndex = store.getCount();
                store.insert(rowIndex, model);
                rowEditing.startEdit(model, rowIndex);
            }else{
                Ext.Msg.alert(me.messages.alertCaption,me.messages.duplicatePPEquipmentError);                    
            }
        }else{
            Ext.Msg.alert(me.messages.alertCaption,me.messages.noPPEquipmentToAddError);
        }
    }
});


