/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.BatteryTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['BatteryTypeStore'],
   models : ['BatteryTypeModel'],
   entityName: 'BatteryType',
   refs: [{ref: 'listBatteryType', selector: 'listBatteryType'}],
   views : ['BatteryType.ListBatteryType'],
   
   requires: [
       'sisprod.store.BatteryTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idBatteryType'],
       caption: 'batteryTypeName'
   },
   
   init : function(){
        this.control({
           'listBatteryType button[action=activate]':{
               click: this.activate
           },
           'listBatteryType button[action=add]':{
               click: this.showAdd
           },
           
           'listBatteryType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listBatteryType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listBatteryType button[action=delete]': {
               click: this.destroy
           },
           
           'listBatteryType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addBatteryType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateBatteryType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListBatteryType();
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

