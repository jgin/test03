/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkRequestSourceController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkRequestSourceStore'],
   models : ['WorkRequestSourceModel'],
   entityName: 'WorkRequestSource',
   refs: [{ref: 'listWorkRequestSource', selector: 'listWorkRequestSource'}],
   views : ['WorkRequestSource.ListWorkRequestSource'],
   
   requires: [
       'sisprod.store.WorkRequestSourceStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWorkRequestSource'],
       caption: 'workRequestSourceName'
   },
   
   init : function(){
        this.control({
           'listWorkRequestSource button[action=activate]':{
               click: this.activate
           },
            
           'listWorkRequestSource button[action=add]':{
               click: this.showAdd
           },
           
           'listWorkRequestSource button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkRequestSource dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkRequestSource button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkRequestSource button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkRequestSource button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWorkRequestSource button[action=save]': {
               click: this.saveEntity
           },
           
           'addWorkRequestSource, updateWorkRequestSource': {
               close: this.onCloseWindow
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWorkRequestSource();
        return tabGrid.getGridPanel();
    },
            
    onCloseWindow: function(window, options){
//        if(window.singleAddition){
//            var controller = this.application.getController('WorkRequestSourceController');
//            controller.destroy();
//        }
    }
});

