/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkRequestController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkRequestStore'],
   models : ['WorkRequestModel'],
   entityName: 'WorkRequest',
   refs: [{ref: 'listWorkRequest', selector: 'listWorkRequest'}],
   views : ['WorkRequest.ListWorkRequest'],
   
   requires: [
       'sisprod.store.WorkRequestStore'
   ],
   
   messages: {
       confirmText: 'Are you sure to nullify {0}?',
       fileUploadingWaitMessage: 'Uploading file, please wait...'
   },
   
   init : function(){
        this.control({
           'listWorkRequest button[action=add]':{
               click: this.showAdd
           },
           
           'listWorkRequest button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkRequest dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkRequest button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkRequest button[action=print]': {
               click: this.showPrint
           },
           
           'listWorkRequest button[action=nullify]': {
               click: this.nullify
           },
           
           'listWorkRequest button[action=attachFiles]': {
               click: this.onAttachFileButton
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkRequest button[action=save]': {
               click: this.saveEntity
           },
           
           'addWorkRequest button[id=idWorkRequestSourceAddButton]': {
               click: this.onWorkRequestSourceAddButton
           },
           
           'addWorkRequest button[id=idEquipmentAddButton]': {
               click: this.onEquipmentAddButton
           },
           
           'addWorkRequest button[id=idWorkRequestLocationAddButton]': {
               click: this.onLocationAddButton
           },
           'updateWorkRequest button[id=idWorkRequestSourceAddButton]': {
               click: this.onWorkRequestSourceAddButton
           },
           
           'updateWorkRequest button[id=idEquipmentAddButton]': {
               click: this.onEquipmentAddButton
           },
           
           'updateWorkRequest button[id=idWorkRequestLocationAddButton]': {
               click: this.onLocationAddButton
           },
           
           'addWorkRequest, updateWorkRequest': {
               close: this.onCloseWindow
           },
           
           'updateWorkRequest button[action=save]': {
               click: this.saveEntity
           },
           
           'nullifyWorkRequest button[action=save]': {
               click: this.releaseNullify
           },
           
           'addWorkRequest combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           
           'addWorkRequest checkbox[id=isSubstandardCondition]': {
               change: this.onCheckubstandardCondition
           },
           'updateWorkRequest checkbox[id=isSubstandardCondition]': {
               change: this.onCheckubstandardCondition
           },
           
           'updateWorkRequest combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           
           'addWorkRequest combobox[id=idSelectEquipmentType]': {
               select: this.onSelectEquipmentType
           },
           
           'addWorkRequest combobox[id=idWorkRequestLot]': {
               select: this.onSelectLot
           },
           
           'workRequestReferenceFilesWindow button[action=uploadFile]': {
               click: this.onUploadFile
           },
           
           'workRequestReferenceFilesWindow button[action=removeFile]': {
               click: this.onRemoveFile
           },
           
           'updateWorkRequest combobox[id=idSelectEquipmentType]': {
               select: this.onSelectEquipmentType
           },
           
           'updateWorkRequest combobox[id=idWorkRequestLot]': {
               select: this.onSelectLot
           }
       });
       this.callParent(arguments);
    },
    
    onCloseWindow: function(){
//        var store = Ext.StoreManager.lookup('workCategoryDetailsStoreGrid');
//        if(Ext.isDefined(store) && store!==null){
//            store.loadData([], false);
//        }
    },
    beforeSaveEntity:function(win, form, values){
        var isSubstandardCondition = Ext.getCmp("isSubstandardCondition").getValue();
        if(isSubstandardCondition==false){
            values.isSubstandardCondition=false;
//            values.idHsseSupervisor=-1;
            values.idSubstandard=-1;
            values.idSubstandardConditionAction=-1;
        }
        return true;
    },
    onWorkRequestSourceAddButton: function(){
        this.showSingleAdditonWindow('WorkRequestSource');
    },
    
    onEquipmentAddButton: function(){
        this.showSingleAdditonWindow('Equipment');
    },
    
    onLocationAddButton: function(){
        this.showSingleAdditonWindow('Location');
    },
    
    onSelectWorkCategory: function(combobox, records, event) {
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
    
    onSelectLot: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var idEquipment = formPanel.down('#idEquipment');
        idEquipment.clearValue();
        idEquipment.getStore().reload();
    },

    nullify: function(button){
        var me = this;
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)){
            Ext.Msg.alert(me.controllerMessages.deleteText, me.controllerMessages.selectRecordMessage);
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
                            var nullifyWindow = Ext.create('sisprod.view.WorkRequest.NullifyWorkRequest',{
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
   },
   
    getGridForEntity: function(){
        var tabGrid = this.getListWorkRequest();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, window, record){
        var me = this;
        Ext.BaseAjax.request({
            url:'rest/workRequest/getCompleteById.htm',
            params:{
                idWorkRequest: record.raw.idWorkRequest
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                me.setUpdateFormData(window, data.workRequest,data.substandardWorkRequest);
            }
        });
    },
    
    setUpdateFormData : function(window, data,substandardWorkRequest){
        var me = this;
        var formPanel = window.down('form');
        var lotInput = formPanel.queryById('idWorkRequestLot');
        lotInput.setValue(data.lot.idLot);
        var workRequestSourceInput = formPanel.queryById('idWorkRequestSource');
        workRequestSourceInput.setValue(data.workRequestSource.idWorkRequestSource);
//        var workCategoryInput = formPanel.queryById('idWorkCategory');
//        workCategoryInput.setValue(data.workCategoryDetail.workCategory.idWorkCategory);
        var workCategoryInput = formPanel.queryById('idWorkCategory');
        workCategoryInput.setValue(new Ext.create(sisprod.getApplication().getModelName('WorkCategory'),{
            idWorkCategory: data.workCategoryDetail.workCategory.idWorkCategory,
            workCategoryName: data.workCategoryDetail.workCategory.workCategoryName
        }));
        var workCategoryDetailInput = formPanel.queryById('idWorkCategoryDetail');
        workCategoryDetailInput.setValue(new Ext.create(sisprod.getApplication().getModelName('WorkCategoryDetail'),{
            workCategoryName: data.workCategoryDetail.workCategory.workCategoryName,
            idWorkCategoryDetail: data.workCategoryDetail.idWorkCategoryDetail,
            workCategoryDetailName: data.workCategoryDetail.workCategoryDetailName
        }));
        var equipmentTypeInput = formPanel.queryById('idSelectEquipmentType');
        equipmentTypeInput.setValue(data.equipment.equipmentType.idEquipmentType);
        var equipmentInput = formPanel.queryById('idEquipment');
        equipmentInput.setValue(new Ext.create(sisprod.getApplication().getModelName('EquipmentTemp'),{
            idEquipment: data.equipment.idEquipment,
            equipmentName: data.equipment.equipmentName,
            equipmentCode: data.equipment.equipmentCode,
            locationName: data.equipment.location.locationName
        }));
//        var locationInput = formPanel.queryById('idWorkRequestLocation');
//        locationInput.setValue(new Ext.create(sisprod.getApplication().getModelName('Location'),{
//            idLocation: data.location.idLocation,
//            locationName: data.location.locationName
//        }));
        var applicantInput = formPanel.queryById('idApplicant');
        applicantInput.setValue(new Ext.create(sisprod.getApplication().getModelName('EmployeeTemp'),{
            idEmployee: data.applicant.idEmployee,
            personFullName: data.applicant.person.personFullName,
            fullDocumentNumber: data.applicant.person.fullDocumentNumber
        }));
        var isSubstandardCondition = formPanel.queryById('isSubstandardCondition');
        isSubstandardCondition.setValue(data.isSubstandardCondition);
        if(data.isSubstandardCondition===true){
//            var hsseSupervisor = formPanel.queryById('idHsseSupervisor');
//            hsseSupervisor.setValue(new Ext.create(sisprod.getApplication().getModelName('HsseSupervisor'),{
//                idHsseSupervisor: substandardWorkRequest.hsseSupervisor.idHsseSupervisor,
//                'employee.idEmployee': substandardWorkRequest.hsseSupervisor.employee.idEmployee,
//                personFullName: substandardWorkRequest.hsseSupervisor.employee.person.personFullName,
//                fullDocumentNumber: substandardWorkRequest.hsseSupervisor.employee.person.fullDocumentNumber
//            }));
            var idSubstandard = formPanel.queryById('idSubstandard');
            idSubstandard.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    idSubstandard.select(substandardWorkRequest.substandard.idSubstandard);
                }
            });
//            var idSubstandardConditionAction = formPanel.queryById('idSubstandardConditionAction');
//            idSubstandardConditionAction.getStore().load({
//                scope: this,
//                callback: function(records, operation, success){
//                    idSubstandardConditionAction.select(substandardWorkRequest.substandardConditionAction.idSubstandardConditionAction);
//                }
//            });
            var detectionDate = Ext.getCmp('detectionDate');
            detectionDate.setValue(substandardWorkRequest.detectionDate);
        }
        me.setDataInForm(window, data);
    },
            
    onAttachFileButton: function(button){
        var me = this;
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
    	var record = selection.data;
        var window = Ext.create('sisprod.view.WorkRequest.WorkRequestReferenceFilesWindow',{
            data: record
        });
        window.show();
    },
            
    onUploadFile: function(button){
        var me = this;
        var formPanel = button.up('form');
        var window = formPanel.up('window');
        var grid = window.down('#referenceFilesGrid');
        var store = grid.getStore();
//        var form = formPanel.getForm();
        if(formPanel.isValid()){
            formPanel.submit({
                url: 'rest/workRequestReferenceFile/register.htm',
                method: 'POST',
                waitMsg: me.messages.fileUploadingWaitMessage,
                success: function(form, action){
//                    var responseData = Ext.decode(action.response.responseText);
                    store.reload();
                },
                failure: function(form, action){
                    var responseData = Ext.decode(action.response.responseText);
                    if(!responseData.success){
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
        if(record) {
            var data = record.data;
            Ext.Msg.show({
                title: me.controllerMessages.alertMessage,
                msg: Ext.String.format(me.controllerMessages.deleteRecorConfirmationMessage, data['fileName']),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button) {
                    if(button==="yes"){
                        var idWorkRequestReferenceFile = data['idWorkRequestReferenceFile'];
                        Ext.BaseAjax.request({
                           url: 'rest/workRequestReferenceFile/delete.htm',
                           params: {
                               idWorkRequestReferenceFile: idWorkRequestReferenceFile
                           },
                           success: function(response){
                               var responseData = Ext.decode(response.responseText);
                               if(responseData.success) grid.getStore().reload();
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
    
    beforeShowUpdate: function(grid, record){
        var me = this;
        var idWorkRequest = record.data['idWorkRequest'];
        var result = false;
        if(Ext.isDefined(idWorkRequest) && idWorkRequest !== null){
            Ext.BaseAjax.request({
                url: 'rest/workRequest/checkIsEditable.htm',
                async: false,
                params: { idWorkRequest: idWorkRequest },
                success: function(response){
                    var responseData = Ext.decode(response.responseText);
                    if(responseData.success){
                        if(responseData.result) result = responseData.result;
                        else Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                    }
                    else Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                }
            });
        }
        return result;
    },
    onCheckubstandardCondition: function(checkbox, newValue, oldValue, eventOptions){
        var formPanel = Ext.getCmp('ipPanelSubstandard');
        var form = formPanel.up('form');
        var win = form.up('window');
        formPanel.setVisible(newValue);
//        Ext.getCmp('idHsseSupervisor').allowBlank = !newValue;
        Ext.getCmp('detectionDate').allowBlank = !newValue;
        Ext.getCmp('idSubstandard').allowBlank = !newValue;
//        Ext.getCmp('idSubstandardConditionAction').allowBlank = !newValue;
        win.center();
    }
});

