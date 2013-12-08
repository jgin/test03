/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrderExecution.WorkOrderScheduledProductGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        productTitle:"Scheduled Products",
        quantityLabel:'Scheduled Quantity',
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
        useQuantity: 'Use Quantity',
        isUsed: 'Used',
        productCode: 'Product Code',
        priceLabel:'Price',
        stockLabel:'Stock',
        storeLabel:'Store'
    },
    collapsible: true,
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'workOrderScheduledProductGrid',
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
                dataIndex: 'idWorkOrderScheduledProduct',
                flex: 1,
                hidden:true
            },
            {
                text: 'Id',
                dataIndex: 'idProduct',
                flex: 1,
                hidden:true
            },
            {
                text: me.messages.productLabel,
                dataIndex: 'productName',
                width: 250
            },
            {
                text: me.messages.productCode,
                dataIndex: 'productCode',
                width: 60
            },
            {
                text: me.messages.storeLabel,
                dataIndex: 'productStore',
                flex: 1
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
                text: me.messages.isUsed,
                dataIndex: 'isUsed',
                editor:{
                    xtype: 'checkboxfield',
                    inputValue: true,
                    handler: function(checkbox){
                        var grid = Ext.getCmp('workOrderScheduledProductGrid');
                        var record = grid.getSelectionModel().getSelection()[0];
                        me.usedProduct(checkbox.getValue(), record);
                    }
                },
                width: 60,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                    if(value != undefined){
                        if(value){
                            metaData.tdCls = 'checked';
                        }
                        else{
                            metaData.tdCls = 'fail';
                        }
                    }
                    return '';
                }    
            },
            {
                text: me.messages.quantityLabel,
                dataIndex: 'quantity',
                width: '100'
            },
            {
                text: me.messages.useQuantity,
                dataIndex: 'usedQuantity',
                editor:{
                       xtype: 'numberfield',
                       allowBlank: false,
                       allowDecimals:true,
                       minValue: 1,
                       id: 'editorUsedQuantity',
                       decimalPrecision:2
                },
                width: 100
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
                    if(context.value===""){
                        var sm = context.grid.getSelectionModel();
                        context.store.remove(sm.getSelection());
                        sm.select(0);
                    }
                },
                'beforeedit': function(editor, e, eOpts){
                    var data = e.record.data;
                    if(data.isUsed){
                        me.usedProduct(true, e.record);
                    }
                    else{
                        me.usedProduct(false, e.record);
                    }
                }
            }
        });
        me.plugins = [rowEditing];
        me.callParent(arguments);
    },
    
    usedProduct: function(value, record){
        Ext.getCmp('editorUsedQuantity').setDisabled(!value);
        
        if(!value){
            record.set('usedQuantity', 0);
            Ext.getCmp('editorUsedQuantity').setValue(0);
        }
    }
});


