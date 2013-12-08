/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.DeferredProductionReasonController', {
   extend: 'sisprod.controller.Base',
   stores : ['DeferredProductionReasonStore'],
   models : ['DeferredProductionReasonModel'],
   entityName: 'DeferredProductionReason',
   refs: [{ref: 'listDeferredProductionReason', selector: 'listDeferredProductionReason'}],
   views : ['DeferredProductionReason.ListDeferredProductionReason'],
   
   requires: [
       'sisprod.store.DeferredProductionReasonStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idDeferredProductionReason'],
       caption: 'deferredProductionReasonName'
   },
   
   init : function(){
        this.control({
           'listDeferredProductionReason button[action=activate]':{
               click: this.activate
           },
           'listDeferredProductionReason button[action=add]':{
               click: this.showAdd
           },
           
           'listDeferredProductionReason button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listDeferredProductionReason dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listDeferredProductionReason button[action=delete]': {
               click: this.destroy
           },
           
           'listDeferredProductionReason button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addDeferredProductionReason button[action=save]': {
               click: this.saveEntity
           },
           
           'updateDeferredProductionReason button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListDeferredProductionReason();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboDeferredProductionType = Ext.getCmp('idDeferredProductionType');
        var idDeferredProductionType=-1;
        if(record.raw.deferredProductionType!=null){
            idDeferredProductionType=record.raw.deferredProductionType.idDeferredProductionType;
        }
        if(Ext.isDefined(cboDeferredProductionType)){
            cboDeferredProductionType.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboDeferredProductionType.select(idDeferredProductionType);
                }
            });
        }
    }      
});

