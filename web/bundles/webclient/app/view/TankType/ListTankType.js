/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.TankType.ListTankType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listTankType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Tank Type List',
   messages:{
        idTankTypeHeader:"Tank Type ID",
        tankTypeNameHeader:"Tank Type",
        tankTypeAcronymHeader:"Acronym"
   },
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
                   idTankType: {header:me.messages.idTankTypeHeader},
                   tankTypeName:{header:me.messages.tankTypeNameHeader},
                   tankTypeAcronym:{header:me.messages.tankTypeAcronymHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});