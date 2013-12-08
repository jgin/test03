/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ProductType.ListProductType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listProductType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idProductTypeHeader:'Product Type ID',
       productTypeNameHeader:'Product Type'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Product Type List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idProductType: {header:me.messages.idProductTypeHeader},
                    productTypeName: {header:me.messages.productTypeNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});