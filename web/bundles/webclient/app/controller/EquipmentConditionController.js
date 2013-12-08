
/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.EquipmentConditionController', {
   extend: 'sisprod.controller.Base',
   stores : ['EquipmentConditionStore'],
   models : ['EquipmentConditionModel'],
   entityName: 'EquipmentCondition',
   refs: [{ref: 'listEquipmentCondition', selector: 'listEquipmentCondition'}],
   views : ['EquipmentCondition.ListEquipmentCondition'],
   
   requires: [
       'sisprod.store.EquipmentConditionStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idEquipmentCondition'],
       caption: 'equipmentConditionName'
   },
   
   init : function(){
        this.control({
           'listEquipmentCondition button[action=activate]':{
               click: this.activate
           },
           'listEquipmentCondition button[action=add]':{
               click: this.showAdd
           },
           
           'listEquipmentCondition button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listEquipmentCondition dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listEquipmentCondition button[action=delete]': {
               click: this.destroy
           },
           
           'listEquipmentCondition button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addEquipmentCondition button[action=save]': {
               click: this.saveEntity
           },
           
           'updateEquipmentCondition button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListEquipmentCondition();
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

