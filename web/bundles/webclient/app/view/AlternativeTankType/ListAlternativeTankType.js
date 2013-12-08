/* 
 * To change this tealias: 'widget.listAlternativeTankType',mplate, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.AlternativeTankType.ListAlternativeTankType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listAlternativeTankType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
        idAlternativeTankTypeHeader:"Alternative Tank Type ID",
        alternativeTankTypeNameHeader:"Alternative Tank Type",
        alternativeTankTypeAcronymHeader:"Acronym"
    },
   entityName: '',
   
   title: '',
   
   listTitle: 'Alternative Tank Type List',
   
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
                    idAlternativeTankType:{header:me.messages.idAlternativeTankTypeHeader},
                    alternativeTankTypeName:{header:me.messages.alternativeTankTypeNameHeader},
                    alternativeTankTypeAcronym:{header:me.messages.alternativeTankTypeAcronymHeader}
                }
            },                    
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});