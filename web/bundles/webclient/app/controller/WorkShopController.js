/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkShopController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkShopStore'],
   models : ['WorkShopModel'],
   entityName: 'WorkShop',
   refs: [{ref: 'listWorkShop', selector: 'listWorkShop'}],
   views : ['WorkShop.ListWorkShop'],
   
   requires: [
       'sisprod.store.WorkShopStore'
   ],
   
   messages: {
       addDetailAlert: 'Add an employee at least!'
   },
   
   deleteOptions: {
       deleteKeys: ['idWorkShop'],
       caption: 'workShopName'
   },
   
   init : function(){
//        Ext.create('Ext.data.Store',{
//            storeId: 'workShopCoordinatorStore',
//            model: 'sisprod.model.WorkShopCoordinatorModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
       
        this.control({
           'listWorkShop button[action=activate]':{
               click: this.activate
           }, 
           
           'listWorkShop button[action=add]':{
               click: this.showAdd
           },
           
           'listWorkShop button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkShop dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkShop button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkShop button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkShop button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWorkShop button[action=save]': {
               click: this.saveEntity
           },
           
           'addWorkShop, updateWorkShop': {
               close: this.onCloseWindow
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWorkShop();
        return tabGrid.getGridPanel();
    },
            
    onCloseWindow: function(){
        var store = Ext.StoreManager.lookup('workShopCoordinatorStore');
        if(Ext.isDefined(store) && store!==null){
            store.removeAll();
        }
    },
            
    beforeSaveEntity: function(window, form, values, jsonData){
        var me = this;
        var grid;
        grid = form.down('#workShopCoordinatorGrid');
        var store = grid.store;
        if(store.getCount()===0){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.addDetailAlert);
            return false;
        }
        else{
            var workShopCoordinatorList = new Array();
            for(var i=0;i<store.getCount();i++){
                workShopCoordinatorList.push(store.getAt(i).data);
            }
            values.workShopCoordinatorList = Ext.encode(workShopCoordinatorList);
            return true;
        }
    },
    
    autoMappingFunction: function(grid, window, record){
        var me = this;
        Ext.BaseAjax.request({
            url:'rest/workShop/getCompleteById.htm',
            params:{
                idWorkShop: record.raw.idWorkShop
            },
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                me.setFormData(window, data);
            }
        });
    },
    
    setFormData: function(window, data){
        var me = this;
        var workShop = data.workShop;
        var formPanel = window.down('form');
        if(formPanel!==null){
            me.setDataInForm(formPanel, workShop);
            formPanel.down("#idSector").setValue(workShop['sector']['idSector']);
            var grid = formPanel.queryById('workShopCoordinatorGrid');
            if(grid!==null){
                var store = grid.getStore();
                var rows = new Array();
                Ext.Array.each(data.workShopCoordinatorList, function(value, index, itself) {
                    if(value){
                        var row = Ext.create('sisprod.model.WorkShopCoordinatorModel',
                        {
                            idWorkShopCoordinator: value['idWorkShopCoordinator'],
                            idEmployee: value['employee']['idEmployee'],
                            personFullName: value['employee']['person']['personFullName'],
                            fullDocumentNumber: value['employee']['person']['fullDocumentNumber']
                        });
                        rows.push(row);
                    }
                });
                store.loadData(rows, false);
            }
        }
    }
    
//    autoMappingFunction: function(grid, form, record){
//        var me = this;
//        var formPanel = form.down('form');
//        formPanel.loadRecord(record);
//        var cmbSector = formPanel.query("[name=idSector]")[0];
//        if(Ext.isDefined(cmbSector)){
//            cmbSector.getStore().load({
//                scope: this,
//                callback: function(records, operation, success){
//                    if(Ext.isDefined(record.raw.sector) && record.raw.sector!==null){
//                        if(Ext.isDefined(record.raw.sector.idSector) && record.raw.sector.idSector!==null){
//                            cmbSector.select(record.raw.sector.idSector);
//                        }
//                    }
//                }
//            });
//        }
//    }
});

