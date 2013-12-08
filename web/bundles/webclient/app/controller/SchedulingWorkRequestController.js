/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SchedulingWorkRequestController', {
   extend: 'sisprod.controller.Base',
   stores : ['SchedulingWorkRequestStore'],
   models : ['WorkRequestScheduleModel'],
   entityName: 'SchedulingWorkRequest',
   checkOutPermissions: false,
   refs: [{ref: 'listSchedulingWorkRequest', selector: 'listSchedulingWorkRequest'}],
   views : ['SchedulingWorkRequest.ListSchedulingWorkRequest'],
   
   requires: [
       'sisprod.store.SchedulingWorkRequestStore'
   ],
   
   messages: {
       templateLoadingConfirmation: 'All Resources data will be clean. Are you sure you want to apply the selected template?',
       multiOrderQuestion: 'This Work Request will generate more orders?',
       validations: {
           selectWorkCategoryDetail: 'Select work type first...!',
           emptyResourcesText: 'Add one {0} at least!',
           requiredFieldsText: 'Fill required fields to generated an order: {0}!',
           activities: 'Activities',
           equipments: 'Equipments',
           products: 'Products',
           idWorkShop: 'Workshop',
           idWorkShopCoordinator: 'Coordinator',
           idQuadrille: 'Quadrille',
           scheduledStartDate: 'Estimated Start Date',
           scheduledEndDate: 'Estimated End Date',
           emptyActivities: "There're activities with 0 machine and man hours. Please, check them out"
       },
       noActivityRegister:'Register at least one Activity',
       workTemplateSave:'Template saved success',
       fileUploadingWaitMessage: 'Uploading file, please wait...'
   },
   formats: {
        sourceDateFormat: 'Y-m-d',
        targetDateFormat: 'd-m-Y'
   },
   
   init : function(){
//       Ext.create('Ext.data.Store',{
//            storeId: 'equipmentTypeStoreTplGrid',
////            storeId: 'equipmentTypeStoreGrid',
//            model: 'sisprod.model.WorkOrderScheduledEquipmentModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
       
//       Ext.create('Ext.data.Store', {
//            storeId: 'ppEquipmentStoreTplGrid',
////            storeId: 'equipmentTypeStoreGrid',
//            model: 'sisprod.model.WorkOrderScheduledEquipmentModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
//        Ext.create('Ext.data.Store',{
//            storeId: 'productStoreTplGrid',
////            storeId: 'productStoreGrid',
//            model: 'sisprod.model.WorkOrderScheduledProductModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
//        Ext.create('Ext.data.Store',{
//            storeId: 'activityOtStoreTplGrid',
////            storeId: 'activityOtStoreGrid',
//            model: 'sisprod.model.WorkOrderActivityModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
       
        this.control({
           'listSchedulingWorkRequest button[action=showSchedulingWindow]':{
               click: this.showSchedulingWindow
           },
           
//           'selectTemplateWindow checkbox[id=useTemplate]': {
//               change: this.onUseTemplate
//           },
           
           'saveTemplateWindow button[action=saveTemplate]': {
               click: this.saveWorkTemplate
           },
           
           'saveTemplateWindow checkbox[id=newWorkTemplate]': {
               change: this.onChangeSaveNewTemplate
           },
           
           'selectTemplateWindow button[action=loadTemplate]': {
               click: this.performTemplateLoading
           },
           
           'selectTemplateWindow button[action=showWorkOrderWindow]': {
               click: this.showWorkOrderWindow
           },
           
           'addWorkOrder combobox[id=idWorkShop]': {
               select: this.onSelectWorkShop
           },
           
           'addWorkOrder combobox[id=idSector]': {
               select: this.onSelectSector
           },
           
           'addWorkOrder combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           
           'addWorkOrder button[action=loadTemplate]': {
               click: this.onLoadTemplate
           },
           
           'addWorkOrder button[action=saveTemplate]': {
               click: this.onSaveTemplate
           },
           
           'addWorkOrder checkbox[id=ownResources]': {
               change: this.onCheckOwnResources
           },
           
           'addWorkOrder combobox[id=idWorkCategoryDetail]': {
               select: this.onSelectWorkCategoryDetail
           },
           
           'addWorkOrder button[action=partialSave]': {
               click: this.onPartialSave
           },
           
           'addWorkOrder button[action=generateOrder]': {
               click: this.onGenerateWorkOrder
           },
           
           'addWorkOrder button[id=cboPPEquipmentAddButton]': {
               click: this.onPPEquipmentAddButton
           },
           
           'addWorkOrder button[id=cboProductAddButton]': {
               click: this.onProductAddButton
           },
           
           'editWorkOrder combobox[id=idWorkShop]': {
               select: this.onSelectWorkShop
           },
           
           'editWorkOrder combobox[id=idSector]': {
               select: this.onSelectSector
           },
           
           'editWorkOrder combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           
           'editWorkOrder button[action=loadTemplate]': {
               click: this.onLoadTemplate
           },
           'editWorkOrder button[action=saveTemplate]': {
               click: this.onSaveTemplate
           },
           'editWorkOrder checkbox[id=ownResources]': {
               change: this.onCheckOwnResources
           },
           
           'editWorkOrder combobox[id=idWorkCategoryDetail]': {
               select: this.onSelectWorkCategoryDetail
           },
           
           'editWorkOrder button[action=partialSave]': {
               click: this.onEditPartialSave
           },
           
           'editWorkOrder button[action=generateOrder]': {
               click: this.onGenerateWorkOrder
           },
           
           'editWorkOrder button[id=cboPPEquipmentAddButton]': {
               click: this.onPPEquipmentAddButton
           },
           
           'editWorkOrder button[id=cboProductAddButton]': {
               click: this.onProductAddButton
           },
           
           'listWorkOrdersByWorkRequest button[action=edit]': {
               click: this.onEdit
           },
           
           'listWorkOrdersByWorkRequest dataview': {
               itemdblclick: this.onEdit
           },
           
//           'addWorkOrder, editWorkOrder': {
//               close: this.onCloseWindow
//           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'listSchedulingWorkRequest button[action=attachFiles]': {
               click: this.onAttachFileButton
           },
           
           'workRequestReferenceFilesWindow button[action=uploadFile]': {
               click: this.onUploadFile
           },
           
           'workRequestReferenceFilesWindow button[action=removeFile]': {
               click: this.onRemoveFile
           },
           
           'wiewWorkRequest button[action=save]': {
               click: this.changeMultiOrder
           }
       });
       this.callParent(arguments);
    },
            
    onChangeSaveNewTemplate:function(checkbox, newValue, oldValue, eOpts ){
        var cboWorkTemplate = Ext.getCmp("idWorkTemplate");
        var workTemplateName = Ext.getCmp("workTemplateName");
        if(newValue===true){
            workTemplateName.allowBlank=false;
            cboWorkTemplate.allowBlank=true;
            workTemplateName.setVisible(true);
            cboWorkTemplate.setVisible(false);
            cboWorkTemplate.clearValue();
        }else{
            workTemplateName.allowBlank=true;
            cboWorkTemplate.allowBlank=false;
            workTemplateName.setVisible(false);
            cboWorkTemplate.setVisible(true);
        }
    },
    saveWorkTemplate:function(button){
        var activityGrid;
        activityGrid = Ext.getCmp('schedulingActivityOtGrid');
        var store=activityGrid.store;
        var me = this;
        if(store.getCount()>0){            
            var form = button.up('form');
            var win = form.up('window');
            if(form.isValid()){
                var values = {};
                var idWorkCategoryDetail = Ext.getCmp("idWorkCategoryDetail");   
                var manHours = Ext.getCmp("manHours");
                var machineHours = Ext.getCmp("machineHours");;
//                var listEquipments = this.mapEquipmentsOnGrid();
                var listPPEquipments = this.mapppEquipmentsOnGrid();
                var listProducts = this.mapProductsOnGrid();
                var listActivities = this.mapActivitiesOnGrid();
                values.idWorkCategoryDetail = JSON.stringify(idWorkCategoryDetail.getValue());
//                values.listEquipments = JSON.stringify(listEquipments);
                values.listPPEquipments = JSON.stringify(listPPEquipments);
                values.listProducts = JSON.stringify(listProducts);
                values.listActivities = JSON.stringify(listActivities);    
                values.manHours=manHours.getValue();
                values.machineHours=machineHours.getValue();
                var check = Ext.getCmp('newWorkTemplate');
                if(Ext.isDefined(check) && check.getValue()===true){
                    this.registerWorkTemplate(values,win);
                }else
                    this.overrideWorkTemplate(values,win);
            }
        }else{
            Ext.Msg.alert(this.controllerMessages.alertMessage,this.messages.noActivityRegister);
        }
    },
    registerWorkTemplate:function(values,win){
        var me = this;
        var workTemplateName = Ext.getCmp("workTemplateName");
        values.workTemplateName = workTemplateName.value;
        Ext.BaseAjax.request({
            url: 'rest/workTemplate/register.htm',
            method: 'POST',
            params: values,
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.workTemplateSave);
                    win.close();
                }
                else{
                    Ext.MessageBox.show({
                        title: me.controllerMessages.alertMessage,
                        msg: responseData.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            },
            failure: function(response, options){
            }
        });
    },
    overrideWorkTemplate:function(values,win){
        var me = this;
        values.idWorkTemplate=Ext.getCmp('idWorkTemplate').getValue();
        Ext.BaseAjax.request({
            url: 'rest/workTemplate/update.htm',
            method: 'POST',
            params: values,
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.workTemplateSave);
                    win.close();
                }
                else{
                    Ext.MessageBox.show({
                        title: me.controllerMessages.alertMessage,
                        msg: responseData.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            },
            failure: function(response, options){
            }
        });
    },
    mapppEquipmentsOnGrid:function(){
        var ppEquipmentGrid;
        ppEquipmentGrid = Ext.getCmp('schedulingPPEquipmentGrid');
        var store= ppEquipmentGrid.getStore();
        var listPPEquipmentDetail = new Array();
        for(var i=0;i<store.getCount();i++){
            var record=store.getAt(i);
            listPPEquipmentDetail.push({pPEquipment:{idPPEquipment:record.data.idPPEquipment},quantity:record.data.quantity});
        }
        return listPPEquipmentDetail;
    },
    mapEquipmentsOnGrid:function(){
        var equipmentGrid;
        equipmentGrid = Ext.getCmp('equipmentGrid');
        var store=equipmentGrid.store;
        var listEquipmentDetail = new Array();
        for(var i=0;i<store.getCount();i++){
            var record=store.getAt(i);
            listEquipmentDetail.push({equipmentType:{idEquipmentType:record.data.idEquipmentType},quantity:record.data.quantity});
        }
        return listEquipmentDetail;
    },
    mapProductsOnGrid:function(){
        var productGrid;
        productGrid = Ext.getCmp('schedulingProductGrid');
        var store=productGrid.store;
        var listProductDetail = new Array();
        for(var i=0;i<store.getCount();i++){
            var record=store.getAt(i);
            listProductDetail.push({product:{idProduct:record.data.idProduct},measureUnit:{idMeasureUnit:record.data.idMeasureUnit},quantity:record.data.quantity});
        }
        return listProductDetail;
    },
    mapActivitiesOnGrid:function(){
        var activityGrid;
        activityGrid = Ext.getCmp('schedulingActivityOtGrid');
        var store=activityGrid.store;
        var listActivityDetail = new Array();
        for(var i=0;i<store.getCount();i++){
            var record=store.getAt(i);
            listActivityDetail.push({activityOt:{idActivityOt:record.data.idActivityOt},manHours:record.data.manHours,machineHours:record.data.machineHours});
        }
        return listActivityDetail;
    },
    onCloseWindow: function(){
//        var equipmentTypeStore = Ext.StoreManager.lookup('equipmentTypeStoreTplGrid');
//        var ppEquipmentStore = Ext.StoreManager.lookup('ppEquipmentStoreTplGrid');
//        if(Ext.isDefined(ppEquipmentStore) && ppEquipmentStore!==null) ppEquipmentStore.removeAll();
//        //
//        var productStore = Ext.StoreManager.lookup('productStoreTplGrid');
//        if(Ext.isDefined(productStore) && productStore!==null) productStore.removeAll();
//        //
//        var activityOtStore = Ext.StoreManager.lookup('activityOtStoreTplGrid');
//        if(Ext.isDefined(activityOtStore) && activityOtStore!==null) activityOtStore.removeAll();
    },
    
    onSelectWorkShop: function(combobox, records, event){
        var formPanel = combobox.up('form');
        var quadrille = formPanel.down('#idQuadrille');
        quadrille.clearValue();
        quadrille.getStore().reload();
        //
        var coordinator = formPanel.down('#idWorkShopCoordinator');
        coordinator.clearValue();
        coordinator.getStore().reload();
    },
    
    onSelectSector: function(combobox, records, event) {
        var me = this;
        var formPanel = combobox.up('form');
        var taskScheduler = formPanel.down('#idTaskScheduler');
        taskScheduler.clearValue();
        taskScheduler.getStore().reload();
        //
        var workShop = formPanel.down('#idWorkShop');
        workShop.clearValue();
        workShop.getStore().reload();
        //
        formPanel.down('#idQuadrille').clearValue();
        formPanel.down('#idWorkShopCoordinator').clearValue();
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
        var originalRecord = window.data;
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
    
    onLoadTemplate: function(button){
        var me = this;
        var formPanel = button.up('form');
        var workCategoryDetail = formPanel.down('#idWorkCategoryDetail');
        var idWorkCategoryDetail = workCategoryDetail.getValue();
        if(Ext.isDefined(idWorkCategoryDetail) && idWorkCategoryDetail!==null){
            Ext.create('sisprod.view.WorkOrder.SelectTemplateWindow', {
                idWorkCategoryDetail: idWorkCategoryDetail,
                parentForm: formPanel
            }).show();
        }
        else Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.validations.selectWorkCategoryDetail);
    },
     validateActivityHours:function(formPanel){
        var me = this;
        var activitiesStore = formPanel.down('#schedulingActivityOtGrid').getStore();
        var emptyActivitiesFlag = false;
        for(var i = 0; i < activitiesStore.getCount(); i++) {
            var record = activitiesStore.getAt(i);
            var machineHours = record.data['machineHours'];
            var manHours = record.data['manHours'];
            var activityHours = machineHours + manHours;
            if(activityHours <= 0) {
                emptyActivitiesFlag = true;
                break;
            }
        }
        if(emptyActivitiesFlag) {
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.validations.emptyActivities);
            return false;
        }
        return true;
    },
    onSaveTemplate: function(button){
            var me = this;
            var formPanel = button.up('form');
            var workCategoryDetail = formPanel.down('#idWorkCategoryDetail');
            var idWorkCategoryDetail = workCategoryDetail.getValue();
            if(me.validateActivityHours(formPanel)){
                if(Ext.isDefined(idWorkCategoryDetail) && idWorkCategoryDetail!==null){
                    Ext.create('sisprod.view.WorkOrder.SaveTemplateWindow', {
                        idWorkCategoryDetail: idWorkCategoryDetail,
                        parentForm: formPanel
                    }).show();
                }
                else Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.validations.selectWorkCategoryDetail);
            }
    },
            
    performTemplateLoading: function(button){
        var me = this;
        var formPanel = button.up('form');
        var window = formPanel.up('window');
        if(formPanel.isValid()){
            Ext.Msg.show({
                title: me.controllerMessages.alertMessage,
                msg: me.messages.templateLoadingConfirmation,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button){
                    if(button==="yes"){
                        var values = formPanel.getForm().getValues();
                        var idWorkTemplate = values['idWorkTemplate'];
                        Ext.BaseAjax.request({
                            url: 'rest/workTemplate/getCompleteById.htm',
                            method: 'POST',
                            params: {idWorkTemplate: idWorkTemplate},
                            success: function(response){
                                var responseData = Ext.decode(response.responseText);
                                if(responseData.success){
                                    me.loadWorkTemplateData(window.parentForm, responseData);
                                    window.close();
                                }
                                else Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                            }
                        });
                    }
                }
            });
        }
    },
    
    loadWorkTemplateData: function(form, data){
        var me = this;
        var workTemplateActivities = data['workTemplateActivity'];
        var workTemplateProducts = data['workTemplateProduct'];
        var workTemplateEquipments = data['workTemplateEquipment'];
        //
        me.loadWorkTemplateActivities(workTemplateActivities, form);
        me.loadWorkTemplateProducts(workTemplateProducts, form);
        me.loadWorkTemplateEquipments(workTemplateEquipments, form);
        //
        form.down('#schedulingActivityOtGrid').updateHours();
    },
            
    loadWorkTemplateActivities: function(workTemplateActivities, form){
        //Cleaning existing data...
        var store = form.down('#schedulingActivityOtGrid').getStore();
        if(!Ext.isDefined(store) || store===null) return;
        store.removeAll();
        //
        Ext.Array.each(workTemplateActivities, function(value, index, itself){
            var model = Ext.create('sisprod.model.WorkOrderActivityModel',{
                idActivityOt: value['activityOt']['idActivityOt'],
                description: value['activityOt']['description'],
                manHours: value['manHours'],
                machineHours: value['machineHours']
            });
            store.insert(store.getCount(), model);
        });
    },
    
    loadWorkTemplateProducts: function(workTemplateProducts, form){
        //Cleaning existing data...
        var store = form.down('#schedulingProductGrid').getStore();
        if(!Ext.isDefined(store) || store===null) return;
        store.removeAll();
        //
        Ext.Array.each(workTemplateProducts, function(value, index, itself){
            var model = Ext.create('sisprod.model.WorkOrderScheduledProductModel',{
                idProduct: value['product']['idProduct'],
                productName: value['product']['productName'],
                productCode: value['product']['productCode'],
                idMeasureUnit: value['measureUnit']['idMeasureUnit'],
                measureUnitName: value['measureUnit']['measureUnitName'],
                quantity: value['quantity'],
                requestNumber: value['requestNumber'],
                productPrice: value['price'],
                productStore: value['store'],
                productStock: value['stock'],
                productMoney: value['money']
            });
            store.insert(store.getCount(), model);
        });
    },
    
    loadWorkTemplateEquipments: function(workTemplateEquipments, form){
        //Cleaning existing data...
        var store = form.down('#schedulingPPEquipmentGrid').getStore();
        if(!Ext.isDefined(store) || store===null) return;
        store.removeAll();
        //
        Ext.Array.each(workTemplateEquipments, function(value, index, itself){
            var ppEquipment = value['ppEquipment'];
            if(!Ext.isDefined(ppEquipment) || ppEquipment === null) ppEquipment = value['pPEquipment'];
            var model = Ext.create('sisprod.model.WorkOrderScheduledPPEquipmentModel',{
                idPPEquipment: ppEquipment['idPPEquipment'],
                description: ppEquipment['description'],
                isTool: ppEquipment['isTool'],
                quantity: value['quantity']
            });
            store.insert(store.getCount(), model);
        });
    },
    
    onCheckOwnResources: function(checkbox, newValue, oldValue, eventOptions){
        var formPanel = checkbox.up('form');
        if(newValue){
            formPanel.down('#idSupplier').enable();
            formPanel.down('#serviceOrderNumber').enable();
            formPanel.down('#idQuadrille').disable();
        }
        else{
            formPanel.down('#idSupplier').disable();
            formPanel.down('#serviceOrderNumber').disable();
            formPanel.down('#idQuadrille').enable();
        }
    },
   
    getGridForEntity: function(){
        var tabGrid = this.getListSchedulingWorkRequest();
        return tabGrid.getGridPanel();
    },
            
    beforeShowInitialView: function(data, tabPanel, tabId){
        var me = this;
        var result = false;
        Ext.BaseAjax.request({
            url: 'rest/workRequest/isEnableForScheduling.htm',
            method: 'POST',
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
                items: [{xtype:'notauthorizedpanel'}]
            });
            tabPanel.setActiveTab(tab);
        }
        return result;
    },
    
    onUseTemplate: function(checkbox, newValue, oldValue, event){
        var form = checkbox.up('form');
        var workTemplateInput = form.down('#idWorkTemplate');
        if(newValue) workTemplateInput.enable();
        else workTemplateInput.disable();
    },
    
    onPartialSave: function(button){
        var me = this;
        var window = button.up('window');
        var formPanel = button.up('form');
        if(formPanel.isValid()){
            var values = formPanel.getForm().getValues();
            var ownResources = values['ownResources'];
            if(!Ext.isDefined(ownResources) || ownResources === null) values.ownResources = true;
            else values.ownResources = !ownResources;
            //
            var activities = me.getActivitiesData(formPanel);
            if(activities !== null) values.activities = activities;
//            var equipments = me.getEquipmentsData();
            var equipments = me.getPPEquipmentsData(formPanel);
            if(equipments !== null) values.equipments = equipments;
            var products = me.getProductsData(formPanel);
            if(products !== null) values.products = products;
            //
            Ext.Msg.show({
                title: me.controllerMessages.alertMessage,
                msg: me.messages.multiOrderQuestion,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button){
                    if(button==="yes") values.multiOrder = true;
                    else values.multiOrder = false;
                    //
                    me.callPartialRegister(window, values);
                }
            });
        }
    },
    
    callPartialRegister: function(window, values){
        var me = this;
        var newValues = sisprod.getApplication().getOnlyKeysWithValue(values);
        Ext.BaseAjax.request({
            url: 'rest/workOrder/partialRegister.htm',
            method: 'POST',
            params: newValues,
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    window.close();
                    me.refreshDataLists();
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
    },
    
    onEditPartialSave: function(button){
        var me = this;
        var window = button.up('window');
        var formPanel = button.up('form');
        if(formPanel.isValid()){
            var values = formPanel.getForm().getValues();
            var ownResources = values['ownResources'];
            if(!Ext.isDefined(ownResources) || ownResources === null) values.ownResources = true;
            else values.ownResources = !ownResources;
            //
            var activities = me.getActivitiesData(formPanel);
            if(activities !== null) values.activities = activities;
//            var equipments = me.getEquipmentsData();
            var equipments = me.getPPEquipmentsData(formPanel);
            if(equipments !== null) values.equipments = equipments;
            var products = me.getProductsData(formPanel);
            if(products !== null) values.products = products;
            //
            Ext.Msg.show({
                title: me.controllerMessages.alertMessage,
                msg: me.messages.multiOrderQuestion,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button){
                    if(button==="yes") values.multiOrder = true;
                    else values.multiOrder = false;
                    //
                    me.callPartialUpdate(window, values);
                }
            });
        }
    },
    
    callPartialUpdate: function(window, values){
        var me = this;
        var newValues = sisprod.getApplication().getOnlyKeysWithValue(values);
        Ext.BaseAjax.request({
            url: 'rest/workOrder/partialUpdate.htm',
            method: 'POST',
            params: newValues,
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    window.close();
                    me.refreshDataLists();
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
    },
    
    onGenerateWorkOrder: function(button){
        var me = this;
        var window = button.up('window');
        var formPanel = button.up('form');
        if(formPanel.isValid()){
            if(!me.validateRequiredData(window)) return false;
            var values = formPanel.getForm().getValues();
            var ownResources = values['ownResources'];
            if(!Ext.isDefined(ownResources) || ownResources === null) values.ownResources = true;
            else values.ownResources = !ownResources;
            //
            if(!me.validateResourcesData(values.ownResources, formPanel)) return false;
            //
            var activities = me.getActivitiesData(formPanel);
            if(activities !== null) values.activities = activities;
//            var equipments = me.getEquipmentsData();
            var equipments = me.getPPEquipmentsData(formPanel);
            if(equipments !== null) values.equipments = equipments;
            var products = me.getProductsData(formPanel);
            if(products !== null) values.products = products;
            //
            Ext.Msg.show({
                title: me.controllerMessages.alertMessage,
                msg: me.messages.multiOrderQuestion,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button){
                    if(button==="yes") values.multiOrder = true;
                    else values.multiOrder = false;
                    //
                    me.callGenerateWorkOrder(window, values);
                }
            });
        }
    },
    
    callGenerateWorkOrder: function(window, values){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/workOrder/generateWorkOrder.htm',
            method: 'POST',
            params: values,
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    window.close();
                    me.refreshDataLists();
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
    },
    
    validateResourcesData: function(ownResources, formPanel){
        var me = this;
        var result = true;
        var messages = new Array();
        var activitiesStore = formPanel.down('#schedulingActivityOtGrid').getStore();
//        var equipmentsStore = Ext.StoreManager.lookup('equipmentTypeStoreTplGrid');
        var productsStore = formPanel.down('#schedulingProductGrid').getStore();
        //
        if(activitiesStore.getCount()===0) messages.push(me.messages.validations.activities);
//        if(equipmentsStore.getCount()===0) messages.push(me.messages.validations.equipments);
        if(productsStore.getCount()===0 && ownResources) messages.push(me.messages.validations.products);
        //
        var emptyActivitiesFlag = false;
        for(var i = 0; i < activitiesStore.getCount(); i++) {
            var record = activitiesStore.getAt(i);
            var machineHours = record.data['machineHours'];
            var manHours = record.data['manHours'];
            var activityHours = machineHours + manHours;
            if(activityHours <= 0) {
                emptyActivitiesFlag = true;
                break;
            }
        }
        //
        var message = "";
        if(messages.length > 0) {
            message = Ext.String.format(me.messages.validations.emptyResourcesText, messages.join(', '));
            if(emptyActivitiesFlag) message = Ext.String.format("{0}. {1}", message, me.messages.validations.emptyActivities); 
            Ext.Msg.alert(me.controllerMessages.alertMessage, message);
            result = false;
        }
        else {
            if(emptyActivitiesFlag) {
                Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.validations.emptyActivities);
                return false;
            }
        }
        return result;
    },
            
    validateRequiredData: function(window){
        var me = this;
        var result = true;
        var messages = new Array();
        var form = window.down('form');
        var fields = form.getForm().getFields();
        var items = fields.items;
        Ext.Array.each(items, function(input, index, itself){
            if(input.requiredForWorkOrder && !input.isDisabled()){
                var value = input.getValue();
                if(!Ext.isDefined(value) || value === null){
                    messages.push(me.messages.validations[input.id]);
                }
                if(Ext.isString(value) && Ext.String.trim(value) === '') messages.push(me.messages.validations[input.id]);
            }
        });
        if(messages.length > 0){
            Ext.Msg.alert(me.controllerMessages.alertMessage, Ext.String.format(me.messages.validations.requiredFieldsText,
                messages.join(', ')));
            result = false;
        }
        return result;
    },
    
    getActivitiesData: function(formPanel){
        var activitiesStore = formPanel.down('#schedulingActivityOtGrid').getStore();
        var activities = new Array();
        for(var i = 0; i<activitiesStore.getCount(); i++){
            var row = activitiesStore.getAt(i).data;
            var data = {
                idWorkOrderActivity: row['idWorkOrderActivity'],
                idActivityOt: row['idActivityOt'],
                description: row['description'],
                manHours: row['manHours'],
                machineHours: row['machineHours'],
                isPlanned: row['isPlanned']
            };
            activities.push(data);
        }
        if(activities.length>0) return Ext.encode(activities);
        else return null;
    },
    
    getEquipmentsData: function(formPanel){
        var equipmentsStore = Ext.StoreManager.lookup('equipmentTypeStoreTplGrid');
        var equipments = new Array();
        for(var i=0;i<equipmentsStore.getCount();i++){
            equipments.push(equipmentsStore.getAt(i).data);
        }
        if(equipments.length>0) return Ext.encode(equipments);
        else return null;
    },
    
    getPPEquipmentsData: function(formPanel){
        var equipmentsStore = formPanel.down('#schedulingPPEquipmentGrid').getStore();
        var equipments = new Array();
        for(var i=0;i<equipmentsStore.getCount();i++){
            equipments.push(equipmentsStore.getAt(i).data);
        }
        if(equipments.length>0) return Ext.encode(equipments);
        else return null;
    },
    
    getProductsData: function(formPanel){
        var productsStore = formPanel.down('#schedulingProductGrid').getStore();
        var products = new Array();
        for(var i=0;i<productsStore.getCount();i++){
            products.push(productsStore.getAt(i).data);
        }
        if(products.length>0) return Ext.encode(products);
        else return null;        
    },
    
    showGenerateWorkOrderWindow: function(grid, rowIndex, colIndex, record){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/workRequest/getCompleteById.htm',
            method: 'POST',
            params: {idWorkRequest: record.raw.idWorkRequest},
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.result) && responseData.result === true){
                    Ext.create('sisprod.view.WorkOrder.AddWorkOrder',{
                        data: responseData.workRequest
                    }).show();
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
    },
    
    showWorkOrders: function(grid, rowIndex, colIndex, record){
        var me = this;
        Ext.create('sisprod.view.WorkOrder.ListWorkOrdersByWorkRequest',{
            data: record.raw,
            controller: me
        }).show();
    },
            
    onEdit: function(component) {
        var me = this;
        var grid;
        if(component.isXType('button')){
            var window = component.up('window');
            grid = window.down('#gridWorkOrder');
        } else grid = component;
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection) || selection === null) {
            Ext.Msg.alert(me.controllerMessages.updateText, me.controllerMessages.selectRecordMessage);
            return;
        }
        var record = selection.raw;
        //
        Ext.BaseAjax.request({
            url: 'rest/workOrder/getCompleteById.htm',
            method: 'POST',
            params: {idWorkOrder: record.idWorkOrder},
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    var workOrderData = responseData.workOrder;
                    var additionalData;
                    if(workOrderData['ownResources']) additionalData = responseData.workOrderOwnResources;
                    else additionalData = responseData.workOrderThirdPartyResources;
                    //
                    Ext.create('sisprod.view.WorkOrder.EditWorkOrder',{
                        workOrder: workOrderData,
                        workOrderActivities: responseData.workOrderActivities,
                        workOrderScheduledEquipments: responseData.workOrderScheduledEquipments,
                        workOrderScheduledProducts: responseData.workOrderScheduledProducts,
                        additionalData: additionalData
                    }).show();
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
    },
    
    refreshDataLists: function(){
        var me = this;
        //
        var workOrderByWorkRequestStore = Ext.StoreManager.lookup('workOrderByWorkRequestStore');
        if(Ext.isDefined(workOrderByWorkRequestStore) && workOrderByWorkRequestStore!==null) workOrderByWorkRequestStore.reload();
        //
        me.getGridForEntity().getStore().reload();
    },
    
    onPPEquipmentAddButton: function(){
        this.showSingleAdditonWindow('PPEquipment');
    },
    
    onProductAddButton: function(){
        this.showSingleAdditonWindow('Product');
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
    
    
    showChangeMultiOrderWindow: function(grid, rowIndex, colIndex, record) {
        var me = this;
        var idWorkRequest = record.data['idWorkRequest'];
        if(Ext.isDefined(idWorkRequest) && idWorkRequest !== null) {
            Ext.BaseAjax.request({
                url: 'rest/workRequest/getCompleteById.htm',
                params: { idWorkRequest: idWorkRequest },
                success: function(response) {
                    var responseData = Ext.decode(response.responseText);
                    if(responseData.result) {
                        var window = Ext.create('sisprod.view.SchedulingWorkRequest.ViewWorkRequest', {
                            workRequest: responseData['workRequest'],
                            substandardWorkRequest: responseData['substandardWorkRequest']
                        });
                        window.show();
                    }
                    else {
                        Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                    }
                }
            });
        }
    },
    
    changeMultiOrder: function(button) {
        var me = this;
        var form = button.up('form');
        var window = form.up('window');
        if(form.isValid()) {
            var formValues = form.getValues();
            var multiOrder = formValues['multiOrder'];
            if(!Ext.isDefined(multiOrder) || multiOrder === null) multiOrder = false;
            var postValues = {
                idWorkRequest: formValues['idWorkRequest'],
                multiOrder: multiOrder
            };
            Ext.BaseAjax.request({
               url: 'rest/workOrder/changeMultiOrder.htm',
               params: postValues,
               success: function(response) {
                   var responseData = Ext.decode(response.responseText);
                   if(responseData.success) {
                       window.close();
                       me.getGridForEntity().getStore().reload();
                   }
                   else {
                       Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                   }
               }
            });
        }
    }
});

