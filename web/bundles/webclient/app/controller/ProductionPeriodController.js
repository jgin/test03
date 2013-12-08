/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ProductionPeriodController', {
   extend: 'sisprod.controller.Base',
   stores : ['ProductionPeriodStore'],
   models : ['ProductionPeriodModel'],
   entityName: 'ProductionPeriod',
   refs: [{ref: 'listProductionPeriod', selector: 'listProductionPeriod'}],
   views : ['ProductionPeriod.ListProductionPeriod'],
   
   requires: [
       'sisprod.store.ProductionPeriodStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idProductionPeriod'],
       caption: function(data){
           return data['productionPeriodDate'];
       }
   },
   
   init : function(){
        this.control({
           'listProductionPeriod button[action=add]':{
               click: this.showAdd
           },
           
           'listProductionPeriod button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listProductionPeriod dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listProductionPeriod button[action=delete]': {
               click: this.destroy
           },
           
           'listProductionPeriod button[action=activate]': {
               click: this.activate
           },
           
           'addProductionPeriod button[action=save]': {
               click: this.saveEntity
           },
           
           'updateProductionPeriod button[action=save]': {
               click: this.saveEntity
           },
           
           'listProductionPeriod button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           }          
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListProductionPeriod();
        return tabGrid.getGridPanel();
    },
    
    /**
     * Muestra la fecha de período (fecha de reporte) actual en un campo
     * con formato "d-m-Y" por defecto
     */
    showProductionPeriodDateIn: function(field, format) {
        if (!Ext.isDefined(format)) format="d-m-Y";
        var ppd=Ext.getCmp("envProductionPeriodDate").value;
        field.setValue(Ext.util.Format.date(ppd, 'd-m-Y'));
    },
    
    getEnvProductionPeriodDate: function() {
        return Ext.getCmp("envProductionPeriodDate").value;
    },
    
    getEnvProductionPeriodDateForServer: function() {
        var ppd=Ext.getCmp("envProductionPeriodDate").value;
        return Ext.util.Format.date(ppd, 'Y-m-d');
    },
            
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        
        form.down('[name=productionPeriodDate]').setValue(sisprod.getApplication().formatEnglishDate(record.data.productionPeriodDate));
    }
});

