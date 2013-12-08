/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkOrderForTaskGeneralSchedulerController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkOrderByWorkRequestStore'],
   models : ['WorkOrderModel'],
   entityName: 'WorkOrderForTaskGeneralScheduler',
   checkOutPermissions: false,
   refs: [{ref: 'listWorkOrderForTaskGeneralScheduler', selector: 'listWorkOrderForTaskGeneralScheduler'}],
   views : ['WorkOrderForTaskGeneralScheduler.ListWorkOrderForTaskGeneralScheduler'],
   
   requires: [
       'sisprod.store.WorkOrderByWorkRequestStore',
       'sisprod.store.WorkOrderForTaskGeneralSchedulerStore'
   ],
   messages:{
       workOrderCantNoBeExecute:'This Work Order cant to be close',
       selectWorkOrder:'Select a Work Order...',
       workOrderNumber: 'Work Order Number'
   },
   init : function(){
        this.control({
            'listWorkOrderForTaskGeneralScheduler button[action=execute]':{
               click: this.executeOrder
           }
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListWorkOrderForTaskGeneralScheduler();
        return tabGrid.getGridPanel();
    },
            
            
    executeOrder: function(){
        var me =this;
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        var record = grid.getSelectionModel().getSelection()[0];        
        if(Ext.isDefined(record)){
            var idWorkOrder = record.raw.idWorkOrder;
            Ext.BaseAjax.request({
            url: 'rest/workOrder/checkIsClosable.htm',
            method: "POST",
            params: {idWorkOrder: idWorkOrder},
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    if(responseData.result){
                        var listStore = me.getGridForEntity().getStore();
                        var controller  = me.application.getController('sisprod.controller.WorkOrderClosableController');
                        controller.listStore = listStore;
                        var executeForm = Ext.create('sisprod.view.WorkOrderClosable.WorkOrderClosableForm', {record: record, controller:controller});
                        executeForm.show();
                    }else{
                        Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.workOrderCantNoBeExecute);                                                
                    }
                }
                }
            });
        }else{
            Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.selectWorkOrder);
        }
    },
    beforeShowInitialView: function(data, tabPanel, tabId){
        var me = this;
        var result = false;
        Ext.BaseAjax.request({
            url: 'rest/taskGeneralScheduler/isGeneralTaskScheduler.htm',
            async: false,
            method: "POST",
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    result = responseData.result;
                }
                else{
                    Ext.MessageBox.show({
                        title: me.controllerMessages.alertMessage,
                        msg: responseData.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            }
        });
        if(!result){
            var tab = tabPanel.add({
                xtype: 'tabPanelItem',
                title: data.text,
                id: tabId,
                items: [{xtype:'notauthorizedpanel'}]
            });
            tabPanel.setActiveTab(tab);
        }
        return result;
    }
});

