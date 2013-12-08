/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.TurnController', {
   extend: 'sisprod.controller.Base',
   stores : ['TurnStore'],
   models : ['TurnModel'],
   entityName: 'Turn',
   refs: [{ref: 'listTurn', selector: 'listTurn'}],
   views : ['Turn.ListTurn'],
   
   requires: [
       'sisprod.store.TurnStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idTurn'],
       caption: 'turnName'
   },
   
   init : function(){
        this.control({
           'listTurn button[action=add]':{
               click: this.showAdd
           },
           
           'listTurn button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listTurn button[action=activate]':{
               click: this.activate
           },
           
           'listTurn dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listTurn button[action=delete]': {
               click: this.destroy
           },
           
           'listTurn button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addTurn button[action=save]': {
               click: this.saveEntity
           },
           
           'updateTurn button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListTurn();
        return tabGrid.getGridPanel();
    }        
});

