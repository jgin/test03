/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SystemAuditController', {
   extend: 'sisprod.controller.Base',
   stores : ['SystemAuditStore'],
   models : ['SystemAuditModel'],
   entityName: 'SystemAudit',
   refs: [{ref: 'listSystemAudit', selector: 'listSystemAudit'}],
   views : ['SystemAudit.ListSystemAudit'],
   
   requires: [
       'sisprod.store.SystemAuditStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idSystemAudit'],
       caption: 'toolName'
   },
   
   init : function(){
        this.control({
           'listSystemAudit button[action=activate]':{
               click: this.activate
           },
           
           'listSystemAudit dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSystemAudit button[action=print]': {
               click: this.showPrint
           },
           
           'basePrintWindow button[action=print]': {
               click: this.onPrint
           }
       });
       this.callParent(arguments);
    },
          
    getGridForEntity: function(){
        var tabGrid = this.getListSystemAudit();
        return tabGrid.getGridPanel();
    }        
});

