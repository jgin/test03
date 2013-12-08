/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.BloodGroupController', {
   extend: 'sisprod.controller.Base',
   stores : ['BloodGroupStore'],
   models : ['BloodGroupModel'],
   entityName: 'BloodGroup',
   refs: [{ref: 'listBloodGroup', selector: 'listBloodGroup'}],
   views : ['BloodGroup.ListBloodGroup'],
   
   requires: [
       'sisprod.store.BloodGroupStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idBloodGroup'],
       caption: 'bloodGroupName'
   },
   
   init : function(){
        this.control({
           'listBloodGroup button[action=add]':{
               click: this.showAdd
           },
           
           'listBloodGroup button[action=activate]':{
               click: this.activate
           },
           
           'listBloodGroup button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listBloodGroup dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listBloodGroup button[action=delete]': {
               click: this.destroy
           },
           
           'listBloodGroup button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addBloodGroup button[action=save]': {
               click: this.saveEntity
           },
           
           'updateBloodGroup button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListBloodGroup();
        return tabGrid.getGridPanel();
    }        
});

