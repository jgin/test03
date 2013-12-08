/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellStateController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellStateStore'],
   models : ['WellStateModel'],
   entityName: 'WellState',
   refs: [{ref: 'listWellState', selector: 'listWellState'}],
   views : ['WellState.ListWellState'],
   
   requires: [
       'sisprod.store.WellStateStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWellState'],
       caption: function(data){
           return data['wellStateName'];
       }
   },
   
   init : function(){
        this.control({
           'listWellState button[action=activate]':{
               click: this.activate
           },
           
           'listWellState button[action=add]':{
               click: this.showAdd
           },
           
           'listWellState button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWellState dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWellState button[action=delete]': {
               click: this.destroy
           },
           
           'listWellState button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWellState button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWellState button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWellState();
        return tabGrid.getGridPanel();
    }
});

