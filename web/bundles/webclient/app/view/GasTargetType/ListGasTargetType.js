/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.GasTargetType.ListGasTargetType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   alias: 'widget.listGasTargetType',
   options: {},
   messages:{
       idGasTargetTypeHeader:'Gas Target Type ID',
       gasTargetTypeNameHeader:'Gas Target Type'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Gas Target Type List',  
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
                   idGasTargetType: {header:me.messages.idGasTargetTypeHeader},
                   gasTargetTypeName: {header:me.messages.gasTargetTypeNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});