/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SdpReasonController', {
   extend: 'sisprod.controller.Base',
   stores : ['SdpReasonStore'],
   models : ['SdpReasonModel'],
   entityName: 'SdpReason',
   refs: [{ref: 'listSdpReason', selector: 'listSdpReason'}],
   views : ['SdpReason.ListSdpReason'],
  
   requires: [
       'sisprod.store.SdpReasonStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idSdpReason'],
       caption: 'sdpReasonName'
   },
   
   init : function(){
        this.control({
            'listSdpReason button[action=activate]':{
               click: this.activate
           },
           'listSdpReason button[action=add]':{
               click: this.showAdd
           },
           
           'listSdpReason button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSdpReason dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSdpReason button[action=delete]': {
               click: this.destroy
           },
           
           'listSdpReason button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addSdpReason button[action=save]': {
               click: this.saveEntity
           },
           
           'updateSdpReason button[action=save]': {
               click: this.saveEntity
           }       
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListSdpReason();
        return tabGrid.getGridPanel();
    }  
});

