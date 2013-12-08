/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.UnperformedReasonController', {
   extend: 'sisprod.controller.Base',
   stores : ['UnperformedReasonStore'],
   models : ['UnperformedReasonModel'],
   entityName: 'UnperformedReason',
   refs: [{ref: 'listUnperformedReason', selector: 'listUnperformedReason'}],
   views : ['UnperformedReason.ListUnperformedReason'],
  
   requires: [
       'sisprod.store.UnperformedReasonStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idUnperformedReason'],
       caption: 'unperformedReasonName'
   },
   
   init : function(){
        this.control({
            'listUnperformedReason button[action=activate]':{
               click: this.activate
           },
           'listUnperformedReason button[action=add]':{
               click: this.showAdd
           },
           
           'listUnperformedReason button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listUnperformedReason dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listUnperformedReason button[action=delete]': {
               click: this.destroy
           },
           
           'listUnperformedReason button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addUnperformedReason button[action=save]': {
               click: this.saveEntity
           },
           
           'updateUnperformedReason button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListUnperformedReason();
        return tabGrid.getGridPanel();
    }  
});

