/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.RimeCriteriaController', {
   extend: 'sisprod.controller.Base',
   stores : ['RimeCriteriaStore'],
   models : ['RimeCriteriaModel'],
   entityName: 'RimeCriteria',
   refs: [{ref: 'listRimeCriteria', selector: 'listRimeCriteria'}],
   views : ['RimeCriteria.ListRimeCriteria'],
   
   requires: [
       'sisprod.store.RimeCriteriaStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idRimeCriteria'],
       caption: function(data){
           return data['rimeCriteriaName'] + ' ' + data['rimeCriteriaLevel'];
       }
   },
   
   init : function(){
        this.control({
           'listRimeCriteria button[action=activate]':{
               click: this.activate
           },
            
           'listRimeCriteria button[action=add]':{
               click: this.showAdd
           },
           
           'listRimeCriteria button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listRimeCriteria dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listRimeCriteria button[action=delete]': {
               click: this.destroy
           },
           
           'listRimeCriteria button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addRimeCriteria button[action=save]': {
               click: this.saveEntity
           },
           
           'updateRimeCriteria button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListRimeCriteria();
        return tabGrid.getGridPanel();
    }        
});

