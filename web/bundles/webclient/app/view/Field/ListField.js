/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Field.ListField', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listField',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idFieldHeader:'Field ID',
       fieldNameHeader:'Field',
       idLotHeader:'Lot ID',
       lotHeader:'Lot'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Field List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       
//       me.gridOptions = {};
       
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idField: { header:me.messages.idFieldHeader},
                    fieldName:{ header:me.messages.fieldNameHeader},
                    'lot.idLot':{ header:me.messages.idLotHeader,hideable:false},
                    'lot.lotName':{ header:me.messages.lotHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});