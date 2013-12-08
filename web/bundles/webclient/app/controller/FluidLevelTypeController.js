/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.FluidLevelTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['FluidLevelTypeStore'],
   models : ['FluidLevelTypeModel'],
   entityName: 'FluidLevelType',
   checkOutPermissions: false,
   refs: [{ref: 'listFluidLevelType', selector: 'listFluidLevelType'}],
   views : ['FluidLevelType.ListFluidLevelType'],
   
   requires: [
       'sisprod.store.FluidLevelTypeStore'
   ],
   
   messages: {
   },
   
   init : function(){
        this.control({
           'listFluidLevelType button[action=add]': {
               click: this.showAdd
           },
           
           'listFluidLevelType button[action=update]': {
               click: this.showUpdateOnButton
           },
           
           'listFluidLevelType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listFluidLevelType button[action=delete]': {
               click: this.destroy
           },
           
           'listFluidLevelType button[action=print]': {
               click: this.showPrint
           },
           
           'addFluidLevelType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateFluidLevelType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListFluidLevelType();
        return tabGrid.getGridPanel();
    }
});

