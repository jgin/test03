/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.AnnullableWorkOrderController', {
   extend: 'sisprod.controller.Base',
   stores : ['AnnullableWorkOrderStore'],
   models : ['WorkOrderModel'],
   entityName: 'AnnullableWorkOrder',
   checkOutPermissions: false,
   refs: [{ref: 'listAnnullableWorkOrder', selector: 'listAnnullableWorkOrder'}],
   views : ['AnnullableWorkOrder.ListAnnullableWorkOrder'],
   
   requires: [
       'sisprod.store.AnnullableWorkOrderStore'
   ],
   
   messages: {
       confirmText: 'Are you sure you want nullify {0}?'
   },
   
   init : function(){
        this.control({
           'listAnnullableWorkOrder button[action=nullify]':{
               click: this.nullify
           },
           'listAnnullableWorkOrder button[action=viewDetail]':{
               click: this.showTaskDescription
           },
           'listAnnullableWorkOrder dataview': {
               itemdblclick: this.showTaskDescription
           },
           'nullifyWorkOrder button[action=save]': {
               click: this.releaseNullify
           }
       });
       this.callParent(arguments);
    },
    
    nullify: function(button){
        var me = this;
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
    	var record = selection.raw;
        var idWorkOrder = record['idWorkOrder'];
        if(Ext.isDefined(idWorkOrder) && idWorkOrder !== null){
            Ext.BaseAjax.request({
                url: 'rest/workOrder/checkIsAnnullable.htm',
                method: "POST",
                params: {idWorkOrder: idWorkOrder},
                success: function(response){
                    var responseData = Ext.decode(response.responseText);
                    if(Ext.isDefined(responseData.success) && responseData.success === true){
                        if(responseData.result){
                            var nullifyWindow = Ext.create('sisprod.view.WorkOrder.NullifyWorkOrder',{
                                record: record
                            });
                            nullifyWindow.show();
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
        }
    },
   
   releaseNullify: function(button){
       var me = this;
       var buttonExt = button;
        var window = button.up('window');
        var form = window.down('form');
        if(!form.isValid()) return;
        var values= form.getValues();
        var store = me.getStore(sisprod.getApplication().getStoreName(me.entityName));
        Ext.Msg.show({
            title: me.controllerMessages.confirmText,
            msg: Ext.String.format(me.messages.confirmText, values['workOrderFullNumber']),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button){
                if(button==="yes"){
                    Ext.BaseAjax.request({
                        url: 'rest/workOrder/nullify.htm',
                        method: "POST",
                        params: values,
                        success: function(response){
                            var objResponse = Ext.decode(response.responseText);
                            if(Ext.isDefined(objResponse.success) && objResponse.success === true){
                                if(Ext.isDefined(store) && store !== null) store.reload();
                                var selectionModel = me.getGridForEntity().getSelectionModel();
                                selectionModel.deselectAll();
                                
                                var arrayResponse = me.getCountWorkOrderNumberForOrderRequest( values['idWorkOrder']);
                                if(arrayResponse.count ===0){
                                    me.releaseNullifyRequest(buttonExt,arrayResponse.workRequest);
                                }else{
                                    window.close();
                                }
                            }
                            else{
                                Ext.MessageBox.show({
                                    title: me.controllerMessages.alertMessage,
                                    msg: objResponse.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.Msg.INFO
                                });
                            }
                        }
                    });
                }
            }
        });
   },
   
    getGridForEntity: function(){
        var tabGrid = this.getListAnnullableWorkOrder();
        return tabGrid.getGridPanel();
    },
            
    showTaskDescription: function(){
        var me = this;
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
    	var record = selection.raw;
        if(!Ext.isDefined(record) || record === null) return;
        var taskDescriptionWindow = Ext.create('sisprod.view.AnnullableWorkOrder.WorkOrderTaskDescription',{
            record: record
        });
        taskDescriptionWindow.show();
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
                iconCls: data.iconCls,
                items: [{xtype:'notauthorizedpanel'}]
            });
            tabPanel.setActiveTab(tab);
        }
        return result;
    },
    getCountWorkOrderNumberForOrderRequest:function(idWorkOrder){
        var me = this;
        var arrayResponse = {};
        Ext.BaseAjax.request({
            url: 'rest/workOrder/getCountWorkOrderNumberForOrderStatusNullify.htm',
            method: 'POST',
            async:false,
            params: {idWorkOrder: idWorkOrder},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    arrayResponse.count=responseData.count;
                    arrayResponse.workRequest=responseData.workRequest;
                }      
            }
        });
        return arrayResponse;
    },
    releaseNullifyRequest: function(button, workRequest){
       var me = this;
        var window = button.up('window');
        var form = window.down('form');
        if(!form.isValid()) return;
        var values= form.getValues();
        var store = me.getStore(sisprod.getApplication().getStoreName(me.entityName));
        Ext.Msg.show({
            title: me.controllerMessages.confirmText,
            msg: Ext.String.format(me.messages.confirmText,workRequest.workRequestFullNumber ),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button){
                if(button==="yes"){
                    var controller  = me.application.getController('sisprod.controller.AnnullableWorkRequestController');
                    var nullifyWindow = Ext.create('sisprod.view.WorkRequest.NullifyWorkRequest',{
                                record: workRequest
                            });
                            window.close();
                            nullifyWindow.show();
                }
            }
        });
   }
});

