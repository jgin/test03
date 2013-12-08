Ext.define('sisprod.controller.VerifyActsOrConditionsController', {
    extend: 'sisprod.controller.Base',
    stores: ['VerifyActsOrConditionsStore'],
    models: ['VerifyActsOrConditionsModel'],
    entityName: 'VerifyActsOrConditions',
    refs: [{ref: 'listVerifyActsOrConditions', selector: 'listVerifyActsOrConditions'}],
    views: ['VerifyActsOrConditions.ListVerifyActsOrConditions'],
    requires: [
        'sisprod.store.VerifyActsOrConditionsStore'
    ],
    checkOutPermissions: false,
    messages: {
        confirmText: 'Are you sure to nullify {0}?',
        fileUploadingWaitMessage: 'Uploading file, please wait...'
    },
    init: function() {
        this.control({
            'listVerifyActsOrConditions button[action=add]': {
                click: this.showAdd
            },
            'listVerifyActsOrConditions button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listVerifyActsOrConditions button[action=delete]': {
                click: this.destroy
            },
            'listVerifyActsOrConditions button[action=print]': {
                click: this.showPrint
            },
            'listVerifyActsOrConditions button[action=attachFiles]': {
                click: this.onAttachFileButton
            },
            'updateVerifyActsOrConditions button[id=idVerifyActsOrConditionsSourceAddButton]': {
                click: this.onWorkRequestSourceAddButton
            },
            'updateVerifyActsOrConditions button[id=idEquipmentAddButton]': {
                click: this.onEquipmentAddButton
            },
            'updateVerifyActsOrConditions button[id=idVerifyActsOrConditionsLocationAddButton]': {
                click: this.onLocationAddButton
            },
            'updateVerifyActsOrConditions': {
                close: this.onCloseWindow
            },
            'updateVerifyActsOrConditions button[action=save]': {
                click: this.saveEntity
            },
            'nullifyVerifyActsOrConditions button[action=save]': {
                click: this.releaseNullify
            },
            'updateVerifyActsOrConditions combobox[id=idWorkCategory]': {
                select: this.onSelectWorkCategoy
            },
            'workRequestReferenceFilesWindow button[action=uploadFile]': {
                click: this.onUploadFile
            },
            'workRequestReferenceFilesWindow button[action=removeFile]': {
                click: this.onRemoveFile
            },
            'updateVerifyActsOrConditions combobox[id=idSelectEquipmentType]': {
                select: this.onSelectEquipmentType
            },
            'updateVerifyActsOrConditions checkbox[id=isSubstandardCondition]': {
                change: this.onCheckubstandardCondition
            }
        });
        this.callParent(arguments);
    },
    onCloseWindow: function() {
//        var store = Ext.StoreManager.lookup('workCategoryDetailsStoreGrid');
//        if(Ext.isDefined(store) && store!==null){
//            store.loadData([], false);
//        }
    },
    onWorkRequestSourceAddButton: function() {
        this.showSingleAdditonWindow('WorkRequestSource');
    },
    onEquipmentAddButton: function() {
        this.showSingleAdditonWindow('Equipment');
    },
    onLocationAddButton: function() {
        this.showSingleAdditonWindow('Location');
    },
    onSelectWorkCategoy: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var workCategoryDetail = formPanel.down('#idWorkCategoryDetail');
        workCategoryDetail.clearValue();
        workCategoryDetail.getStore().reload();
    },
    onSelectEquipmentType: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var idEquipment = formPanel.down('#idEquipment');
        idEquipment.clearValue();
        idEquipment.getStore().reload();
    },
    getGridForEntity: function() {
        var tabGrid = this.getListVerifyActsOrConditions();
        return tabGrid.getGridPanel();
    },
    autoMappingFunction: function(grid, window, record) {
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/workRequest/getCompleteById.htm',
            params: {
                idWorkRequest: record.raw.idWorkRequest
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                me.setUpdateFormData(window, data.workRequest, data.substandardWorkRequest);
            }
        });

    },
    setUpdateFormData: function(window, data, substandardWorkRequest) {
        var me = this;
        var formPanel = window.down('form');
        var lotInput = formPanel.queryById('idLot');
        lotInput.setValue(data.lot.idLot);
        var workRequestSourceInput = formPanel.queryById('idWorkRequestSource');
        workRequestSourceInput.setValue(data.workRequestSource.idWorkRequestSource);
        var workCategoryInput = formPanel.queryById('idWorkCategory');
        workCategoryInput.setValue(new Ext.create(sisprod.getApplication().getModelName('WorkCategory'), {
            idWorkCategory: data.workCategoryDetail.workCategory.idWorkCategory,
            workCategoryName: data.workCategoryDetail.workCategory.workCategoryName
        }));
        var workCategoryDetailInput = formPanel.queryById('idWorkCategoryDetail');
        workCategoryDetailInput.setValue(new Ext.create(sisprod.getApplication().getModelName('WorkCategoryDetail'), {
            workCategoryName: data.workCategoryDetail.workCategory.workCategoryName,
            idWorkCategoryDetail: data.workCategoryDetail.idWorkCategoryDetail,
            workCategoryDetailName: data.workCategoryDetail.workCategoryDetailName
        }));
        var equipmentTypeInput = formPanel.queryById('idSelectEquipmentType');
        equipmentTypeInput.setValue(data.equipment.equipmentType.idEquipmentType);
        var equipmentInput = formPanel.queryById('idEquipment');
        equipmentInput.setValue(new Ext.create(sisprod.getApplication().getModelName('EquipmentTemp'), {
            idEquipment: data.equipment.idEquipment,
            equipmentName: data.equipment.equipmentName,
            locationName: data.equipment.location.locationName
        }));
        var applicantInput = formPanel.queryById('idApplicant');
        applicantInput.setValue(new Ext.create(sisprod.getApplication().getModelName('EmployeeTemp'), {
            idEmployee: data.applicant.idEmployee,
            personFullName: data.applicant.person.personFullName,
            fullDocumentNumber: data.applicant.person.fullDocumentNumber
        }));
        var isSubstandardCondition = formPanel.queryById('isSubstandardCondition');
        isSubstandardCondition.setValue(data.isSubstandardCondition);
        if (data.isSubstandardCondition === true) {
            var hsseSupervisor = formPanel.queryById('idHsseSupervisor');
            if(substandardWorkRequest.hsseSupervisor!=null){
                hsseSupervisor.setValue(new Ext.create(sisprod.getApplication().getModelName('HsseSupervisor'), {
                    'idHsseSupervisor': substandardWorkRequest.hsseSupervisor.employee.idEmployee,
                    personFullName: substandardWorkRequest.hsseSupervisor.employee.person.personFullName,
                    fullDocumentNumber: substandardWorkRequest.hsseSupervisor.employee.person.fullDocumentNumber
                }));
            }
            var idSubstandard = formPanel.queryById('idSubstandard');
            idSubstandard.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    idSubstandard.select(substandardWorkRequest.substandard.idSubstandard);
                }
            });
            var substandardConditionActionInput = formPanel.queryById('idSubstandardConditionAction');
            if(Ext.isDefined(substandardWorkRequest.substandardConditionAction) && substandardWorkRequest.substandardConditionAction!==null){
                substandardConditionActionInput.setValue(new Ext.create(sisprod.getApplication().getModelName('SubstandardConditionAction'), {
                    'idSubstandardConditionAction': substandardWorkRequest.substandardConditionAction.idSubstandardConditionAction,
                    'description': substandardWorkRequest.substandardConditionAction.description
                }));
            }
            var inputObs = Ext.getCmp('observations');
            inputObs.setValue(substandardWorkRequest.observations);
            var detectionDate = Ext.getCmp('detectionDate');
            detectionDate.setValue(substandardWorkRequest.detectionDate);
        }
        
        me.setDataInForm(window, data);
    },
    onAttachFileButton: function(button) {
        var me = this;
        var grid = me.getGridForEntity();
        if (grid === undefined || grid === null)
            return;
        var selection = grid.getSelectionModel().getSelection()[0];
        if (!Ext.isDefined(selection)) {
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
        var record = selection.data;
        var window = Ext.create('sisprod.view.WorkRequest.WorkRequestReferenceFilesWindow', {
            data: record
        });
        window.show();
    },
    onUploadFile: function(button) {
        var me = this;
        var formPanel = button.up('form');
        var window = formPanel.up('window');
        var grid = window.down('#referenceFilesGrid');
        var store = grid.getStore();
//        var form = formPanel.getForm();
        if (formPanel.isValid()) {
            formPanel.submit({
                url: 'rest/workRequestReferenceFile/register.htm',
                method: 'POST',
                waitMsg: me.messages.fileUploadingWaitMessage,
                success: function(form, action) {
//                    var responseData = Ext.decode(action.response.responseText);
                    store.reload();
                },
                failure: function(form, action) {
                    var responseData = Ext.decode(action.response.responseText);
                    if (!responseData.success) {
                        Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                    }
                }
            });
        }
    },
    onRemoveFile: function(button) {
        var me = this;
        var grid = button.up('#referenceFilesGrid');
        var record = grid.getSelectionModel().getSelection()[0];
        if (record) {
            var data = record.data;
            Ext.Msg.show({
                title: me.controllerMessages.alertMessage,
                msg: Ext.String.format(me.controllerMessages.deleteRecorConfirmationMessage, data['fileName']),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button) {
                    if (button === "yes") {
                        var idWorkRequestReferenceFile = data['idWorkRequestReferenceFile'];
                        Ext.BaseAjax.request({
                            url: 'rest/workRequestReferenceFile/delete.htm',
                            params: {
                                idWorkRequestReferenceFile: idWorkRequestReferenceFile
                            },
                            success: function(response) {
                                var responseData = Ext.decode(response.responseText);
                                if (responseData.success)
                                    grid.getStore().reload();
                                else {
                                    Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    onCheckubstandardCondition: function(checkbox, newValue, oldValue, eventOptions) {
        var formPanel = Ext.getCmp('ipPanelSubstandard');
        var form = formPanel.up('form');
        var win = form.up('window');
        formPanel.setVisible(newValue);
//        Ext.getCmp('idHsseSupervisor').allowBlank = !newValue;
        Ext.getCmp('detectionDate').allowBlank = !newValue;
        Ext.getCmp('idSubstandard').allowBlank = !newValue;
//        Ext.getCmp('idSubstandardConditionAction').allowBlank = !newValue;
        win.center();
    },
    beforeShowInitialView: function(data, tabPanel, tabId){
        var me = this;
        var result = false;
        Ext.BaseAjax.request({
            url: 'rest/hsseSupervisor/isHsseSupervisor.htm',
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
    
    cancelEdit: function(editor, context, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getLastSelected();
        //
        var originalValues = selection.originalValues,
            idSubstandard = null;
        if(Ext.isDefined(originalValues) && originalValues!==null){
            idSubstandard = originalValues['idSubstandard'];
            if(Ext.isDefined(idSubstandard) && idSubstandard!==null)
                selection.set('idSubstandard', idSubstandard);
        }
    },
    
    onSelectSubstandard: function(combobox, record, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];
        selection.originalValues = {
            idSubstandard: selection.data['idSubstandard']
        };
        selection.set('idSubstandard', record[0].data['idSubstandard']);
    },
    
    afterEdit: function(editor, context, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getLastSelected();
        //
        var gridRecord = selection.data;
        //
        var record = context.record.data;
        //
        var values = {
            idWorkRequest: record['idWorkRequest'],
            isSubstandardCondition: record['isSubstandardCondition'],
            detectionDate: sisprod.getApplication().formatEnglishDate(record['detectionDate']),
            idSubstandard: gridRecord['idSubstandard'],
            idSubstandardConditionAction: record['idSubstandardConditionAction'],
            observations: record['observations']
        };
        Ext.BaseAjax.request({
            url: 'rest/workRequest/updateSubstandardCondition.htm',
            method: 'POST',
            params: values,
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                     var grid = me.getGridForEntity();
                     grid.getStore().reload();
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            }
        });
    },
    
    beforeSaveEntity: function(window, form, values, jsonData) {
        var me = this;
        //
        var singleAddition = Ext.isDefined(window.singleAddition)?window.singleAddition:false;
        if(!form.isValid()) return;        
        var store = me.getStore(sisprod.getApplication().getStoreName(me.entityName));
        var model = me.getModel(sisprod.getApplication().getModelName(me.entityName));
        //
        var idProperty;
        if(Ext.isDefined(model.prototype) && Ext.isDefined(model.prototype.idProperty)){
            idProperty = model.prototype.idProperty;
        } else{
            Ext.Error.raise('No idProperty attribute declared in ' + model.$className +'!');
            return;
        }
        var url;
        if((values[idProperty] !== undefined || Ext.getCmp(idProperty) !== undefined) && (values[idProperty] > 0 || Ext.getCmp(idProperty).getValue() > 0) ){
            url = store.proxy.api.update;
            if(!Ext.isDefined(url)){
                Ext.Error.raise('No proxy:{api:{update}} attribute declared in ' + store.$className +'!');
                return;
            }
        }
        else{
            url = store.proxy.api.create;
            if(!Ext.isDefined(url)){
                Ext.Error.raise('No proxy:{api:{create}} attribute declared in ' + store.$className +'!');
                return;
            }
        }
        //
        values = sisprod.getApplication().getOnlyKeysWithValue(values);
        Ext.BaseAjax.request({
            url: url,
            method: "POST",
            params: values,
            success: function(response, options) {
                if(me.afterReceivingResponse(window, form, response, options)){
                    me.afterSaveEntity(window, form, response, options);
                    store.reload();
                    if(!singleAddition) {
                        var selectionModel = me.getGridForEntity().getSelectionModel();
                        selectionModel.deselectAll();
    //                    me.afterSaveEntity(window, form, response, options);
                    }
                }
            },
            failure: function(response, options){
            }
        });
        return false;
    }
});