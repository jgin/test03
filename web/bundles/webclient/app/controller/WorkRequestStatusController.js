/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkRequestStatusController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkRequestStatusStore'],
   models : ['WorkRequestStatusModel', 'WorkRequestStatusReasonModel'],
   entityName: 'WorkRequestStatus',
   refs: [{ref: 'listWorkRequestStatus', selector: 'listWorkRequestStatus'}],
   views : ['WorkRequestStatus.ListWorkRequestStatus'],
   
   requires: [
       'sisprod.store.WorkRequestStatusStore'
   ],
   
   messages: {
       addReasonDetails: 'Add one reason at least!'
   },
   
   deleteOptions: {
       deleteKeys: ['idWorkRequestStatus'],
       caption: 'workRequestStatusName'
   },
   
   init : function(){
//        Ext.create('Ext.data.Store',{
//            storeId: 'requestStatusReasonStoreGrid',
//            model: 'sisprod.model.WorkRequestStatusReasonModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
       
        this.control({
           'listWorkRequestStatus button[action=activate]':{
               click: this.activate
           },
            
           'listWorkRequestStatus button[action=add]':{
               click: this.showAdd
           },
           
           'listWorkRequestStatus button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkRequestStatus dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkRequestStatus button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkRequestStatus button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkRequestStatus, updateWorkRequestStatus': {
               close: this.onCloseWindow
           },
           
           'addWorkRequestStatus checkboxfield[name=hasCause]': {
               change: this.onChangeHasCause
           },
           
           'addWorkRequestStatus button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWorkRequestStatus checkboxfield[name=hasCause]': {
               change: this.onChangeHasCause
           },
           
           'updateWorkRequestStatus button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },

    getGridForEntity: function(){
        var tabGrid = this.getListWorkRequestStatus();
        return tabGrid.getGridPanel();
    },
            
    onCloseWindow: function(){
//        var store = Ext.StoreManager.lookup('requestStatusReasonStoreGrid');
//        if(Ext.isDefined(store) && store!==null){
//            store.loadData([], false);
//        }
    },
           
    onChangeHasCause: function(checkboxfield, newValue, oldValue, options){    
        var me = this;
        var formPanel = checkboxfield.up('form');
        var window = formPanel.up('window');
        if(Ext.isDefined(formPanel) && formPanel!==undefined){
            var grid = formPanel.queryById('addRequestStatusReasonGrid');
            if(!Ext.isDefined(grid) || grid===null) grid = formPanel.queryById('updateRequestStatusReasonGrid');
            if(grid) grid.setVisible(newValue);
            if(window) window.center();
            if(!newValue) me.onCloseWindow();
        }
    },
            
    beforeSaveEntity: function(window, form, values, jsonData){
        var me = this;
        var grid;
        grid = form.down('#addRequestStatusReasonGrid');
        if(!Ext.isDefined(grid) || grid===null) grid = form.down('#updateRequestStatusReasonGrid');
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
            url:'rest/workRequestStatus/getCompleteById.htm',
            params:{
                idWorkRequestStatus: record.raw.idWorkRequestStatus
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                me.setFormData(window, data);
            }
        });
    },
    
    setFormData: function(window, data){
        var me = this;
        var workRequestStatus = data.workRequestStatus;
        var formPanel = window.down('form');
        if(formPanel!==null){
            me.setDataInForm(formPanel, workRequestStatus);
            var grid = formPanel.queryById('updateRequestStatusReasonGrid');
            if(grid!==null){
                var store = grid.getStore();
//                store.loadData(data.workRequestStatusReasons, false);
                Ext.Array.each(data.workRequestStatusReasons, function(value, index, itself) {
                    var model = Ext.create('sisprod.model.WorkRequestStatusReasonModel',
                    {
                        idWorkRequestStatusReason: value['idWorkRequestStatusReason'],
                        workRequestStatusReasonName: value['workRequestStatusReasonName'],
                        workRequestStatusReasonDescription: value['workRequestStatusReasonDescription']
                    });
                    store.insert(store.getCount(), model);
                });
            }
        }
    }
});

