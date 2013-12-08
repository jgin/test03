/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.controller.RescheduleWorkRequestController', {
   extend: 'sisprod.controller.Base',
   stores : ['RescheduleWorkRequestStore'],
   models : ['WorkRequestModel'],
   entityName: 'RescheduleWorkRequest',
   checkOutPermissions: false,
   refs: [{ref: 'listRescheduleWorkRequest', selector: 'listRescheduleWorkRequest'}],
   views : ['RescheduleWorkRequest.ListRescheduleWorkRequest'],
   
   requires: [
       'sisprod.store.RescheduleWorkRequestStore'
   ],
   
   messages: {
       confirmText: 'Are you sure you want reschedule {0}?'
   },
   formats: {
        sourceDateFormat: 'Y-m-d',
        targetDateFormat: 'd-m-Y'
   },
   init : function(){
        this.control({
           'listRescheduleWorkRequest button[action=reschedule]':{
               click: this.reschedule
           },
           'listRescheduleWorkRequest button[action=viewDetail]':{
               click: this.showTaskDescription
           },
           'listRescheduleWorkRequest dataview': {
               itemdblclick: this.showTaskDescription
           },
           'rescheduleWorkRequest button[action=save]': {
               click: this.releaseReschedule
           },
           'rescheduleWorkRequest combobox[id=idSector]': {
               select: this.onSelectSector
           },
           'rescheduleWorkRequest combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           'rescheduleWorkRequest combobox[id=idWorkCategoryDetail]': {
               select: this.onSelectWorkCategoryDetail
           },
           'rescheduleWorkRequest': {
               afterrender: this.onAfterRenderRescheduleWorkRequest
           }
       });
       this.callParent(arguments);
    },
    onAfterRenderRescheduleWorkRequest:function(win){        
        var record = win.record;
        if(Ext.isDefined(record.workCategoryDetail) && record.workCategoryDetail!=null){
            var comboWorkCategory = win.down('#idWorkCategory');
            comboWorkCategory.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    comboWorkCategory.select(record.workCategoryDetail.workCategory.idWorkCategory);                      
                }
            });
            var comboWorkCategoryDetail = win.down('#idWorkCategoryDetail');
            comboWorkCategoryDetail.setValue(new Ext.create(sisprod.getApplication().getModelName('WorkCategoryDetail'),{
                idWorkCategoryDetail: record.workCategoryDetail.idWorkCategoryDetail,
                workCategoryDetailName: record.workCategoryDetail.workCategoryDetailName
            }));
            this.onSelectWorkCategoryDetail(comboWorkCategoryDetail,null,null);
        }
        if(Ext.isDefined(record.sector) && record.sector!=null){
            var comboSector = win.down('#idSector');
            comboSector.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    comboSector.select(record.sector.idSector);                      
                }
            });
        }
        if(Ext.isDefined(record.taskScheduler) && record.taskScheduler!=null){
            var comboTaskScheduler = win.down('#idTaskScheduler');
            comboTaskScheduler.setValue(new Ext.create(sisprod.getApplication().getModelName('TaskScheduler'),{
                idTaskScheduler: record.taskScheduler.idTaskScheduler,
                personFullName: record.taskScheduler.employee.person.personFullName,
                fullDocumentNumber:record.taskScheduler.employee.person.fullDocumentNumber
            }));
        }
    },
    onSelectSector:function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var workCategoryDetail = formPanel.down('#idTaskScheduler');
        workCategoryDetail.clearValue();
        workCategoryDetail.getStore().reload();
    },
    onSelectWorkCategory: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var workCategoryDetail = formPanel.down('#idWorkCategoryDetail');
        workCategoryDetail.clearValue();
        workCategoryDetail.getStore().reload();
        var attentionMaximumDate = formPanel.down('#attentionMaximumDate');
        attentionMaximumDate.setValue(new Date());
    },      
    onSelectWorkCategoryDetail: function(combobox, records, event){
        var me = this;
        var formPanel = combobox.up('form');
        var window = formPanel.up('window');
        var idWorkCategoryDetail = formPanel.down('#idWorkCategoryDetail').getValue();
        var comboWorkCategory = formPanel.down('#idWorkCategory');
        Ext.BaseAjax.request({
            url: 'rest/workRequest/computeAttentionMaxDateRespectCurrentDate.htm',
            method: 'POST',
            params: {
                idWorkCategoryDetail: idWorkCategoryDetail
            },
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    var attentionMaxDate = responseData['attentionMaxDate'];
                    var date = Ext.util.Format.date(new Date(attentionMaxDate), me.formats.targetDateFormat);
                    formPanel.down('#attentionMaximumDate').setValue(date);
                }
                else{
                    Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                    comboWorkCategory.reset();
                    combobox.reset();
                    formPanel.down('#attentionMaximumDate').setValue(new Date());
                }
            }
        });
    },
    reschedule: function(button){
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
                url: 'rest/workRequest/checkIsReschedule.htm',
                method: "POST",
                params: {idWorkRequest: idWorkRequest},
                success: function(response){
                    var responseData = Ext.decode(response.responseText);
                    if(Ext.isDefined(responseData.success) && responseData.success === true){
                        if(responseData.result){
                            var rescheduleWindow = Ext.create('sisprod.view.WorkRequest.RescheduleWorkRequest',{
                                record: record
                            });
                            rescheduleWindow.show();
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
   
   releaseReschedule: function(button){
        var me = this;
        var form = button.up('form');
        var formPanel = form.getForm();
        if(formPanel.isValid()){
            var window = button.up('window');
            var store = me.getStore(sisprod.getApplication().getStoreName(me.entityName));
            var values = form.getValues();
            //
            Ext.Msg.show({
                title: me.controllerMessages.confirmText,
                msg: Ext.String.format(me.messages.confirmText, values['workRequestFullNumber']),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button){
                    if(button==="yes"){
                        Ext.BaseAjax.request({
                            url: 'rest/workRequest/reschedule.htm',
                            params: values,
                            success: function(response){
                                var objResponse = Ext.decode(response.responseText);
                                if(Ext.isDefined(objResponse.success) && objResponse.success === true){
                                    if(Ext.isDefined(store) && store !== null) store.reload();
                                    var selectionModel = me.getGridForEntity().getSelectionModel();
                                    selectionModel.deselectAll();
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
        }
   },
   
    getGridForEntity: function(){
        var tabGrid = this.getListRescheduleWorkRequest();
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


