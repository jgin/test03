/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkTemplate.PPEquipmentGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        equipmentTitle:"Equipment-Tool List",
        quantityLabel:'Quantity',
        equipmentLabel:'Equipment-Tool',
        isToolLabel:'Is Tool',
        addButtonText:'Add',
        removeButtonText:'Remove',
        alertCaption: 'Message',
        duplicateEquipmentError: 'This Element has already been added',
        noEquipmentToAddError: 'Select a Equipment',
        noEquipmentSelectToRemoveError: 'Select the Equipment to remove',
        ppEquipmentEmptyText: 'Type an equipment/tool'
    },
    collapsible: true,
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    
    id: 'ppEquipmentGrid',
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.WorkTemplatePPEquipmentModel',
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
        me.title=me.messages.equipmentTitle;
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idPPEquipment',
                flex: 1,
                hidden:true,
                hideable:false
            },            
            {
                text: me.messages.equipmentLabel,
                dataIndex: 'description',
                flex: 5
            },
            {
                text: me.messages.isToolLabel,
                dataIndex: 'isTool',
                flex: 2,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    if(value) metaData.tdCls = 'checked';
                    return '';
                }
            },
            {
                text: me.messages.quantityLabel,
                dataIndex: 'quantity',
                editor:{
                    xtype: 'numberfield',
                    allowBlank: false,
                    allowDecimals:false,
                    minValue: 1
                },
                flex: 1
            }
        ];
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            errorSummary: false,
            listeners:{
//                'canceledit': function(editor, context, options){
//                    if(context.value===""){
//                        var sm = context.grid.getSelectionModel();
//                        context.store.remove(sm.getSelection());
//                        sm.select(0);
//                    }
//                }
            }
        });
        me.plugins = [rowEditing];
//        var store = me.store;     
        me.tbar= [
        {
            xtype: 'sensitivecombocontainer',
            flex:5  ,
            sensitiveComboBoxOptions:{
                id: 'cboPPEquipment',
                fieldLabel:'',
                store: Ext.create('sisprod.store.PPEquipmentTemplate'),
                forceSelection : true,
                displayField:'description',
                emptyText: me.messages.ppEquipmentEmptyText,
                valueField: 'idPPEquipment'            
            }
        },
        {
            xtype: 'tbseparator',
            margin: '0 5 0 5'
        },
        {
            iconCls: 'add',
            id: 'savePPEquipment',
            action: 'savePPEquipment',
            text: me.messages.addButtonText,
            flex:1,
            handler:function(){
                    var combo=Ext.getCmp('cboPPEquipment');
                    var value=Ext.getCmp('cboPPEquipment').getValue();
                    var record = combo.findRecordByValue(value);            
                    if(record){
                        var equipmentGrid;
                        equipmentGrid = Ext.getCmp('ppEquipmentGrid');
                        var store= equipmentGrid.getStore();
                        var pos=store.find('idPPEquipment',value);
                        if(pos<0){
                            var model = Ext.create('sisprod.model.WorkTemplatePPEquipmentModel',{
                                idPPEquipment:value,
                                description:record.raw.description,
                                isTool:record.raw.isTool,
                                quantity:1
                            });
                            me.getStore().insert(me.getStore().getCount(),model);
                            combo.clearValue();
                            rowEditing.startEdit(model, 0);
                        }else{
                            Ext.Msg.alert(me.messages.alertCaption,me.messages.duplicateEquipmentError);                    
                        }
                    }else{
                        Ext.Msg.alert(me.messages.alertCaption,me.messages.noEquipmentToAddError);
                    }    
            }
        }, 
        {
            iconCls: 'remove',
            id: 'removePPEquipment',
            text: me.messages.removeButtonText,
            flex:1,
            handler:function(){
                var grid =Ext.getCmp('ppEquipmentGrid');
                var record=grid.getSelectionModel().getSelection()[0];
                if(Ext.isDefined(record)){
                    var store=grid.getStore();
                    var pos=store.find('idPPEquipment',record.raw.idPPEquipment);            
                    store.removeAt(pos);
                }else{
                    Ext.Msg.alert(me.messages.alertCaption,me.messages.noEquipmentSelectToRemoveError);
                }
            }
        }
    ];
    me.listeners = {
        'selectionchange': function(view, records){
            me.down('#removePPEquipment').setDisabled(!records.length);
        }
    };
    me.callParent(arguments);
    }
});


