/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.PPEquipment.ListPPEquipment', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listPPEquipment',
   messages: {
        idPPEquipmentHeader: 'ID',
        descriptionHeader: 'Description',
        isToolHeader: 'Is Tool'
    },
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Equipment List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
           title: me.listTitle,
           entityName:me.entityName,
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idPPEquipment:{header:me.messages.idPPEquipmentHeader},
                    description: {header:me.messages.descriptionHeader},
                    isTool: {header:me.messages.isToolHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});