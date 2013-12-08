/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.LotController', {
   extend: 'sisprod.controller.Base',
   stores : ['LotStore'],
   models : ['LotModel'],
   entityName: 'Lot',
   refs: [{ref: 'listLot', selector: 'listLot'}],
   views : ['Lot.ListLot'],
   
   requires: [
       'sisprod.store.LotStore'
   ],
   messages:{
        measureUnitTypeAreaError:'The type of measurement unit area is not set , contact the system administrator'
   },
   deleteOptions: {
       deleteKeys: ['idLot'],
       caption: 'lotName'
   },
   
   init : function(){
        this.control({
           'listLot button[action=activate]':{
               click: this.activate
           },
           'listLot button[action=add]':{
               click: this.showAdd
           },
           
           'listLot button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listLot dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listLot button[action=delete]': {
               click: this.destroy
           },
           
           'listLot button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addLot button[action=save]': {
               click: this.saveEntity
           },
           
           'updateLot button[action=save]': {
               click: this.saveEntity
           },
           'addLot,updateLot': {
               afterrender: this.verifyConfigParam
           }
       });
       this.callParent(arguments);
    },
    verifyConfigParam: function(){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/lots/verifyConfigParam.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success == false){
                    Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.measureUnitTypeAreaError);
                }
            },
            failure: function(response, options){
            }
        });
    },        
    getGridForEntity: function(){
        var tabGrid = this.getListLot();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var dateFieldSusc = varForm.query("[name=suscDate]")[0];
        dateFieldSusc.setValue(record.raw.suscriptionDate); 
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

