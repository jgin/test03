/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellGroupController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellGroupStore'],
   models : ['WellGroupModel'],
   entityName: 'WellGroup',
   refs: [{ref: 'listWellGroup', selector: 'listWellGroup'}],
   views : ['WellGroup.ListWellGroup'],
   
   requires: [
       'sisprod.store.WellGroupStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWellGroup'],
       caption: function(data){
           return data['wellGroupName'];
       }
   },
   
   init : function(){
        this.control({
           'listWellGroup button[action=activate]':{
               click: this.activate
           },
           
           'listWellGroup button[action=add]':{
               click: this.showAdd
           },
           
           'listWellGroup button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWellGroup dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWellGroup button[action=delete]': {
               click: this.destroy
           },
           
           'listWellGroup button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWellGroup button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWellGroup button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWellGroup();
        return tabGrid.getGridPanel();
    }        
});

