/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ToolType.ListToolType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listToolType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idToolTypeHeader:'Tool Type ID',
       toolTypeNameHeader:'Tool Type'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Tool Type List',
   
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
                    idToolType: {header:me.messages.idToolTypeHeader},
                    toolTypeName: {header:me.messages.toolTypeNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});