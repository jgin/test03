/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrder.ProductGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        headers: {
            quantity: 'Quantity',
            product: 'Product',
            productCode: 'Code',
            measureUnit: 'Measure Unit',
            idMeasureUnit: 'Measure Unit ID',
            requestNumber: 'Request Nbr',
            productStore: 'Store',
            productPrice: 'Price',
            productStock: 'Stock'
        },
        productTitle: "Product List",
        addButtonText: 'Add',
        removeButtonText: 'Remove',
        alertCaption: 'Message',
        duplicateProductError: 'This Product has already been added',
        noProductToAddError: 'Select a Product',
        noProductSelectToRemoveError: 'Select the Product to remove',
        productEmptyText: 'Type a Product',
        oracleLinkText: 'Go To Oracle ERP',
        oracleWarningText: 'If you are not in GMP offices, you cannot sign in into ERP Oracle'
    },
    collapsible: true,
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'schedulingProductGrid',
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
                text: me.messages.headers.product,
                dataIndex: 'productName',
                flex: 5
            },
            {
                text: me.messages.headers.productCode,
                dataIndex: 'productCode',
                flex: 1.5
            },
            {
                text: me.messages.headers.productStore,
                dataIndex: 'productStore',
                flex: 3
            },
            {
                text: me.messages.headers.productPrice,
                dataIndex: 'productPrice',
                flex: 1.5
            },
            {
                text: me.messages.headers.productStock,
                dataIndex: 'productStock',
                flex: 1.5
            },
            {
                text: me.messages.headers.quantity,
                dataIndex: 'quantity',
                editor:{
                    xtype: 'numberfield',
                    allowBlank: false,
                    allowDecimals: true,
                    decimalPrecision: 2,
                    minValue: 0.09
                },
                flex: 1
            },
            {
                text: me.messages.headers.idMeasureUnit,
                dataIndex: 'idMeasureUnit',
                flex: 1,
                hidden:true,
                hideable:false
            },
            {
                text: me.messages.headers.measureUnit,
                dataIndex: 'measureUnitName',
                flex: 1.5
            },
            {
                text: me.messages.headers.requestNumber,
                dataIndex: 'requestNumber',
                flex: 2,
                editor: {
                    xtype: 'textfield',
                    maxLength: 20
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
                }
            }
        });
        me.plugins = [rowEditing];
//        var store = me.store;     
        me.tbar= [
            {
                xtype: 'sensitivecombocontainer',
                flex: 6,
                sensitiveComboBoxOptions: {
                    name: 'cboProduct',
                    fieldLabel: '',
                    hideTrigger: false,
                    store: Ext.create('sisprod.store.ProductTemplate'),
                    emptyText: me.messages.productEmptyText,
                    id: 'cboProduct',
                    forceSelection : true,
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">','{productName} ({productCode} - {store} - {stock} - {measureUnitName})','</tpl>'),
                    valueField: 'idProduct',
                    listConfig: {
                        getInnerTpl: function() {
                            return "{productName} ({productCode} - {store} - {stock} - {measureUnitName})";
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
                        productGrid = Ext.getCmp('schedulingProductGrid');
                        var store = productGrid.getStore();
                        var pos=store.find('idProduct',value);
                        if(pos<0){
                            var model = Ext.create('sisprod.model.WorkOrderScheduledProductModel',{
                                idProduct: value,
                                productName: record.raw.productName,
                                productCode: record.raw.productCode,
                                idMeasureUnit: record.raw.measureUnit.idMeasureUnit,
                                measureUnitName: record.raw.measureUnit.measureUnitName,
                                quantity: 1,
                                productPrice: record.raw.price,
                                productStore: record.raw.store,
                                productStock: record.raw.stock,
                                productMoney: record.raw.money
                            });
                            var index = store.getCount();
                            store.insert(index, model);
                            combo.clearValue();
                            rowEditing.startEdit(model, index);
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
                    me.getStore().remove(sm.getSelection());
                    sm.select(0);
                }
            }
        ];
        
        me.bbar = [
            {
                id: 'oracleLink',
                iconCls: 'hyperlink',
                text: me.messages.oracleLinkText,
                flex: .8,
                handler: function(){
                    Ext.BaseAjax.request({
                        url: 'rest/configParam/getByConfigParamId.htm',
                        method: 'POST',
                        params: { configParamId: 'OracleERPLink' },
                        success: function(response){
                            var responseData = Ext.decode(response.responseText);
                            if(responseData.success) {
                                var url = responseData.configParam['configParamTextValue'];
                                if(Ext.isDefined(url) && url!==null && Ext.isString(url) && !Ext.isEmpty(url)){
                                    window.open(url, '_blank');
                                }
                            }
                        }
                    });
                }
            },
            {
                xtype: 'tbseparator',
                margin: '0 5 0 5'
            },
            {
                xtype: 'label',
                flex: 4,
                html: Ext.String.format('<p class="alert">(*) {0}.</p>', me.messages.oracleWarningText)
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


