/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.AnnullableWorkRequestController', {
   extend: 'sisprod.controller.Base',
   stores : ['AnnullableWorkRequestStore'],
   models : ['WorkRequestModel'],
   entityName: 'AnnullableWorkRequest',
   checkOutPermissions: false,
   refs: [{ref: 'listAnnullableWorkRequest', selector: 'listAnnullableWorkRequest'}],
   views : ['AnnullableWorkRequest.ListAnnullableWorkRequest'],
   
   requires: [
       'sisprod.store.AnnullableWorkRequestStore'
   ],
   
   messages: {
       confirmText: 'Are you sure you want nullify {0}?'
   },
   
   init : function(){
        this.control({
           'listAnnullableWorkRequest button[action=nullify]':{
               click: this.nullify
           },
           'listAnnullableWorkRequest button[action=viewDetail]':{
               click: this.showTaskDescription
           },
           'listAnnullableWorkRequest dataview': {
               itemdblclick: this.showTaskDescription
           },
           'nullifyAnnullableWorkRequest button[action=save]': {
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
        var idWorkRequest = record['idWorkRequest'];
        if(Ext.isDefined(idWorkRequest) && idWorkRequest !== null){
            Ext.BaseAjax.request({
                url: 'rest/workRequest/checkIsAnnullable.htm',
                method: "POST",
                params: {idWorkRequest: idWorkRequest},
                success: function(response){
                    var responseData = Ext.decode(response.responseText);
                    if(Ext.isDefined(responseData.success) && responseData.success === true){
                        if(responseData.result){
                            var nullifyWindow = Ext.create('sisprod.view.AnnullableWorkRequest.NullifyWorkRequest',{
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
        var window = button.up('window');
        var form = window.down('form');
        if(!form.isValid()) return;
        var values= form.getValues();
        var store = me.getStore(sisprod.getApplication().getStoreName(me.entityName));
        Ext.Msg.show({
            title: me.controllerMessages.confirmText,
            msg: Ext.String.format(me.messages.confirmText, values['workRequestFullNumber']),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button){
                if(button==="yes"){
                    Ext.BaseAjax.request({
                        url: 'rest/workRequest/nullify.htm',
                        method: "POST",
                        params: values,
                        success: function(response){
                            var objResponse = Ext.decode(response.responseText);
                            if(Ext.isDefined(objResponse.success) && objResponse.success === true){
                                if(Ext.isDefined(store) && store !== null) store.reload();
                                var grid = me.getGridForEntity();
                                if(Ext.isDefined(grid)){
                                    var selectionModel = grid.getSelectionModel();
                                    selectionModel.deselectAll();
                                }
                                window.close();
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
        var tabGrid = this.getListAnnullableWorkRequest();
        if(Ext.isDefined(tabGrid))
            return tabGrid.getGridPanel();
        else return undefined;
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
        var taskDescriptionWindow = Ext.create('sisprod.view.DuplicatedWorkRequest.WorkRequestTaskDescription',{
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
    }
});

