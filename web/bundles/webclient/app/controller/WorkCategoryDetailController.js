/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkCategoryDetailController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkCategoryDetailStore'],
   models : ['WorkCategoryDetailModel'],
   entityName: 'WorkCategoryDetail',
   refs: [{ref: 'listWorkCategoryDetail', selector: 'listWorkCategoryDetail'}],
   views : ['WorkCategoryDetail.ListWorkCategoryDetail'],
   
   requires: [
       'sisprod.store.WorkCategoryDetailStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWorkCategoryDetail'],
       caption: function(data){
           return Ext.String.format('{0} - {1}', data.workCategory['workCategoryName'], data['workCategoryDetailName']);
       }
   },
   
   init : function(){
        this.control({
           'listWorkCategoryDetail button[action=add]':{
               click: this.showAdd
           },
           
           'listWorkCategoryDetail button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkCategoryDetail dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkCategoryDetail button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkCategoryDetail button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkCategoryDetail button[action=save]': {
               click: this.saveEntity
           },
           
           'addWorkCategoryDetail numberfield[name=minimumScore]': {
               change: this.onMinimumScoreChange
           },
           
           'updateWorkCategoryDetail button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWorkCategoryDetail numberfield[name=minimumScore]': {
               change: this.onMinimumScoreChange
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWorkCategoryDetail();
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
        var cmbWorkCategory = formPanel.query("[name=idWorkCategory]")[0];
        if(Ext.isDefined(cmbWorkCategory)){
            cmbWorkCategory.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    if(Ext.isDefined(record.raw.workCategory) && record.raw.workCategory!==null){
                        if(Ext.isDefined(record.raw.workCategory.idWorkCategory) && record.raw.workCategory!==null){
                            cmbWorkCategory.select(record.raw.workCategory.idWorkCategory);
                        }
                    }
                }
            });
        }
    }
});

