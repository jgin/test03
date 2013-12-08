/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Product.UpdateProduct', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateProduct',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        productNameLabel: 'Name',
        productCodeLabel: 'Code',
        partNumberLabel: 'Part Number',
        stockLabel: 'Stock',
        productTypeLabel: 'Product Type',
        measureUnitLabel: 'Measure Unit'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Product',
    modal: true,
    width: 400,
    initComponent: function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idProduct'
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel : me.messages.productTypeLabel,
                labelWidth:150,
                store : Ext.create('sisprod.store.ProductTypeAll').load(),
                displayField : 'productTypeName',
                valueField : 'idProductType',
                name:'productType.idProductType',
                forceSelection : true,
                allowBlank : false,
                editable : false
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel : me.messages.moneyLabel,
                labelWidth:150,
                store : Ext.create('sisprod.store.MoneyAll').load(),
                displayField : 'moneyName',
                valueField : 'idMoney',
                name:'money.idMoney',
                forceSelection : true,
//                allowBlank : false,
                editable : false
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel : me.messages.measureUnitLabel,
                labelWidth:150,
                store : Ext.create('sisprod.store.MeasureUnitAll').load(),
                displayField : 'measureUnitName',
                valueField : 'idMeasureUnit',
                name:'measureUnit.idMeasureUnit',
                forceSelection : true,
                allowBlank : false,
                editable : false
            },
            
            {
                xtype: 'textfield',
                grow: true,
                name: 'productName',
                fieldLabel: me.messages.productNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                maxLength: 200
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'productCode',
                fieldLabel: me.messages.productCodeLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
//                allowBlank: false,
                maxLength: 20
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'partNumber',
                fieldLabel: me.messages.partNumberLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
                maxLength: 20
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'store',
                fieldLabel: me.messages.storeLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:150,
                anchor: '100%',
                maxLength: 255
            },
            {
                xtype: 'numberfield',
                grow: true,
                name: 'stock',
                fieldLabel: me.messages.stockLabel,
                labelWidth:150,
                anchor: '100%',
                allowBlank: false,
                allowDecimals: true,
                decimalPrecision: 2,
                allowNegative: false, 
                minValue:0
            },
            {
                xtype: 'numberfield',
                grow: true,
                name: 'price',
                fieldLabel: me.messages.priceLabel,
                labelWidth:150,
                anchor: '100%',
//                allowBlank: false,
                allowDecimals: true,
                decimalPrecision: 2,
                allowNegative: false, 
                minValue:0
            }      
            
        ]
        };
        me.callParent(arguments);
    }
});
