/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkOrderForCoordinatorController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkOrderByWorkRequestStore', 'WorkOrderForWorkShopCoordinator'],
   models : ['WorkOrderModel'],
   entityName: 'WorkOrderForCoordinator',
   checkOutPermissions: false,
   refs: [{ref: 'listWorkOrderForCoordinator', selector: 'listWorkOrderForCoordinator'}],
   views : ['WorkOrderForCoordinator.ListWorkOrderForCoordinator'],
   
   requires: [
       'sisprod.store.WorkOrderByWorkRequestStore',
       'sisprod.store.WorkOrderForWorkShopCoordinator'
   ],
   messages:{
       workOrderCantNoBeExecute:'This Work Order cant to be execute',
       selectWorkOrder:'Select a Work Order...',
       workOrderNumber: 'Work Order Number'
   },
   init : function(){
        this.control({
            'listWorkOrderForCoordinator button[action=execute]':{
               click: this.executeOrder
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           }
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListWorkOrderForCoordinator();
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
            url: 'rest/workOrder/checkIsExecutable.htm',
            method: "POST",
            params: {idWorkOrder: idWorkOrder},
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    if(responseData.result){
                        var controller  = me.application.getController('sisprod.controller.WorkOrderExecutionController');
                        controller.listStore = me.getStore('WorkOrderForWorkShopCoordinator');
                        var executeForm = Ext.create('sisprod.view.WorkOrderExecution.WorkOrderExecutionForm', {record: record, controller:controller});
                        executeForm.title = executeForm.title + ' (' + record.data.workOrderFullNumber + ')';
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
    isTaskGeneralScheduler:function(){
        var result = false;
         Ext.BaseAjax.request({
            url: 'rest/taskGeneralScheduler/isGeneralTaskScheduler.htm',
            async: false,
            method: "POST",
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    result = responseData.result;
                }else{
                    Ext.MessageBox.show({
                        title: me.controllerMessages.alertMessage,
                        msg: responseData.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            }
        });
        return result;
    },
    beforeShowInitialView: function(data, tabPanel, tabId){
        var me = this;
        var result = false;
        var isWorkShopCoordinator;
        Ext.BaseAjax.request({
            url: 'rest/workShopCoordinator/isWorkShopCoordinator.htm',
            async: false,
            method: "POST",
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    result = responseData.result;
                    if(result===false){
                        result = me.isTaskGeneralScheduler();
                        if(result===true){//es P&P
                            isWorkShopCoordinator=false;
                        }
                    }else{//es coordinador
                        isWorkShopCoordinator=true;
                    }
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
//        else{
//            if(isWorkShopCoordinator)
//                console.log("Es Cordinador");
//            else
//                console.log("Es P&P");
//        }
        return result;
    }
});

