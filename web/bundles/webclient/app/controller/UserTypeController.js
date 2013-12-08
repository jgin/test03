/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.UserTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['UserTypeStore'],
   models : ['UserTypeModel'],
   entityName: 'UserType',
   refs: [{ref: 'listUserType', selector: 'listUserType'}],
   views : ['UserType.ListUserType'],
  
   requires: [
       'sisprod.store.UserTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idUserType'],
       caption: 'userTypeName'
   },
   
   init : function(){
        this.control({
            'listUserType button[action=activate]':{
               click: this.activate
           },
           'listUserType button[action=add]':{
               click: this.showAdd
           },
           
           'listUserType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listUserType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listUserType button[action=delete]': {
               click: this.destroy
           },
           
           'listUserType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addUserType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateUserType button[action=save]': {
               click: this.saveEntity
           },
           
           'listUserType button[action=test]': {
               click: function(){
                   var window = Ext.create("sisprod.view.BatteryProduction.AddBatteryProduction");
                   window.show();
               }
           },
//           'addBatteryProduction':{
//               afterrender: this.showInitialMeasureUnits
//           }        
       });
       this.callParent(arguments);
    },
//    showInitialMeasureUnits: function (win) {
//        var me=this;
//        Ext.BaseAjax.request({
//            url: 'rest/configParam/getDefaultMeasureUnits.htm',
//            method: 'POST',
//            success: function(response, options){
//                var objResponse = Ext.decode(response.responseText);
//                if(objResponse.success === true){
//                    Ext.getCmp("oilBatteryProduction").setFieldLabel(Ext.getCmp("oil").getFieldLabel() + " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
//                    Ext.getCmp("gasBatteryProduction").setFieldLabel(Ext.getCmp("gas").getFieldLabel() + " (" + objResponse.defaultMeasureUnit.gas.measureUnitAcronym + ")");
//                    Ext.getCmp("waterBatteryProduction").setFieldLabel(Ext.getCmp("water").getFieldLabel()+ " (" + objResponse.defaultMeasureUnit.water.measureUnitAcronym + ")");
//                }
//                else{
//                    showAlertMessage(objResponse.message);
//                }
//            },
//            failure: function(response, options){
//            }
//        });
//    },
//            
    getGridForEntity: function(){
        var tabGrid = this.getListUserType();
        return tabGrid.getGridPanel();
    }  
});

