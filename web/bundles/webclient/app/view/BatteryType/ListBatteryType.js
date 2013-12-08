/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.BatteryType.ListBatteryType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listBatteryType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
        idBatteryTypeNameHeader:'Battery Type ID',
        batteryTypeNameHeader:'Battery Type',
        batteryTypeAcronymHeader:'Acronym'
    },
   entityName: '',
   
   title: '',
   
   listTitle: 'Battery Type List',
   
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
                   idBatteryType:{header:me.messages.idBatteryTypeNameHeader},
                    batteryTypeName:{header:me.messages.batteryTypeNameHeader},
                    batteryTypeAcronym:{header:me.messages.batteryTypeAcronymHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});