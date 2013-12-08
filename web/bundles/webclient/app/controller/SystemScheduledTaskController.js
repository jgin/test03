/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SystemScheduledTaskController', {
   extend: 'sisprod.controller.Base',
   stores : ['SystemScheduledTaskStore'],
   models : ['SystemScheduledTaskModel'],
   entityName: 'SystemScheduledTask',
   refs: [{ref: 'listSystemScheduledTask', selector: 'listSystemScheduledTask'}],
   views : ['SystemScheduledTask.ListSystemScheduledTask'],
   
   requires: [
       'sisprod.store.SystemScheduledTaskStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['id'],
       caption: function(data){
           return data['taskDescription'];
       }
   },
   
   init : function(){
        this.control({
           'listSystemScheduledTask button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSystemScheduledTask dataview': {
               itemdblclick: this.showUpdate
           },
           
           'updateSystemScheduledTask button[action=save]': {
               click: this.saveEntity
           }
          
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListSystemScheduledTask();
        return tabGrid.getGridPanel();
    },
    
    beforeSaveEntity: function(win, form, values, jsonData){
        if (values.activeTask===undefined)
            values.activeTask=false;
        return true;
    }
});

