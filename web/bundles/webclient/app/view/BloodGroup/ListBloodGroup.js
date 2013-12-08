/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.BloodGroup.ListBloodGroup', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listBloodGroup',
   messages: {
        idBloodGroupHeader: 'Blood Group ID',
        bloodGroupNameHeader:'Blood Group'
    },
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Blood Groups List',
   
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
                    idBloodGroup:{header:me.messages.idBloodGroupHeader},
                    bloodGroupName: {header:me.messages.bloodGroupNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});