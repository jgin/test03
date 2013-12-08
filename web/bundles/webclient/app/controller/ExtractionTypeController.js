/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ExtractionTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['ExtractionTypeStore', 'WellTypeByStateAllStore'],
   models : ['ExtractionTypeModel'],
   entityName: 'ExtractionType',
   refs: [{ref: 'listExtractionType', selector: 'listExtractionType'}],
   views : ['ExtractionType.ListExtractionType'],
   
   requires: [
       'sisprod.store.ExtractionTypeStore',
       'sisprod.store.WellTypeByStateAllStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idExtractionType'],
       caption: function(data){
           return data['extractionTypeName'];
       }
   },
   
   init : function(){
        this.control({
           'listExtractionType button[action=activate]':{
               click: this.activate
           },
           
           'listExtractionType button[action=add]':{
               click: this.showAdd
           },
           
           'listExtractionType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listExtractionType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listExtractionType button[action=delete]': {
               click: this.destroy
           },
           
           'listExtractionType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addExtractionType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateExtractionType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListExtractionType();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
    }     
});

