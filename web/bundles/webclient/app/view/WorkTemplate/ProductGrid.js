/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkTemplate.ProductGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        productTitle:"Product List",
        quantityLabel:'Quantity',
        productLabel:'Product',
        productCodeLabel:'Code',
        measureUnitLabel:'Measure Unit',
        priceLabel:'Price',
        stockLabel:'Stock',
        storeLabel:'Store',
        idMeasureUnitLabel:'Measure Unit ID',
        addButtonText:'Add',
        removeButtonText:'Remove',
        alertCaption: 'Message',
        duplicateProductError: 'This Product has already been added',
        noProductToAddError: 'Select a Product',
        noProductSelectToRemoveError: 'Select the Product to remove',
        productEmptyText:'Type a Product'
    },
    collapsible: true,
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'productGrid',
    store: Ext.create('Ext.data.Store',{
        model: 'sisprod.model.WorkTemplateProductModel',
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
                text: me.messages.productCodeLabel,
                dataIndex: 'productCode',
                flex: 2
            },
            {
                text: me.messages.storeLabel,
                dataIndex: 'store',
                flex: 2
            },
            {
                text: me.messages.priceLabel,
                dataIndex: 'price',
                flex: 2
            },
            {
                text: me.messages.stockLabel,
                dataIndex: 'stock',
                flex: 2
            },
            {
                text: me.messages.quantityLabel,
                dataIndex: 'quantity',
                editor:{
                       xtype: 'numberfield',
                       allowBlank: false,
                       allowDecimals:true,
                       decimalPrecision:2,
                       minValue: 1
                },
                flex: 2
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
                dataIndex: 'measureUnit',
                flex: 1.5
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
////                        context.store.remove(sm.getSelection());
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
            flex:6,
            sensitiveComboBoxOptions:{
                name: 'cboProduct',
                fieldLabel: '',
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
            }
        },
        {
            xtype: 'tbseparator',
            margin: '0 5 0 5'
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
                        productGrid = Ext.getCmp('productGrid');
                        var store=productGrid.getStore();
                        var pos=store.find('idProduct',value);
                        if(pos<0){
                            var model = Ext.create('sisprod.model.WorkTemplateProductModel',{
                                idProduct:value,
                                productName:record.raw.productName,
                                productCode:record.raw.productCode,
                                idMeasureUnit:record.raw.measureUnit.idMeasureUnit,
                                measureUnit:record.raw.measureUnit.measureUnitName,
                                quantity: 1,
                                store:record.raw.store,
                                price:record.raw.price,
                                stock:record.raw.stock
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
                var grid =Ext.getCmp('productGrid');
                var record=grid.getSelectionModel().getSelection()[0];
                if(Ext.isDefined(record)){
                    var store=grid.store;
                    var pos=store.find('idProduct',record.raw.idProduct);            
                    store.removeAt(pos);
                }else{
                    Ext.Msg.alert(me.messages.alertCaption,me.messages.noProductSelectToRemoveError);
                }
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
