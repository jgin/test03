/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DependencyLevel.ListDependencyLevel', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],   
   alias: 'widget.listDependencyLevel',
   
   messages: {
       headers : {
            idDependencyLevel: 'Dependency Level ID ',
            externalId: 'External ID',
            dependencyLevelName: 'Dependency Level'
       }
    },
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Dependency Level List',
   
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
           topBarButtons : [
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importData,
                    action: 'importDependencyLevel',
                    id: 'btnImport' + me.entityName
                }            
           ],
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idDependencyLevel: {header:me.messages.headers.idDependencyLevel},
                    externalId: {hideable: false},
                    dependencyLevelName: {header:me.messages.headers.dependencyLevelName}                    
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});