/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ProductController', {
   extend: 'sisprod.controller.Base',
   stores : ['ProductStore'],
   models : ['ProductModel'],
   entityName: 'Product',
   refs: [{ref: 'listProduct', selector: 'listProduct'}],
   views : ['Product.ListProduct'],
   
   requires: [
       'sisprod.store.ProductStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idProduct'],
       caption: 'productName'
   },
   messages:{
       importTitle : "Product Import",
       importQuestion : "Product Import may last for awhile. Do you want to continue?"
   }, 
   
   init : function(){
        this.control({
           'listProduct button[action=activate]':{
               click: this.activate
           },
           'listProduct button[action=add]':{
               click: this.showAdd
           },
           
           'listProduct button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listProduct dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listProduct button[action=delete]': {
               click: this.destroy
           },
           
           'listProduct button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addProduct button[action=save]': {
               click: this.saveEntity
           },
           
           'updateProduct button[action=save]': {
               click: this.saveEntity
           },
           'listProduct button[action=importProduct]': {
               click: this.importProduct
           },
           'listProduct button[action=importProductState]': {
               click: this.importProductState
           }
       });
       this.callParent(arguments);
    },
          
    getGridForEntity: function(){
        var tabGrid = this.getListProduct();
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
    },
    importProduct : function(button){
        var me = this;
        Ext.Msg.show({
            title: me.messages.importTitle,
            msg: me.messages.importQuestion,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button){
                if(button==="yes"){
                    Ext.getCmp("btnImport" + me.entityName).disable();
                    Ext.getCmp("btnImportState" + me.entityName).enable();
                    Ext.BaseAjax.request({
                        url: 'rest/products/importProductFromErpOracle.htm',
                        method: 'GET',
                        success: function(response, options){
                            var objResponse = Ext.decode(response.responseText);
                            Ext.getCmp("btnImport" + me.entityName).enable();
                            Ext.getCmp("btnImportState" + me.entityName).disable();
                            if(objResponse.success == true){
                                showAlertMessage(objResponse.message);
                                var grid =me.getGridForEntity();
                                var store = grid.getStore();
                                store.reload();
                            } else {
                                showAlertMessage(objResponse.message);
                            }
                        }
                    });
                }
            }
        });
        
    },
    importProductState : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/products/stateImportProductFromErpOracle.htm',
            method: 'GET',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);                
                showAlertMessage(objResponse.message);
                if(objResponse.success == true){
                    Ext.getCmp("btnImport" + me.entityName).enable();
                    Ext.getCmp("btnImportState" + me.entityName).disable();
                    var grid =me.getGridForEntity();
                    var store = grid.getStore();
                    store.reload();
                }
            }
        });
    }
});

