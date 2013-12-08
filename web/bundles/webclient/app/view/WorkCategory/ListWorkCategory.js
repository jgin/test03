/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkCategory.ListWorkCategory', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkCategory',
   
   options: {},
   
   entityName: '',
   
   messages: {
       headers: {
           idWorkCategory: 'ID',
           workCategoryName: 'Category Name'
       }
   },
   
   listTitle: 'Work Categories List',
   
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
                    idWorkCategory:{
                        header: me.messages.headers.idWorkCategory
                    },
                    workCategoryName: {
                        header: me.messages.headers.workCategoryName
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});