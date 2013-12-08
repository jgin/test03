/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.EvidenceDocumentTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['EvidenceDocumentTypeStore'],
   models : ['EvidenceDocumentTypeModel'],
   entityName: 'EvidenceDocumentType',
   refs: [{ref: 'listEvidenceDocumentType', selector: 'listEvidenceDocumentType'}],
   views : ['EvidenceDocumentType.ListEvidenceDocumentType'],
  
   requires: [
       'sisprod.store.EvidenceDocumentTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idEvidenceDocumentType'],
       caption: 'evidenceDocumentTypeName'
   },
   
   init : function(){
        this.control({
            'listEvidenceDocumentType button[action=activate]':{
               click: this.activate
           },
           'listEvidenceDocumentType button[action=add]':{
               click: this.showAdd
           },
           
           'listEvidenceDocumentType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listEvidenceDocumentType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listEvidenceDocumentType button[action=delete]': {
               click: this.destroy
           },
           
           'listEvidenceDocumentType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addEvidenceDocumentType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateEvidenceDocumentType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
    beforeSaveEntity:function(win, form, values){
        if(!Ext.isDefined(values.required)){
            values.required = false;
        }
        return true;
    },        
    getGridForEntity: function(){
        var tabGrid = this.getListEvidenceDocumentType();
        return tabGrid.getGridPanel();
    }  
});

