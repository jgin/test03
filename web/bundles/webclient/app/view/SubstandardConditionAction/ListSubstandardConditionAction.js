/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SubstandardConditionAction.ListSubstandardConditionAction', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listSubstandardConditionAction',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idSubstandardConditionActionHeader:'ID',
       substandardConditionActionDescriptionHeader:'Description'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Substandard Condition Action List',
   
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
                    idSubstandardConditionAction: {header:me.messages.idSubstandardConditionActionHeader},
                    description: {header:me.messages.substandardConditionActionDescriptionHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});