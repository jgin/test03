/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ToolController', {
   extend: 'sisprod.controller.Base',
   stores : ['ToolStore'],
   models : ['ToolModel'],
   entityName: 'Tool',
   refs: [{ref: 'listTool', selector: 'listTool'}],
   views : ['Tool.ListTool'],
   
   requires: [
       'sisprod.store.ToolStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idTool'],
       caption: 'toolName'
   },
   
   init : function(){
        this.control({
           'listTool button[action=activate]':{
               click: this.activate
           },
           'listTool button[action=add]':{
               click: this.showAdd
           },
           
           'listTool button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listTool dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listTool button[action=delete]': {
               click: this.destroy
           },
           
           'listTool button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addTool button[action=save]': {
               click: this.saveEntity
           },
           
           'updateTool button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
          
    getGridForEntity: function(){
        var tabGrid = this.getListTool();
        return tabGrid.getGridPanel();
    },
    
    afterSaveEntity: function(win, form, response, options){
        response=Ext.JSON.decode(response.responseText);
        if(Ext.isDefined(response.success)){
            if(response.success==false)
                Ext.Msg.alert(this.controllerMessages.alertMessage,response.message);
            else
                win.close();
        }
        else
            win.close();
    }        
});

