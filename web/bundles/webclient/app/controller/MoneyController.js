/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.MoneyController', {
   extend: 'sisprod.controller.Base',
   stores : ['MoneyStore'],
   models : ['MoneyModel'],
   entityName: 'Money',
   refs: [{ref: 'listMoney', selector: 'listMoney'}],
   views : ['Money.ListMoney'],
   
   requires: [
       'sisprod.store.MoneyStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idMoney'],
       caption: 'moneyName'
   },
   
   init : function(){
        this.control({
           'listMoney button[action=add]':{
               click: this.showAdd
           },
           
           'listMoney button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listMoney button[action=activate]':{
               click: this.activate
           },
           
           'listMoney dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listMoney button[action=delete]': {
               click: this.destroy
           },
           
           'listMoney button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addMoney button[action=save]': {
               click: this.saveEntity
           },
           
           'updateMoney button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListMoney();
        return tabGrid.getGridPanel();
    }        
});

