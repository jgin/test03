/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkTemplate.EquipmentGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        equipmentTitle:"Equipment List",
        quantityLabel:'Quantity',
        equipmentLabel:'Equipment',
        addButtonText:'Add',
        removeButtonText:'Remove',
        alertCaption: 'Message',
        duplicateEquipmentError: 'This Equipment has already been added',
        noEquipmentToAddError: 'Select a Equipment',
        noEquipmentSelectToRemoveError: 'Select the Equipment to remove'
    },
    collapsible: true,
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    
    id: 'equipmentGrid',
    store: Ext.StoreManager.lookup('equipmentTypeStoreGrid'),
    height: 200,
    autoScroll:true,
    initComponent: function(){
        var me = this;
        me.title=me.messages.equipmentTitle;
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idEquipmentType',
                flex: 1,
                hidden:true,
                hideable:false
            },
            {
                text: me.messages.equipmentLabel,
                dataIndex: 'equipmentTypeName',
                flex: 5
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
        var store = me.store;     
        me.tbar= [
        {
            xtype: 'combobox',
            id: 'cboEquipment',
            store: Ext.create('sisprod.store.EquipmentTypeForOt'),
            forceSelection : true,
            displayField:'equipmentTypeName',
            valueField: 'idEquipmentType',
            flex:5
        },
        {
            iconCls: 'add',
            id: 'saveEquipment',
            action: 'saveEquipment',
            text: me.messages.addButtonText,
            flex:1,
            handler:function(){
                    var combo=Ext.getCmp('cboEquipment');
                    var value=Ext.getCmp('cboEquipment').getValue();
                    var record = combo.findRecordByValue(value);            
                    if(record){
                        var equipmentGrid;
                        equipmentGrid = Ext.getCmp('equipmentGrid');
                        var store=equipmentGrid.store;
                        var pos=store.find('idEquipmentType',value);
                        if(pos<0){
                            var model = Ext.create('sisprod.model.WorkTemplateEquipmentModel',{
                                    idEquipmentType:value,
                                    equipmentTypeName:record.raw.equipmentTypeName,
                                    quantity:1
                            });
                            store.insert(store.getCount(),model);
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
            id: 'removeEquipment',
            text: me.messages.removeButtonText,
            flex:1,
            handler:function(){
                var grid =Ext.getCmp('equipmentGrid');
                var record=grid.getSelectionModel().getSelection()[0];
                if(Ext.isDefined(record)){
                    var store=grid.store;
                    var pos=store.find('idEquipmentType',record.raw.idEquipmentType);            
                    store.removeAt(pos);
                }else{
                    Ext.Msg.alert(me.messages.alertCaption,me.messages.noEquipmentSelectToRemoveError);
                }
            }
        }
    ];
    me.listeners = {
        'selectionchange': function(view, records){
            me.down('#removeEquipment').setDisabled(!records.length);
        }
    };
    me.callParent(arguments);
    }
});


