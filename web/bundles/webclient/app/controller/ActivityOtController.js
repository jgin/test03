/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ActivityOtController', {
   extend: 'sisprod.controller.Base',
   stores : ['ActivityOtStore'],
   models : ['ActivityOtModel'],
   entityName: 'ActivityOt',
   refs: [{ref: 'listActivityOt', selector: 'listActivityOt'}],
   views : ['ActivityOt.ListActivityOt'],
   
   requires: [
       'sisprod.store.ActivityOtStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idActivityOt'],
       caption: 'description'
   },
   
   init : function(){
        this.control({
           'listActivityOt button[action=add]':{
               click: this.showAdd
           },
           
           'listActivityOt button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listActivityOt button[action=activate]':{
               click: this.activate
           },
           
           'listActivityOt dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listActivityOt button[action=delete]': {
               click: this.destroy
           },
           
           'listActivityOt button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addActivityOt button[action=save]': {
               click: this.saveEntity
           },
           
           'updateActivityOt button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListActivityOt();
        return tabGrid.getGridPanel();
    }        
});

