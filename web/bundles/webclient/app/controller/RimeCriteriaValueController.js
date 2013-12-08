/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.RimeCriteriaValueController', {
   extend: 'sisprod.controller.Base',
   stores : ['RimeCriteriaValueStore'],
   models : ['RimeCriteriaValueModel'],
   entityName: 'RimeCriteriaValue',
   refs: [{ref: 'listRimeCriteriaValue', selector: 'listRimeCriteriaValue'}],
   views : ['RimeCriteriaValue.ListRimeCriteriaValue'],
   
   requires: [
       'sisprod.store.RimeCriteriaValueStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idRimeCriteriaValue'],
       caption: function(data){
           return data.rimeCriteria['rimeCriteriaName']+ ' '+ data['effectiveStartDate'];
       }
   },
   
   init : function(){
        this.control({
           'listRimeCriteriaValue button[action=activate]':{
               click: this.activate
           },
            
           'listRimeCriteriaValue button[action=add]':{
               click: this.showAdd
           },
           
           'listRimeCriteriaValue button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listRimeCriteriaValue dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listRimeCriteriaValue button[action=delete]': {
               click: this.destroy
           },
           
           'listRimeCriteriaValue button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addRimeCriteriaValue button[action=save]': {
               click: this.saveEntity
           },
           
           'addRimeCriteriaValue numberfield[name=minimumScore]': {
               change: this.onMinimumScoreChange
           },
           
           'updateRimeCriteriaValue button[action=save]': {
               click: this.saveEntity
           },
           
           'updateRimeCriteriaValue numberfield[name=minimumScore]': {
               change: this.onMinimumScoreChange
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListRimeCriteriaValue();
        return tabGrid.getGridPanel();
    },
            
    onMinimumScoreChange: function(object, newValue, oldValue, options){
        var form = object.up('form');
        if(form!==null){
            var maximumScoreInput = form.queryById('maximumScore');
            if(maximumScoreInput!==null)
                maximumScoreInput.setMinValue(newValue);
        }
    },
    
    autoMappingFunction: function(grid, form, record){
        var me = this;
        var formPanel = form.down('form');
        formPanel.loadRecord(record);
        var cmbRimeCriteria = formPanel.query("[name=idRimeCriteria]")[0];
        if(Ext.isDefined(cmbRimeCriteria)){
            cmbRimeCriteria.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    if(Ext.isDefined(record.raw.rimeCriteria) && record.raw.rimeCriteria!==null){
                        if(Ext.isDefined(record.raw.rimeCriteria.idRimeCriteria) && record.raw.rimeCriteria!==null){
                            cmbRimeCriteria.select(record.raw.rimeCriteria.idRimeCriteria);
    //                        cmbRimeCriteria.select(record.raw.rimeCriteria.idRimeCriteria);
                        }
                    }
                }
            });
        }
    }
});

