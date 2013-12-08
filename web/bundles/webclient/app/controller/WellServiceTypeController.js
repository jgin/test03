/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellServiceTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellServiceTypeStore'],
   models : ['WellServiceTypeModel'],
   entityName: 'WellServiceType',
   refs: [{ref: 'listWellServiceType', selector: 'listWellServiceType'}],
   views : ['WellServiceType.ListWellServiceType'],
  
   requires: [
       'sisprod.store.WellServiceTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWellServiceType'],
       caption: 'wellServiceTypeName'
   },
   
   init : function(){
        this.control({
            'listWellServiceType button[action=activate]':{
               click: this.activate
           },
           'listWellServiceType button[action=add]':{
               click: this.showAdd
           },
           
           'listWellServiceType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWellServiceType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWellServiceType button[action=delete]': {
               click: this.destroy
           },
           
           'listWellServiceType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWellServiceType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWellServiceType button[action=save]': {
               click: this.saveEntity
           }       
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListWellServiceType();
        return tabGrid.getGridPanel();
    }  
});

