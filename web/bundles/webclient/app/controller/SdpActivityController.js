/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SdpActivityController', {
   extend: 'sisprod.controller.Base',
   stores : ['SdpActivityStore'],
   models : ['SdpActivityModel'],
   entityName: 'SdpActivity',
   refs: [{ref: 'listSdpActivity', selector: 'listSdpActivity'}],
   views : ['SdpActivity.ListSdpActivity'],
  
   requires: [
       'sisprod.store.SdpActivityStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idSdpActivity'],
       caption: 'sdpActivityName'
   },
   
   init : function(){
        this.control({
            'listSdpActivity button[action=activate]':{
               click: this.activate
           },
           'listSdpActivity button[action=add]':{
               click: this.showAdd
           },
           
           'listSdpActivity button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSdpActivity dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSdpActivity button[action=delete]': {
               click: this.destroy
           },
           
           'listSdpActivity button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addSdpActivity button[action=save]': {
               click: this.saveEntity
           },
           
           'updateSdpActivity button[action=save]': {
               click: this.saveEntity
           }       
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListSdpActivity();
        return tabGrid.getGridPanel();
    }  
});

