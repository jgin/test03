
/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.AlternativeTankTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['AlternativeTankTypeStore'],
   models : ['AlternativeTankTypeModel'],
   entityName: 'AlternativeTankType',
   refs: [{ref: 'listAlternativeTankType', selector: 'listAlternativeTankType'}],
   views : ['AlternativeTankType.ListAlternativeTankType'],
   
   requires: [
       'sisprod.store.AlternativeTankTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idAlternativeTankType'],
       caption: 'alternativeTankTypeName'
   },
   
   init : function(){
        this.control({
           
           'listAlternativeTankType button[action=add]':{
               click: this.showAdd
           },
           
           'listAlternativeTankType button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listAlternativeTankType button[action=activate]':{
               click: this.activate
           },
           'listAlternativeTankType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listAlternativeTankType button[action=delete]': {
               click: this.destroy
           },
           
           'listAlternativeTankType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addAlternativeTankType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateAlternativeTankType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListAlternativeTankType();
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

