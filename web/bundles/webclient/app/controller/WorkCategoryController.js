/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkCategoryController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkCategoryStore'],
   models : ['WorkCategoryModel', 'WorkCategoryDetailModel'],
   entityName: 'WorkCategory',
   refs: [{ref: 'listWorkCategory', selector: 'listWorkCategory'}],
   views : ['WorkCategory.ListWorkCategory'],
   
   requires: [
       'sisprod.store.WorkCategoryStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWorkCategory'],
       caption: 'workCategoryName'
   },
   
   messages: {
       addDetailAlert: 'Add one work category detail at least!'
   },
   
   init : function(){
//        Ext.create('Ext.data.Store',{
//            storeId: 'workCategoryDetailsStoreGrid',
//            model: 'sisprod.model.WorkCategoryDetailModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });       
       
        this.control({
           'listWorkCategory button[action=activate]':{
               click: this.activate
           },
            
           'listWorkCategory button[action=add]':{
               click: this.showAdd
           },
           
           'listWorkCategory button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkCategory dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkCategory button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkCategory button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkCategory': {
               close: this.onCloseWindow
           },
           
           'updateWorkCategory': {
               close: this.onCloseWindow
           },
           
           'addWorkCategory button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWorkCategory button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },

    onCloseWindow: function(){
        var store = Ext.StoreManager.lookup('workCategoryDetailsStoreGrid');
        if(Ext.isDefined(store) && store!==null){
            store.loadData([], false);
        }
    },
           
    getGridForEntity: function(){
        var tabGrid = this.getListWorkCategory();
        return tabGrid.getGridPanel();
    },
            
    beforeSaveEntity: function(window, form, values, jsonData){
        var me = this;
        var grid;
        grid = form.down('#addWorkCategoryDetailsGrid');
        if(!Ext.isDefined(grid) || grid===null) grid = form.down('#updateWorkCategoryDetailsGrid');
        var store = grid.store;
        if(store.getCount()===0){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.addDetailAlert);
            return false;
        }
        else{
            var details = new Array();
            for(var i=0;i<store.getCount();i++){
                var data = store.getAt(i).data;
                if(!Ext.isEmpty(data['workCategoryDetailName'])) details.push(data);
            }
            values.details = Ext.JSON.encode(details);
            return true;
        }
    },
            
    autoMappingFunction: function(grid, window, record){
        var me = this;
        Ext.BaseAjax.request({
            url:'rest/workCategories/getCompleteById.htm',
            params:{
                idWorkCategory: record.raw.idWorkCategory
            },
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                me.setFormData(window, data);
            }
        });
    },
    
    setFormData: function(window, data){
        var me = this;
        var workCategory = data.workCategory;
        var formPanel = window.down('form');
        if(formPanel!==null){
            me.setDataInForm(formPanel, workCategory);
            var grid = formPanel.queryById('updateWorkCategoryDetailsGrid');
            if(grid!==null){
                var store = grid.getStore();
//                store.loadData(data.workCategoryDetails, false);
                //
                store.removeAll();
                Ext.Array.each(data.workCategoryDetails, function(value, index, itself){
                    var model = Ext.create('sisprod.model.WorkCategoryDetailModel',
                    {
                        idWorkCategoryDetail: value['idWorkCategoryDetail'],
                        workCategoryDetailName: value['workCategoryDetailName']
                    });
                    store.insert(store.getCount(), model);
                });
            }
        }
    }
});

