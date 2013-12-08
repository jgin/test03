/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.MeasureUnitController', {
   extend: 'sisprod.controller.Base',
   stores : ['MeasureUnitStore'],
   models : ['MeasureUnitModel'],
   entityName: 'MeasureUnit',
   refs: [{ref: 'listMeasureUnit', selector: 'listMeasureUnit'}],
   views : ['MeasureUnit.ListMeasureUnit'],
   
   requires: [
       'sisprod.store.MeasureUnitStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idMeasureUnit'],
       caption: 'measureUnitName'
   },
   
   init : function(){
        this.control({
           'listMeasureUnit button[action=add]':{
               click: this.showAdd
           },
           'listMeasureUnit button[action=activate]':{
               click: this.activate
           },
           'listMeasureUnit button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listMeasureUnit dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listMeasureUnit button[action=delete]': {
               click: this.destroy
           },
           
           'listMeasureUnit button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addMeasureUnit button[action=save]': {
               click: this.saveEntity
           },
           
           'updateMeasureUnit button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListMeasureUnit();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, form, record){
        var me = this;
        var formPanel = form.down('form');
        formPanel.loadRecord(record);
        var cmbMeasureUnitType = formPanel.query("[name=idMeasureUnitType]")[0];
        if(Ext.isDefined(cmbMeasureUnitType)){
            if(Ext.isDefined(record.raw.measureUnitType) && Ext.isDefined(record.raw.measureUnitType.idMeasureUnitType))
                cmbMeasureUnitType.select(record.raw.measureUnitType.idMeasureUnitType);
        }
    }
    
});

