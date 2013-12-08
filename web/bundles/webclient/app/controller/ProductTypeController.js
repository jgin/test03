/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ProductTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['ProductTypeStore'],
   models : ['ProductTypeModel'],
   entityName: 'ProductType',
   refs: [{ref: 'listProductType', selector: 'listProductType'}],
   views : ['ProductType.ListProductType'],
   
   requires: [
       'sisprod.store.ProductTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idProductType'],
       caption: 'productTypeName'
   },
   
   init : function(){
        this.control({
            'listProductType button[action=activate]':{
               click: this.activate
           },
           'listProductType button[action=add]':{
               click: this.showAdd
           },
           
           'listProductType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listProductType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listProductType button[action=delete]': {
               click: this.destroy
           },
           
           'listProductType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addProductType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateProductType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListProductType();
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

