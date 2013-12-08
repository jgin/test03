/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellTestTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellTestTypeStore'],
   models : ['WellTestTypeModel'],
   entityName: 'WellTestType',
   refs: [{ref: 'listWellTestType', selector: 'listWellTestType'}],
   views : ['WellTestType.ListWellTestType'],
   
   requires: [
       'sisprod.store.WellTestTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWellTestType'],
       caption: function(data){
           return data['wellTestTypeName'];
       }
   },
   
   init : function(){
        this.control({
           'listWellTestType button[action=add]':{
               click: this.showAdd
           },
           
           'listWellTestType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWellTestType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWellTestType button[action=delete]': {
               click: this.destroy
           },
           
           'listWellTestType button[action=activate]': {
               click: this.activate
           },
           
           'addWellTestType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWellTestType button[action=save]': {
               click: this.saveEntity
           },
           
           'listWellTestType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           }           
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWellTestType();
        return tabGrid.getGridPanel();
    }
});

