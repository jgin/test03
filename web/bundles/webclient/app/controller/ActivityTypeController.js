/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ActivityTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['ActivityTypeStore'],
   models : ['ActivityTypeModel'],
   entityName: 'ActivityType',
   refs: [{ref: 'listActivityType', selector: 'listActivityType'}],
   views : ['ActivityType.ListActivityType'],
   
   requires: [
       'sisprod.store.ActivityTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idActivityType'],
       caption: 'activityTypeName'
   },
   
   init : function(){
        this.control({
           'listActivityType button[action=add]':{
               click: this.showAdd
           },
           
           'listActivityType button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listActivityType button[action=activate]':{
               click: this.activate
           },
           
           'listActivityType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listActivityType button[action=delete]': {
               click: this.destroy
           },
           
           'listActivityType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addActivityType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateActivityType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListActivityType();
        return tabGrid.getGridPanel();
    }        
});

