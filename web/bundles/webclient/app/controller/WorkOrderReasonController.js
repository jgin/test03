/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkOrderReasonController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkOrderReasonStore'],
   models : ['WorkOrderReasonModel'],
   entityName: 'WorkOrderReason',
   refs: [{ref: 'listWorkOrderReason', selector: 'listWorkOrderReason'}],
   views : ['WorkOrderReason.ListWorkOrderReason'],
   
   requires: [
       'sisprod.store.WorkOrderReasonStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWorkOrderReason'],
       caption: 'workOrderReasonName'
   },
   
   init : function(){
        this.control({
           'listWorkOrderReason button[action=activate]':{
               click: this.activate
           },
            
           'listWorkOrderReason button[action=add]':{
               click: this.showAdd
           },
           
           'listWorkOrderReason button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkOrderReason dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkOrderReason button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkOrderReason button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkOrderReason button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWorkOrderReason button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWorkOrderReason();
        return tabGrid.getGridPanel();
    }
});

