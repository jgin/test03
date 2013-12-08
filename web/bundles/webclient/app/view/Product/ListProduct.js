/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Product.ListProduct', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listProduct',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
        idProductHeader: 'Product ID',
        productNameHeader: 'Product Name',
        productCodeHeader: 'Code',
        partNumberHeader: 'Part Number',
        stockHeader: 'Stock',
        priceHeader: 'Price',
        storeHeader: 'Store',
        moneyHeader: 'Unit Money',
        productTypeIdHeader: 'ID Product Type',
        productTypeNameHeader: 'Product Type',
        measureUnitIdHeader: 'ID Measure Unit',
        measureUnitNameHeader: 'Measure Unit'
    },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Product List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
//       me.gridOptions = {};
       
       //
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            topBarButtons : [
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importData,
                    action: 'importProduct',
                    id: 'btnImport' + me.entityName
                },            
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importDataState,
                    action: 'importProductState',
                    id: 'btnImportState' + me.entityName,
                    disabled : true
                }
            ],            
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idProduct: {header:me.messages.idProductHeader},
                    productName: {header:me.messages.productNameHeader},
                    productCode: {header:me.messages.productCodeHeader},
                    partNumber: {header:me.messages.partNumberHeader},
                    stock: {header:me.messages.stockHeader},
                    price: {header:me.messages.priceHeader},
                    store: {header:me.messages.storeHeader},
                    'productType.idProductType':{header: me.messages.productTypeIdHeader,hideable: false},
                    'productType.productTypeName':{header: me.messages.productTypeNameHeader},
                    'money.idMoney':{hideable: false},
                    'money.moneyName':{header: me.messages.moneyNameHeader},
                    'measureUnit.idMeasureUnit':{header: me.messages.measureUnitIdHeader,hideable: false},
                    'measureUnit.measureUnitName':{header: me.messages.measureUnitNameHeader},
                    'measureUnitName':{hideable: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
});