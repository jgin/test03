/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.DocumentTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['DocumentTypeStore'],
   models : ['DocumentTypeModel'],
   entityName: 'DocumentType',
   refs: [{ref: 'listDocumentType', selector: 'listDocumentType'}],
   views : ['DocumentType.ListDocumentType'],
   
   requires: [
       'sisprod.store.DocumentTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idDocumentType'],
       caption: 'documentTypeName'
   },
   
   init : function(){
        this.control({
           'listDocumentType button[action=add]':{
               click: this.showAdd
           },
           'listDocumentType button[action=activate]':{
               click: this.activate
           },
           
           'listDocumentType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listDocumentType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listDocumentType button[action=delete]': {
               click: this.destroy
           },
           
           'listDocumentType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addDocumentType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateDocumentType button[action=save]': {
               click: this.saveEntity
           },
           'listDocumentType button[action=importDocumentType]': {
               click: this.importDocumentType
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListDocumentType();
        return tabGrid.getGridPanel();
    },    
    importDocumentType : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/documentTypes/importExternalDocumentType.htm',
            method: 'GET',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);                
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
});

