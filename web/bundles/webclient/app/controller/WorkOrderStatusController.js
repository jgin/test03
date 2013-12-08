/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkOrderStatusController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkOrderStatusStore'],
   models : ['WorkOrderStatusModel', 'WorkOrderStatusReasonModel'],
   entityName: 'WorkOrderStatus',
   refs: [{ref: 'listWorkOrderStatus', selector: 'listWorkOrderStatus'}],
   views : ['WorkOrderStatus.ListWorkOrderStatus'],
   
   requires: [
       'sisprod.store.WorkOrderStatusStore'
   ],
   
   messages: {
       addReasonDetails: 'Add one reason at least!'
   },
   
   deleteOptions: {
       deleteKeys: ['idWorkOrderStatus'],
       caption: 'workOrderStatusName'
   },
   
   init : function(){
//        Ext.create('Ext.data.Store',{
//            storeId: 'requestStatusReasonStoreGrid',
//            model: 'sisprod.model.WorkOrderStatusReasonModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });      
       
        this.control({
           'listWorkOrderStatus button[action=activate]':{
               click: this.activate
           },
            
           'listWorkOrderStatus button[action=add]':{
               click: this.showAdd
           },
           
           'listWorkOrderStatus button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkOrderStatus dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkOrderStatus button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkOrderStatus button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkOrderStatus, updateWorkOrderStatus': {
               close: this.onCloseWindow
           },
           
           'addWorkOrderStatus checkboxfield[name=hasCause]': {
               change: this.onChangeHasCause
           },
           
           'addWorkOrderStatus button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWorkOrderStatus checkboxfield[name=hasCause]': {
               change: this.onChangeHasCause
           },
           
           'updateWorkOrderStatus button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },

    getGridForEntity: function(){
        var tabGrid = this.getListWorkOrderStatus();
        return tabGrid.getGridPanel();
    },
            
    onCloseWindow: function(){
        var store = Ext.StoreManager.lookup('requestStatusReasonStoreGrid');
        if(Ext.isDefined(store) && store!==null){
            store.loadData([], false);
        }
    },
           
    onChangeHasCause: function(checkboxfield, newValue, oldValue, options){    
        var me = this;
        var formPanel = checkboxfield.up('form');
        var window = formPanel.up('window');
        if(Ext.isDefined(formPanel) && formPanel!==undefined){
            var grid = formPanel.queryById('addOrderStatusReasonGrid');
            if(!Ext.isDefined(grid) || grid===null) grid = formPanel.queryById('updateOrderStatusReasonGrid');
            if(grid) grid.setVisible(newValue);
            if(window) window.center();
            if(!newValue) me.onCloseWindow();
        }
    },
            
    beforeSaveEntity: function(window, form, values, jsonData){
        var me = this;
        var grid;
        grid = form.down('#addOrderStatusReasonGrid');
        if(!Ext.isDefined(grid) || grid===null) grid = form.down('#updateOrderStatusReasonGrid');
        if(values.hasCause){
            var store = grid.store;
            if(store.getCount()===0){
                Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.addReasonDetails);
                return false;
            }
            else{
                var reasons = new Array();
                for(var i=0;i<store.getCount();i++){
                    reasons.push(store.getAt(i).data);
                }
                values.reasons = Ext.JSON.encode(reasons);
                return true;
            }
        }
        else return true;
    },
            
    autoMappingFunction: function(grid, window, record){
        var me = this;
        Ext.BaseAjax.request({
            url:'rest/workOrderStatus/getCompleteById.htm',
            params:{
                idWorkOrderStatus: record.raw.idWorkOrderStatus
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                me.setFormData(window, data);
            }
        });
    },
    
    setFormData: function(window, data){
        var me = this;
        var workOrderStatus = data.workOrderStatus;
        var formPanel = window.down('form');
        if(formPanel!==null){
            me.setDataInForm(formPanel, workOrderStatus);
            var grid = formPanel.queryById('updateOrderStatusReasonGrid');
            if(grid!==null){
                var store = grid.getStore();
                store.loadData(data.workOrderStatusReasons, false);
            }
        }
    }
});

