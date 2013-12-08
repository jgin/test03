/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellTypeByProductionController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellTypeByProductionStore'],
   models : ['WellTypeByProductionModel'],
   entityName: 'WellTypeByProduction',
   refs: [{ref: 'listWellTypeByProduction', selector: 'listWellTypeByProduction'}],
   views : ['WellTypeByProduction.ListWellTypeByProduction'],
   
   requires: [
       'sisprod.store.WellTypeByProductionStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWellTypeByProduction'],
       caption: function(data){
           return data['wellTypeByProductionName'];
       }
   },
   
   init : function(){
        this.control({
           'listWellTypeByProduction button[action=activate]':{
               click: this.activate
           },
           
           'listWellTypeByProduction button[action=add]':{
               click: this.showAdd
           },
           
           'listWellTypeByProduction button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWellTypeByProduction dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWellTypeByProduction button[action=delete]': {
               click: this.destroy
           },
           
           'listWellTypeByProduction button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWellTypeByProduction button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWellTypeByProduction button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWellTypeByProduction();
        return tabGrid.getGridPanel();
    }
});

