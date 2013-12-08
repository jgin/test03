/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SystemUserGroupController', {
   extend: 'sisprod.controller.Base',
   stores : ['SystemUserGroupStore'],
   models : ['SystemUserGroupModel'],
   entityName: 'SystemUserGroup',
   refs: [{ref: 'listSystemUserGroup', selector: 'listSystemUserGroup'}],
   views : ['SystemUserGroup.ListSystemUserGroup'],
  
   requires: [
       'sisprod.store.SystemUserGroupStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['id'],
       caption: 'groupName'
   },
   
   init : function(){
        this.control({
            'listSystemUserGroup button[action=activate]':{
               click: this.activate
           },
           'listSystemUserGroup button[action=add]':{
               click: this.showAdd
           },
           
           'listSystemUserGroup button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSystemUserGroup dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSystemUserGroup button[action=delete]': {
               click: this.destroy
           },
           
           'listSystemUserGroup button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addSystemUserGroup button[action=save]': {
               click: this.saveEntity
           },
           
           'updateSystemUserGroup button[action=save]': {
               click: this.saveEntity
           }       
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListSystemUserGroup();
        return tabGrid.getGridPanel();
    }  
});

