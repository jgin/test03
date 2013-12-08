/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.EquipmentType.ListEquipmentType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   alias: 'widget.listEquipmentType',
   options: {},
   messages:{
        idEquipmentTypeHeader:'ID',
        equipmentTypeNameHeader:'Equipment Type',
        usedInWorkOrderHeader:'Used In Work Order'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Equipment Type List',  
   initComponent: function(){
       var me = this;       
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
           title: me.listTitle,
           entityName: me.entityName,
           topBarButtons : [
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importData,
                    action: 'importEquipmentType',
                    id: 'btnImport' + me.entityName
                }            
           ],
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                   idEquipmentType: {header:me.messages.idEquipmentTypeHeader},
                   equipmentTypeName: {header:me.messages.equipmentTypeNameHeader},
                   usedInWorkOrder: {header:me.messages.usedInWorkOrderHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});