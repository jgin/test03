/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ToolTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['ToolTypeStore'],
   models : ['ToolTypeModel'],
   entityName: 'ToolType',
   refs: [{ref: 'listToolType', selector: 'listToolType'}],
   views : ['ToolType.ListToolType'],
   
   requires: [
       'sisprod.store.ToolTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idToolType'],
       caption: 'toolTypeName'
   },
   
   init : function(){
        this.control({
           'listToolType button[action=activate]':{
               click: this.activate
           },
           'listToolType button[action=add]':{
               click: this.showAdd
           },
           
           'listToolType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listToolType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listToolType button[action=delete]': {
               click: this.destroy
           },
           
           'listToolType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addToolType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateToolType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListToolType();
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

