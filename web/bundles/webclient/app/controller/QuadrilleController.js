/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.QuadrilleController', {
   extend: 'sisprod.controller.Base',
   stores : ['QuadrilleStore'],
   models : ['QuadrilleModel'],
   entityName: 'Quadrille',
   refs: [{ref: 'listQuadrille', selector: 'listQuadrille'}],
   views : ['Quadrille.ListQuadrille'],
   
   requires: [
       'sisprod.store.QuadrilleStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idQuadrille'],
       caption: 'quadrilleName'
   },
   
   init : function(){
        this.control({
           'listQuadrille button[action=activate]':{
               click: this.activate
           },
            
           'listQuadrille button[action=add]':{
               click: this.showAdd
           },
           
           'listQuadrille button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listQuadrille dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listQuadrille button[action=delete]': {
               click: this.destroy
           },
           
           'listQuadrille button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addQuadrille button[action=save]': {
               click: this.saveEntity
           },
           
           'updateQuadrille button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListQuadrille();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, form, record){
        var me = this;
        var formPanel = form.down('form');
        formPanel.loadRecord(record);
        var cmbWorkShop = formPanel.query("[name=idWorkShop]")[0];
        if(Ext.isDefined(cmbWorkShop)){
            cmbWorkShop.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    if(Ext.isDefined(record.raw.workShop) && record.raw.workShop!==null){
                        if(Ext.isDefined(record.raw.workShop.idWorkShop) && record.raw.workShop.idWorkShop!==null){
                            cmbWorkShop.select(record.raw.workShop.idWorkShop);
                        }
                    }
                }
            });
        }
    }        
});

