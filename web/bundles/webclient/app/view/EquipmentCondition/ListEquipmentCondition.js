/* 
 * To change this tealias: 'widget.listEquipmentCondition',mplate, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.EquipmentCondition.ListEquipmentCondition', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listEquipmentCondition',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idEquipmentConditionHeader:'Equipment Condition ID',
       equipmentConditionNameHeader:'Equipment Condition',
       equipmentConditionAcronymHeader:'Acronym'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Listado de Condiciones de Equipo',
   
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
                    idEquipmentCondition: {header:me.messages.idEquipmentConditionHeader},
                    equipmentConditionName: {header:me.messages.equipmentConditionNameHeader},
                    equipmentConditionAcronym:{header:me.messages.equipmentConditionAcronymHeader}
                }
            },                    
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});