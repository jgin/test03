/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.TankTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['TankTypeStore'],
   models : ['TankTypeModel'],
   entityName: 'TankType',
   refs: [{ref: 'listTankType', selector: 'listTankType'}],
   views : ['TankType.ListTankType'],
   
   requires: [
       'sisprod.store.TankTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idTankType'],
       caption: 'tankTypeName'
   },
   
   init : function(){
        this.control({
           'listTankType button[action=activate]':{
               click: this.activate
           },
           'listTankType button[action=add]':{
               click: this.showAdd
           },
           
           'listTankType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listTankType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listTankType button[action=delete]': {
               click: this.destroy
           },
           
           'listTankType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addTankType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateTankType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListTankType();
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

