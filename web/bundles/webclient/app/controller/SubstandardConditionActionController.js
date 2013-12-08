/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SubstandardConditionActionController', {
   extend: 'sisprod.controller.Base',
   stores : ['SubstandardConditionActionStore'],
   models : ['SubstandardConditionActionModel'],
   entityName: 'SubstandardConditionAction',
   refs: [{ref: 'listSubstandardConditionAction', selector: 'listSubstandardConditionAction'}],
   views : ['SubstandardConditionAction.ListSubstandardConditionAction'],
  
   requires: [
       'sisprod.store.SubstandardConditionActionStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idSubstandardConditionAction'],
       caption: 'description'
   },
   
   init : function(){
        this.control({
            'listSubstandardConditionAction button[action=activate]':{
               click: this.activate
           },
           'listSubstandardConditionAction button[action=add]':{
               click: this.showAdd
           },
           
           'listSubstandardConditionAction button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSubstandardConditionAction dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSubstandardConditionAction button[action=delete]': {
               click: this.destroy
           },
           
           'listSubstandardConditionAction button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addSubstandardConditionAction button[action=save]': {
               click: this.saveEntity
           },
           
           'updateSubstandardConditionAction button[action=save]': {
               click: this.saveEntity
           }       
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListSubstandardConditionAction();
        return tabGrid.getGridPanel();
    }  
});

