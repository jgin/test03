/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Mark.ListMark', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   alias: 'widget.listMark',
   options: {},
   
   entityName: '',
   
   title: '',
   messages:{
        idMarkHeader:'Mark ID',
        markNameHeader:'Mark'
   },
   listTitle: 'Mark List',  
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
                    action: 'importMark',
                    id: 'btnImport' + me.entityName
                }            
           ],
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                   idMark: {header:me.messages.idMarkHeader},
                   markName: {header:me.messages.markNameHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);   
   }
   
});