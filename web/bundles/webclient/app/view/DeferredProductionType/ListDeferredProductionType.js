/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DeferredProductionType.ListDeferredProductionType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   alias: 'widget.listDeferredProductionType',
   options: {},
   
   entityName: '',
   
   title: '',
   messages:{
        idDeferredProductionTypeHeader:'ID',
        deferredProductionTypeNameHeader:'Reason Type'
   },
   listTitle: 'DeferredProductionType List',  
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
                   idDeferredProductionType: {header:me.messages.idDeferredProductionTypeHeader},
                   deferredProductionTypeName: {header:me.messages.deferredProductionTypeNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);   
   }
   
});