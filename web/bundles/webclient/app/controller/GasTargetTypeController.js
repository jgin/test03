/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.GasTargetTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['GasTargetTypeStore'],
   models : ['GasTargetTypeModel'],
   entityName: 'GasTargetType',
   refs: [{ref: 'listGasTargetType', selector: 'listGasTargetType'}],
   views : ['GasTargetType.ListGasTargetType'],
   
   requires: [
       'sisprod.store.GasTargetTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idGasTargetType'],
       caption: 'gasTargetTypeName'
   },
   
   init : function(){
        this.control({
           'listGasTargetType button[action=activate]':{
               click: this.activate
           },
           'listGasTargetType button[action=add]':{
               click: this.showAdd
           },
           
           'listGasTargetType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listGasTargetType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listGasTargetType button[action=delete]': {
               click: this.destroy
           },
           
           'listGasTargetType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addGasTargetType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateGasTargetType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListGasTargetType();
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

