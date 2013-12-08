/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.DeferredProductionTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['DeferredProductionTypeStore'],
   models : ['DeferredProductionTypeModel'],
   entityName: 'DeferredProductionType',
   refs: [{ref: 'listDeferredProductionType', selector: 'listDeferredProductionType'}],
   views : ['DeferredProductionType.ListDeferredProductionType'],
   
   requires: [
       'sisprod.store.DeferredProductionTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idDeferredProductionType'],
       caption: 'deferredProductionTypeName'
   },
   
   init : function(){
        this.control({
           'listDeferredProductionType button[action=activate]':{
               click: this.activate
           },
           'listDeferredProductionType button[action=add]':{
               click: this.showAdd
           },
           
           'listDeferredProductionType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listDeferredProductionType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listDeferredProductionType button[action=delete]': {
               click: this.destroy
           },
           
           'listDeferredProductionType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addDeferredProductionType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateDeferredProductionType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListDeferredProductionType();
        return tabGrid.getGridPanel();
    }     
});

