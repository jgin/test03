/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.PreSchedulingWorkRequestController', {
   extend: 'sisprod.controller.Base',
   stores : ['PreSchedulingWorkRequestStore'],
   models : ['WorkRequestModel'],
   entityName: 'PreSchedulingWorkRequest',
   checkOutPermissions: false,
   refs: [{ref: 'listPreSchedulingWorkRequest', selector: 'listPreSchedulingWorkRequest'}],
   views : ['PreSchedulingWorkRequest.ListPreSchedulingWorkRequest'],
   
   requires: [
       'sisprod.store.PreSchedulingWorkRequestStore'
   ],
   
   messages: {
       confirmText: 'Are you sure you want pre-schedule {0} work request?'
   },
   formats: {
        sourceDateFormat: 'Y-m-d',
        targetDateFormat: 'd-m-Y'
   },
   
   init : function(){
        this.control({
           'listPreSchedulingWorkRequest button[action=showPreSchedulingWindow]':{
               click: this.showPreSchedulingWindow
           },
           
           'listPreSchedulingWorkRequest dataview': {
               itemdblclick: this.showPreSchedulingWindow
           },
           
           'listPreSchedulingWorkRequest button[action=viewDetail]':{
               click: this.showTaskDescription
           },
           
           'preSchedulingWorkRequest button[action=save]': {
               click: this.savePreScheduling
           },
           'preSchedulingWorkRequest combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           'preSchedulingWorkRequest combobox[id=idWorkCategoryDetail]': {
               select: this.onSelectWorkCategoryDetail
           },
           'preSchedulingWorkRequest combobox[id=idSector]': {
               select: this.onSelectSector
           }
       });
       this.callParent(arguments);
    },
            
    onSelectSector: function(combobox, records, event){
        var formPanel = combobox.up('form');
        var taskScheduler = formPanel.down('#idTaskScheduler');
        taskScheduler.clearValue();
        taskScheduler.getStore().reload();
    },
    onSelectWorkCategory: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var workCategoryDetail = formPanel.down('#idWorkCategoryDetail');
        workCategoryDetail.clearValue();
        workCategoryDetail.getStore().reload();
    },  
            
    onSelectWorkCategoryDetail: function(combobox, records, event){
        var me = this;
        var formPanel = combobox.up('form');
        var window = formPanel.up('window');
        var originalRecord = window.record;
        var idWorkRequest = formPanel.down('#idWorkRequest').getValue();
        var idWorkCategoryDetail = formPanel.down('#idWorkCategoryDetail').getValue();
        var comboWorkCategory = formPanel.down('#idWorkCategory');
        Ext.BaseAjax.request({
            url: 'rest/workRequest/computeAttentionMaxDate.htm',
            method: 'POST',
            params: {
                idWorkRequest: idWorkRequest,
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
                    var originalDate = Ext.util.Format.date(Ext.Date.parse(originalRecord['attentionMaximumDate'], me.formats.sourceDateFormat), me.formats.targetDateFormat);
                    formPanel.down('#attentionMaximumDate').setValue(originalDate);
                }
            }
        });
    },
    
    showPreSchedulingWindow: function(button){
        var me = this;
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
    	var record = selection.raw;
        var window = Ext.create('sisprod.view.PreSchedulingWorkRequest.PreSchedulingWorkRequest',{record: record});
        window.show();
    },
            
    savePreScheduling: function(button){
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
                            url: 'rest/workRequest/preScheduling.htm',
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
        var tabGrid = this.getListPreSchedulingWorkRequest();
        return tabGrid.getGridPanel();
    },
            
    beforeShowInitialView: function(data, tabPanel, tabId){
        var me = this;
        var result = false;
        Ext.BaseAjax.request({
            url: 'rest/taskGeneralScheduler/isGeneralTaskScheduler.htm',
            async: false,
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
    }
});

