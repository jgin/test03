/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.MeasureUnitTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['MeasureUnitTypeStore'],
   models : ['MeasureUnitTypeModel'],
   entityName: 'MeasureUnitType',
   refs: [{ref: 'listMeasureUnitType', selector: 'listMeasureUnitType'}],
   views : ['MeasureUnitType.ListMeasureUnitType'],
   
   requires: [
       'sisprod.store.MeasureUnitTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idMeasureUnitType'],
       caption: 'measureUnitTypeName'
   },
   
   init : function(){
        this.control({
           'listMeasureUnitType button[action=add]':{
               click: this.showAdd
           },
           'listMeasureUnitType button[action=activate]':{
               click: this.activate
           },
           
           'listMeasureUnitType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listMeasureUnitType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listMeasureUnitType button[action=delete]': {
               click: this.destroy
           },
           
           'listMeasureUnitType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addMeasureUnitType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateMeasureUnitType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListMeasureUnitType();
        return tabGrid.getGridPanel();
    }        
});

