/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.BatteryController', {
   extend: 'sisprod.controller.Base',
   stores : ['BatteryStore'],
   models : ['BatteryModel'],
   entityName: 'Battery',
   refs: [{ref: 'listBattery', selector: 'listBattery'}],
   views : ['Battery.ListBattery'],
   
   requires: [
       'sisprod.store.BatteryStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idBattery'],
       caption: 'batteryName'
   },
   
   init : function(){
        this.control({
           'listBattery button[action=activate]':{
               click: this.activate
           },
           'listBattery button[action=add]':{
               click: this.showAdd
           },
           
           'listBattery button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listBattery dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listBattery button[action=delete]': {
               click: this.destroy
           },
           
           'listBattery button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addBattery button[id=idZoneAddButton],updateBattery button[id=idZoneAddButton]':{
               click: this.onZoneAddButton        
           },
           'addBattery button[id=idBatteryTypeAddButton],updateBattery button[id=idBatteryTypeAddButton]':{
               click: this.onBatteryTypeAddButton        
           },
           'addBattery button[action=save]': {
               click: this.verifyConfigParam
           },
           'updateBattery button[action=save]': {
               click: this.verifyConfigParam
           }
       });
       this.callParent(arguments);
    },
    verifyConfigParam: function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/batterys/verifyConfigParam.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success == true){
                    me.saveEntity(button);
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    },        
    getGridForEntity: function(){
        var tabGrid = this.getListBattery();
        return tabGrid.getGridPanel();
    },
    onZoneAddButton:function(){
        this.showSingleAdditonWindow('Zone');
    },
    onBatteryTypeAddButton:function(){
        this.showSingleAdditonWindow('BatteryType');
    },         
            
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboZone = varForm.query("[name=idZone]")[0];
        var cboBatteryType = varForm.query("[name=idBatteryType]")[0];
        
        var idBatteryType = record.raw.batteryType.idBatteryType;        
        var idZone;
        if(record.raw.zone != undefined){
            idZone = record.raw.zone.idZone;            
        }
        
        if(Ext.isDefined(cboZone) && Ext.isDefined(cboBatteryType)){
            cboZone.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboZone.select(idZone);                      
                }
            });
            cboBatteryType.getStore().load({
                       scope: this,
                       callback: function(records, operation, success){
                           cboBatteryType.select(idBatteryType);
                       }
            }); 
        } 
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

