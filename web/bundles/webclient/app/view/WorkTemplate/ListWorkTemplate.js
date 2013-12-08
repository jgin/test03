/* 
 * To change this tealias: 'widget.listWorkTemplate',mplate, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkTemplate.ListWorkTemplate', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listWorkTemplate',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
        idWorkTemplateHeader:"Work Template ID",
        workTemplateNameHeader:"Work Template",
        manHoursHeader:"Man Hours",
        machineHoursHeader:"Machine Hour",
        idWorkCategoryDetailHeader:"Work Category Detail ID",
        workCategoryNameHeader:"Work Category",
        workCategoryDetailNameHeader:"Work Type"
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Work Template List',
   
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
                    idWorkTemplate:{header:me.messages.idWorkTemplateHeader},
                    workTemplateName:{header:me.messages.workTemplateNameHeader},
                    manHours:{header:me.messages.manHoursHeader},
                    machineHours:{header:me.messages.machineHoursHeader},
                    'workCategoryDetail.workCategory.idWorkCategory':{hideable:false},
                    'workCategoryDetail.workCategory.workCategoryName':{header:me.messages.workCategoryNameHeader},
                    'workCategoryDetail.idWorkCategoryDetail':{hideable:false},
                    'workCategoryDetail.workCategoryDetailName':{header:me.messages.workCategoryDetailNameHeader}
                }
            },                    
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});