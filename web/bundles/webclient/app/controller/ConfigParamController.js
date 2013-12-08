/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ConfigParamController', {
   extend: 'Ext.app.Controller',
   //stores : ['ConfigParamStore'],
   //models : ['ConfigParamModel'],
   entityName: 'ConfigParam',
   refs: [{ref: 'addConfigParam', selector: 'addConfigParam'}],
   views : ['ConfigParam.AddConfigParam', 'ConfigParam.AddProductionSystemConfigParam', 'ConfigParam.AddGeneralSystemConfigParam'],   
   /*requires: [
       'sisprod.store.ConfigParamStore'
   ],*/
    beforeShowInitialView: function(data, tabPanel, tabId){
        return true;
    },
    beforeSaveEntity: function(){
        return true;
    },    
    afterSaveEntity: function(window, form, response, options){
        //window.close();
        return true;
    },
    saveEntityPP: function(button){
        this.saveEntity(button, 'rest/configParam/registerPP.htm');
    },
    saveEntityProductionSystem: function(button){
        this.saveEntity(button, 'rest/configParam/registerProductionSystem.htm');
    },
    saveEntityGeneralSystem: function(button){
        this.saveEntity(button, 'rest/configParam/registerGeneralSystem.htm');
    },
    init : function(){
        this.control({
           'addConfigParam button[action=savePP]': {
               click: this.saveEntityPP
           },
           'addProductionSystemConfigParam button[action=saveProductionSystem]': {
               click: this.saveEntityProductionSystem
           },
           'addGeneralSystemConfigParam button[action=saveGeneralSystem]': {
               click: this.saveEntityGeneralSystem
           }
       });
       this.callParent(arguments);
    },
    getConfigParam : function(){
        //var me = Ext.getCmp('paramConfigParamFormPanel');
        var url = "rest/configParam/configParamPP.htm";
        var objResponse = Ext.decode(synchronousRequest(url, "GET").responseText);
        return generatedFormItems(objResponse.configParams, 170);
    },
    getConfigParamProductionSystem : function(){
        //var me = Ext.getCmp('paramConfigParamFormPanel');
        var url = "rest/configParam/configParamProductionSystem.htm";
        var objResponse = Ext.decode(synchronousRequest(url, "GET").responseText);
        return generatedFormItems(objResponse.configParams, 170);
    },
    getConfigParamGeneralSystem : function(){
        //var me = Ext.getCmp('paramConfigParamFormPanel');
        var url = "rest/configParam/configParamGeneralSystem.htm";
        var objResponse = Ext.decode(synchronousRequest(url, "GET").responseText);
        return generatedFormItems(objResponse.configParams, 170);
    },
            
    saveEntity: function(button, url){
        var me = this;
        
        var form = button.up('form');

        if(!form.isValid()) return;
        
        var values= form.getValues();        
        var jsonData = {};
        if(!this.beforeSaveEntity(window, form, values, jsonData)) return;
        
        Ext.BaseAjax.request({
            url: url,
            method: "POST",
            params: values,
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                showAlertMessage(objResponse.message);                
            },
            failure: function(response, options){
            }
        });
    }
});