/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.UserType.ListUserType', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listUserType',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idUserTypeHeader:'User Type ID',
       isDefaultUserTypeHeader: 'Is Default User Type',
       userTypeNameHeader:'User Type'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'User Type List',
   
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
                    idUserType: {header:me.messages.idUserTypeHeader},
                    defaultUserType: {header:me.messages.isDefaultUserTypeHeader},
                    userTypeName: {header:me.messages.userTypeNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});