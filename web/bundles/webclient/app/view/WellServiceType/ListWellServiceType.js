/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellServiceType.ListWellServiceType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listWellServiceType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idWellServiceType:'ID',
       wellServiceTypeNameHeader:'Name',
       wellServiceTypeAcronymHeader:'Acronym'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Well Service Type List',
   
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
                    idWellServiceType: {header:me.messages.idWellServiceType},
                    wellServiceTypeName: {header:me.messages.wellServiceTypeNameHeader},
                    wellServiceTypeAcronym: {header:me.messages.wellServiceTypeAcronymHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});