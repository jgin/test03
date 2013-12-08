/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.DirectWorkOrder.ProductGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        productTitle:"Product List",
        quantityLabel:'Quantity',
        productLabel:'Product',
        measureUnitLabel:'Measure Unit',
        idMeasureUnitLabel:'Measure Unit ID',
        addButtonText:'Add',
        removeButtonText:'Remove',
        alertCaption: 'Message',
        duplicateProductError: 'This Product has already been added',
        noProductToAddError: 'Select a Product',
        noProductSelectToRemoveError: 'Select the Product to remove',
        productEmptyText:'Type a Product',
        productCode: 'Code',
        priceLabel:'Price',
        stockLabel:'Stock',
        storeLabel:'Store'
    },
    collapsible: true,
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'directWOProductGrid',
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.WorkOrderScheduledProductModel',
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
        me.title=me.messages.productTitle;
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idProduct',
                flex: 1,
                hidden:true,
                hideable:false
            },
            {
                text: me.messages.productLabel,
                dataIndex: 'productName',
                flex: 5
            },
            {
                text: me.messages.productCode,
                dataIndex: 'productCode',
                width: 60
            },
            {
                text: me.messages.storeLabel,
                dataIndex: 'productStore',
                flex: 2
            },
            {
                text: me.messages.priceLabel,
                dataIndex: 'productPrice',
                width: 60,
                allowDecimals:true
            },
            {
                text: me.messages.stockLabel,
                dataIndex: 'productStock',
                width: 60,
                allowDecimals:true
            },
            {
                text: me.messages.quantityLabel,
                dataIndex: 'quantity',
                editor:{
                       xtype: 'numberfield',
                       allowBlank: false,
                       allowDecimals:true,
                       minValue: 1,
                       decimalPrecision:2
                },
                flex: 1
            },
            {
                text: me.messages.idMeasureUnitLabel,
                dataIndex: 'idMeasureUnit',
                flex: 1,
                hidden:true,
                hideable:false
            },
            {
                text: me.messages.measureUnitLabel,
                dataIndex: 'measureUnitName',
                width: 120
            }
        ];
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            errorSummary: false,
            listeners:{
                'canceledit': function(editor, context, options){
//                    if(context.value===""){
//                        var sm = context.grid.getSelectionModel();
//                        //context.store.remove(sm.getSelection());
//                        sm.select(0);
//                    }
                }
            }
        });
        me.plugins = [rowEditing];
        var store = me.store;     
        me.tbar= [
            {
                xtype: 'sensitivecombo',
                flex:6,
                name: 'cboProduct',
                fieldLabel: '',
                hideTrigger: false,
                store: Ext.create('sisprod.store.ProductTemplate'),
                emptyText: me.messages.productEmptyText,
                id: 'cboProduct',
                forceSelection : true,
                displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">','{productName} ({productCode}-{store}-{stock}-{measureUnitName})','</tpl>'),
                valueField: 'idProduct',
                listConfig: {
                    getInnerTpl: function() {
                        return "{productName} ({productCode}-{store}-{stock}-{measureUnitName})";
                    }
                }
            },
            {
                iconCls: 'add',
                id: 'saveProduct',
                action: 'saveProduct',
                text: me.messages.addButtonText,
                flex:1,
                handler:function(){
                        var combo=Ext.getCmp('cboProduct');
                        var value=Ext.getCmp('cboProduct').getValue();
                        var record = combo.findRecordByValue(value);            
                        if(record){
                            var productGrid;
                            productGrid = Ext.getCmp('directWOProductGrid');
                            var store=productGrid.store;
                            var pos=store.find('idProduct',value);
                            if(pos<0){
                                var model = Ext.create('sisprod.model.WorkOrderScheduledProductModel',{
                                        idProduct:value,
                                        productName:record.raw.productName,
                                        productCode: record.raw.productCode,
                                        productPrice: record.raw.price,
                                        productStock: record.raw.stock,
                                        productStore: record.raw.store,
                                        idMeasureUnit:record.raw.measureUnit.idMeasureUnit,
                                        measureUnitName:record.raw.measureUnit.measureUnitName,
                                        quantity:1
                                });
                                store.insert(store.getCount(),model);
                                combo.clearValue();
                                rowEditing.startEdit(model, 0);
                            }else{
                                Ext.Msg.alert(me.messages.alertCaption,me.messages.duplicateProductError);                    
                            }
                        }else{
                            Ext.Msg.alert(me.messages.alertCaption,me.messages.noProductToAddError);
                        }    
                }
            }, 
            {
                iconCls: 'remove',
                id: 'removeProduct',
                text: me.messages.removeButtonText,
                flex:1,
                handler:function(){
                    var sm = me.getSelectionModel();
                    rowEditing.cancelEdit();
                    //store.remove(sm.getSelection());
                    sm.select(0);
                }
            }
        ];
        
        me.listeners = {
            'selectionchange': function(view, records){
                me.down('#removeProduct').setDisabled(!records.length);
            }
        };
        
        me.callParent(arguments);
    }
});


