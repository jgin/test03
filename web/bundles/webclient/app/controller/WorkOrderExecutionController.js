/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkOrderExecutionController', {
   extend: 'sisprod.controller.Base',
   refs: [
       {ref: 'workOrderExecutionForm', selector: 'workOrderExecutionForm'},
       {ref: 'scheduledActivityGrid', selector: 'scheduledActivityGrid'},
       {ref: 'newActivityGrid', selector: 'newActivityGrid'},
       {ref: 'workOrderActivityDetail', selector: 'workOrderActivityDetail'}
   ],
   models : ['WorkOrderActivityModel'],
   stores: ['UnperformedReasonAll'],
   checkOutPermissions: false,
   requires: ['sisprod.store.UnperformedReasonAll'],
   
   listActivities: null,
   listStore: null,
   
   messages: {
       alertErrorSave: 'Error saving data!',
       alertGeneral: 'Can not conclude the execution of the work order {0}, unless the following conditions:!',
       alertActivity: 'Should at least record the execution of an activity (planned or new)',
       alertProduct: 'Should at least record the use of a material (planned or new)',
       alertEmployee: 'Must register at least one worker in the Quadrilla',
       alertEvidence: '',
       alertQuadrilleCapacity: 'Gang capacity is only workers {0}!',
       msgConfirmComploteOrder: 'Sure you want to end the execution of the command {0}?',
       alertNoFounAllEvidenceTypeRequired: 'Must register at least one document of evidence of the following types:',
       inputPercentageAdvance: 'Input Percentage Advance',
       inputExecutionEndDate: 'Input Execution End Date',
       alertDetailInValid: 'No dated activity executions outside the range of order execution!',
       alertActivitiesInvalid: '¡Hay actividades con ejecuciones fuera del rango del ejecución de la orden, proceda a corregir!',
       alertErrorNow: '¡Hay actividades con ejecuciones mayores a la fecha actual del servidor, proceda a corregir!',
       inputResponsibleOfInstallation: 'Input responsible for installing',
       alertExecutionEndDate: 'To the date of execution should not be more than the current server date!',
       emptyActivities: "There're activities executed with 0 machine and man hours. Please, check them out"
   },
  
   init : function(){
        this.createWorkOrderActivityStore('activityOtStoreGrid');
        this.createQuadrilleEmployeesStore('quadrilleEmployeeStoreGrid');
        //this.createScheduleProductStore('scheduledProductStore');
        //this.createProductStore('productStoreGrid');
        this.createWorkOrderActivityDetailStore('workOrderActivityDetailStore');
        this.control({
           'workOrderExecutionForm button[action=partialSave]': {
               click: this.partialSave
           },
           
           'workOrderExecutionForm button[action=closeOrder]': {
               click: this.completeExecution
           },
           
           'workOrderExecutionForm':{
               beforerender: this.loadForm,
               beforeclose: this.clearStores
           },
           
           'workOrderExecutionForm button[action=uploadFile]':{
               click: this.showUploadForm
           },
           
           'workOrderActivityDetail':{
               afterrender: this.loadActivityDetail
           },
           
           'workOrderActivityDetail button[action=save]': {
               click: this.refreshTotalHours
           },
           
           'workOrderExecutionForm datefield[name=executionEndDate]':{
               change: this.validExecutionEndDate
           }
       });
       this.callParent(arguments);
    },
            
    showUploadForm:function(){
        var controllerName = sisprod.getApplication().getControllerName("EvidenceFile");    
        var controller = sisprod.getApplication().getController(controllerName);
        var evidenceGrid=Ext.getCmp('evidenceFilesGrid'); 
        var me =this;
        var addEvidence = Ext.create("sisprod.view.EvidenceFile.AddEvidenceFile",{
            idWorkOrder:me.getWorkOrderExecutionForm().getRecord().data.idWorkOrder,
            storeRef:evidenceGrid.getStore(),
            controller:controller
        });        
        addEvidence.show();
    },
       
    createWorkOrderActivityStore: function(id){
        Ext.create('Ext.data.Store',{
            storeId: id,
            model: 'sisprod.model.WorkOrderActivityModel',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
    },
    
    createQuadrilleEmployeesStore: function(id){
//        Ext.create('Ext.data.Store',{
//            storeId: id,
//            model: 'sisprod.model.EmployeeTempModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
    },
            
    createScheduleProductStore: function(id){
        Ext.create('Ext.data.Store',{
            storeId: id,
            model: 'sisprod.model.WorkOrderScheduledProductModel',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
    },
            
    createProductStore: function(id){
        Ext.create('Ext.data.Store',{
            storeId: id,
            model: 'sisprod.model.WorkOrderProductModel',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
    },
            
    createWorkOrderActivityDetailStore: function(id){
//        Ext.create('Ext.data.Store',{
//            storeId: id,
//            model: 'sisprod.model.WorkOrderActivityDetailModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
    },
            
    loadForm: function(window){
        var me = this;
        var view = this.getWorkOrderExecutionForm();
        var record = view.getRecord();
        if(record !== null){
            Ext.BaseAjax.request({
                url:'rest/workOrder/getById.htm',
                method: 'GET',
                params:{
                    idWorkOrder: record.raw.idWorkOrder
                },
                success: function(response, options){
                    var data = Ext.JSON.decode(response.responseText);
                    me.setFormData(window, data, record);
                }
            });
        }
    },
    
    clearStores: function(){
        var scheduledActivityStore = Ext.getCmp('activityExecutionOtGrid').getStore();
        var activityStore = Ext.getCmp('newActivityGrid').getStore();
        var scheduledProductStore = Ext.getCmp('workOrderScheduledProductGrid').getStore(); 
        var productStore = Ext.getCmp('workOrderProductGrid').getStore(); 
        var employeeStore = Ext.getCmp('quadrilleEmployeesGrid').getStore();
        scheduledActivityStore.loadData([]);
        activityStore.loadData([]);
        scheduledProductStore.loadData([]);
        productStore.loadData([]);
        employeeStore.loadData([]);
    },
    
    setFormData: function(window, data, record){
        var me = this;
        var wo = data.workOrder;
        var formPanel = window.down('form');
        if(formPanel!==null){
            me.clearStores();
            me.setWorkOrderDataInForm(formPanel, wo, data);
            me.setActivitiesInGrids(data.listWorkOrderActivity);
            me.setProductInGrid(data.listWorkOrderProduct);
            me.setScheduledProductInGrid(data.listWorkOrderScheduledProduct);
            me.updateHours();
        }
    },
            
    setWorkOrderDataInForm: function(formPanel, wo, data){
        var me = this;
        formPanel.query('[name=manHours]')[0].setValue(wo.manHours);
        formPanel.query('[name=machineHours]')[0].setValue(wo.machineHours);
        formPanel.query('[name=performedManHours]')[0].setValue(wo.performedManHours);
        formPanel.query('[name=performedMachineHours]')[0].setValue(wo.performedMachineHours);
        formPanel.query('[name=performedMachineHours]')[0].setValue(wo.performedMachineHours);
        formPanel.query('[name=idWorkOrder]')[0].setValue(wo.idWorkOrder);
        formPanel.query('[name=workRequestFullNumber]')[0].setValue(wo.workRequest.workRequestFullNumber);
        formPanel.query('[name=workRequestSourceName]')[0].setValue(wo.workRequest.workRequestSource.workRequestSourceName);
        formPanel.query('[name=equipmentName]')[0].setValue(wo.workRequest.equipment.equipmentName);
        formPanel.query('[name=sectorName]')[0].setValue(wo.sector.sectorName);
        formPanel.query('[name=taskSchedulerName]')[0].setValue(wo.taskScheduler.employee.person.personFullName);
        formPanel.query('[name=taskSchedulerName]')[0].setValue(wo.taskScheduler.employee.person.personFullName);
        formPanel.query('[name=workCategoryName]')[0].setValue(wo.workCategoryDetail.workCategory.workCategoryName);
        formPanel.query('[name=workCategoryDetailName]')[0].setValue(wo.workCategoryDetail.workCategoryDetailName);
        formPanel.query('[name=attentionMaximumDate]')[0].setValue(wo.workRequest.attentionMaximumDate);
        formPanel.query('[name=description]')[0].setValue(wo.description);
        formPanel.query('[name=workshopName]')[0].setValue(wo.workShop.workShopName);
        formPanel.query('[name=locationName]')[0].setValue(wo.location.locationName);
        formPanel.query('[name=workshopCoordinatorName]')[0].setValue(wo.workShopCoordinator.employee.person.personFullName);        
        formPanel.query('[name=startDate]')[0].setValue(wo.scheduledStartDate);      
        formPanel.query('[name=endDate]')[0].setValue(wo.scheduledEndDate);      
        formPanel.query('[name=percentageUsageResources]')[0].setValue(wo.percentageUsageResources);   
        formPanel.query('[name=percentageAdvance]')[0].setValue(wo.percentageAdvance);   
        formPanel.query('[name=executionStartDate]')[0].setValue(wo.executionStartDate);   
        formPanel.query('[name=executionEndDate]')[0].setValue(wo.executionEndDate);   
        formPanel.query('[name=comment]')[0].setValue(wo.comment);   
        
        if(Ext.isDefined(wo.responsibleOfInstallation) && wo.responsibleOfInstallation !== null){
            formPanel.query('[name=idResponsibleOfInstallation]')[0].setValue(Ext.create('sisprod.model.EmployeeTempModel', {
                idEmployee: wo.responsibleOfInstallation.idEmployee,
                idPerson: wo.responsibleOfInstallation.person.idPerson,
                personFullName: wo.responsibleOfInstallation.person.personFullName,
                fullDocumentNumber: wo.responsibleOfInstallation.person.fullDocumentNumber
            }));
        }
           
        if(!wo.ownResources){
            formPanel.query('[name=entityName]')[0].setValue(data.workOrderThirdPartyResources.supplier.entity.entityName);      
            formPanel.query('[name=serviceOrderNumber]')[0].setValue(data.workOrderThirdPartyResources.serviceOrderNumber);     
        }
        else{
            formPanel.query('[name=quadrileName]')[0].setValue(data.workOrderOwnResources.quadrille.quadrilleName);
            formPanel.query('[name=idQuadrille]')[0].setValue(data.workOrderOwnResources.quadrille.idQuadrille);
            me.setQuadrilleEmployeeInGrid(data.listQuadrilleEmployee);
        }
    },
            
    setActivitiesInGrids: function(listWorkOrderActivity){
        var pgrid = Ext.getCmp('activityExecutionOtGrid');
        var upgrid = Ext.getCmp('newActivityGrid');
        
        if(pgrid !== null && upgrid !== null){
            var pstore = pgrid.getStore();
            var upstore = upgrid.getStore();
            for(var i = 0; i < listWorkOrderActivity.length; i++){
                var woa = listWorkOrderActivity[i];
                var unperformedReasonName = null;
                var idUnperformedReason = 0;
                if(Ext.isDefined(woa.unperformedReason) && woa.unperformedReason !== null){
                    unperformedReasonName = woa.unperformedReason.unperformedReasonName;
                    idUnperformedReason = woa.unperformedReason.idUnperformedReason;
                }
                var model = Ext.create('sisprod.model.WorkOrderActivityModel', {
                    idActivityOt: woa.activityOt.idActivityOt,
                    idWorkOrderActivity: woa.idWorkOrderActivity,
                    description: woa.activityOt.description,
                    isPerformed: woa.isPerformed,
                    isPlanned: woa.isPlanned,
                    manHours: woa.manHours,
                    machineHours: woa.machineHours,
                    performedManHours: woa.performedManHours,
                    performedMachineHours: woa.performedMachineHours,
                    unperformedReasonName: unperformedReasonName,
                    idUnperformedReason: idUnperformedReason,
                    listWorkOrderActivityDetail: woa.listWorkOrderActivityDetail
                });
                if(woa.isPlanned){
                    pstore.add(model);
                }
                else{
                    upstore.add(model);
                }
            }
        }
    },
            
    updateHours: function(){
        var pManHours= Ext.getCmp('performedManHours');
        var pMachineHours= Ext.getCmp('performedMachineHours');
        var countManHours = 0;
        var countMachineHours = 0;
        var gridScheduled = this.getScheduledActivityGrid();
        var newGrid = this.getNewActivityGrid();
        for(var i = 0; i<gridScheduled.store.getCount(); i++){
            var record=gridScheduled.store.getAt(i);
            if(record.data.isPerformed){
                countManHours=countManHours+record.data.performedManHours;
                countMachineHours=countMachineHours+record.data.performedMachineHours;
            }
        }
        
        for(var i = 0; i<newGrid.store.getCount(); i++){
            var record=newGrid.store.getAt(i);
            countManHours=countManHours+record.data.performedManHours;
            countMachineHours=countMachineHours+record.data.performedMachineHours;
        }
        var manHours = Ext.getCmp('manHours').getValue();
        var machineHours = Ext.getCmp('machineHours').getValue();
        
        var sumCountHours = manHours + machineHours;
        
        var percentage = 0;
        if(sumCountHours > 0){
            percentage = ((countMachineHours + countManHours) * 100) / (sumCountHours);
        }
        Ext.getCmp('percentageUsageResources').setValue(percentage.toFixed(2));
        pManHours.setValue(countManHours);    
        pMachineHours.setValue(countMachineHours);    
        
    },
            
    commontListActivities: function(scheduledStore, store){ 
        var activities = new Array();
       
        for(var i = 0; i < scheduledStore.getCount(); i++){
            var listWorkOrderActivityDetail = [];
            var record = scheduledStore.getAt(i);
            var idUnperformedReason = 0;
            if(!record.data.isPerformed)
                idUnperformedReason = record.data.idUnperformedReason;
            if(record.data.listWorkOrderActivityDetail != '')
                listWorkOrderActivityDetail = record.data.listWorkOrderActivityDetail;
                
            var activity = {
                idWorkOrderActivity: record.data.idWorkOrderActivity,
                activityOt: {idActivityOt: record.data.idActivityOt},
                manHours: record.data.manHours,
                machineHours: record.data.machineHours,
                isPlanned: true,
                isPerformed: record.data.isPerformed,
                performedManHours: record.data.performedManHours,
                performedMachineHours: record.data.performedMachineHours,
                unperformedReason: {idUnperformedReason: idUnperformedReason},
                listWorkOrderActivityDetail: listWorkOrderActivityDetail
            };
            activities.push(activity);
        }
        
        for(var i = 0; i < store.getCount(); i++){
            var listWorkOrderActivityDetail = [];
            var record = store.getAt(i);
            if(record.data.listWorkOrderActivityDetail != '')
                listWorkOrderActivityDetail = record.data.listWorkOrderActivityDetail;
            var activity = {
                activityOt: {idActivityOt: record.data.idActivityOt},
                isPlanned: false,
                isPerformed: true,
                performedManHours: record.data.performedManHours,
                performedMachineHours: record.data.performedMachineHours,
                listWorkOrderActivityDetail : listWorkOrderActivityDetail
            };
            activities.push(activity);
        }
        return activities;
    },
            
    commontListProducts: function(store){
        var products = new Array();
        for(var i = 0; i < store.getCount(); i++){
            var record = store.getAt(i);
            var product = {
                product: {idProduct: record.data.idProduct},
                quantity: record.data.quantity,
                measureUnit: {idMeasureUnit: record.data.idMeasureUnit}
            };
            products.push(product);
        }
        return products;
    },
            
    commontListScheduledProducts: function(store){
        var products = new Array();
        for(var i = 0; i < store.getCount(); i++){
            var record = store.getAt(i);
            var usedQuantity = 0;
            if(record.data.isUsed) usedQuantity = record.data.usedQuantity;
            var product = {
                idWorkOrderScheduledProduct: record.data.idWorkOrderScheduledProduct,
                quantity: record.data.quantity,
                measureUnit: {idMeasureUnit: record.data.idMeasureUnit},
                isUsed: record.data.isUsed,
                usedQuantity: usedQuantity
            };
            products.push(product);
        }
        return products;
    },
            
    commontEmployess: function(store){
        var employees = new Array();
        for(var i = 0; i < store.getCount(); i++){
            var record = store.getAt(i);
            var employee = {
                employee: {idEmployee: record.data.idEmployee}
            };
            employees.push(employee);
        }
        return employees;
    },
    validateActivityHours:function(formPanel){
        var me = this;
        var activitiesStore = formPanel.down('#newActivityGrid').getStore();
        var emptyActivitiesFlag = false;
        for(var i = 0; i < activitiesStore.getCount(); i++) {
            var record = activitiesStore.getAt(i);
            var machineHours = record.data['performedMachineHours'];
            var manHours = record.data['performedManHours'];
            var activityHours = machineHours + manHours;
            if(activityHours <= 0) {
                emptyActivitiesFlag = true;
                break;
            }
        }
        if(emptyActivitiesFlag) {
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.emptyActivities);
            return false;
        }
        var activitiesSchedulesStore = formPanel.down('#activityExecutionOtGrid').getStore();
        var emptyActivitiesFlag = false;
        for(var i = 0; i < activitiesSchedulesStore.getCount(); i++) {
            var record = activitiesSchedulesStore.getAt(i);
            var isExecute = record.data['isPerformed'];
            if(isExecute){
                var machineHours = record.data['performedMachineHours'];
                var manHours = record.data['performedManHours'];
                var activityHours = machineHours + manHours;
                if(activityHours <= 0) {
                    emptyActivitiesFlag = true;
                    break;
                }
            }
        }
        if(emptyActivitiesFlag) {
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.emptyActivities);
            return false;
        }
        return true;
    },
    beforeSave: function(values,formPanel){
            var idQuadrille = Ext.getCmp('idQuadrille').getValue();
            var idResponsibleOfInstallation = Ext.getCmp('idResponsibleOfInstallation').getValue();
            var percentageAdvance = Ext.getCmp('percentageAdvance').getValue();
            var percentageUsageResources = Ext.getCmp('percentageUsageResources').getValue();
            var idWorkOrder = this.getWorkOrderExecutionForm().getRecord().data.idWorkOrder;
            var ownResources = this.getWorkOrderExecutionForm().getRecord().data.ownResources;
            var scheduledActivityStore = Ext.getCmp('activityExecutionOtGrid').getStore();
            var activityStore = Ext.getCmp('newActivityGrid').getStore();
            var scheduledProductStore = Ext.getCmp('workOrderScheduledProductGrid').getStore(); 
            var productStore = Ext.getCmp('workOrderProductGrid').getStore(); 
            var employeeStore = Ext.getCmp('quadrilleEmployeesGrid').getStore();
            values.idWorkOrder = idWorkOrder;

            values.percentageUsageResources = percentageUsageResources;
            values.executionStartDate = Ext.Date.format(Ext.getCmp('executionStartDate').getValue(), 'd-m-Y');
            values.executionEndDate = Ext.Date.format(Ext.getCmp('executionEndDate').getValue(), 'd-m-Y');
            values.activities = JSON.stringify(this.commontListActivities(scheduledActivityStore, activityStore));
            values.products = JSON.stringify(this.commontListProducts(productStore));
            values.scheduledProducts = JSON.stringify(this.commontListScheduledProducts(scheduledProductStore));
            values.comment = Ext.getCmp('comment').getValue();

            if(percentageAdvance == '' || percentageAdvance == null || !Ext.isDefined(percentageAdvance))
                percentageAdvance = 0;

            values.percentageAdvance = percentageAdvance;

            if(Ext.isDefined(idResponsibleOfInstallation) && idResponsibleOfInstallation !== null && idResponsibleOfInstallation !== '')
                values.idResponsibleOfInstallation = idResponsibleOfInstallation;

            if(ownResources){
                values.employees = JSON.stringify(this.commontEmployess(employeeStore));
                values.idQuadrille = idQuadrille;
            }
    },
            
    saveOrder: function(button, url){
        var me = this;
        var values = {};
        
         
            var formPanel = button.up("form");
      if(this.validateActivityHours(formPanel)){
            this.beforeSave(values,formPanel);
            Ext.BaseAjax.request({
                url: url,
                method: 'POST',
                params: values,
                success: function(response, options){
                    var objResponse = Ext.decode(response.responseText);
                    if(objResponse.success === true){
                        if(me.listStore !== null){
                            me.listStore.reload();
                        }
                        var window = button.up('window');
                        window.close();
                    }
                    else{
                        showAlertMessage(me.messages.alertErrorSave);
                    }
                },
                failure: function(response, options){
                }
            });
       }
    },
    
    partialSave: function(button){
        var me = this;
        if(me.validActivityDateOnSave()){
            this.saveOrder(button, 'rest/workOrder/partialExecution.htm');
        }
        else{
            showAlertMessage(me.messages.alertActivitiesInvalid);
        }
    },
    
    completeExecution: function(button){
        var me = this;
        var record = this.getWorkOrderExecutionForm().getRecord();
        var win = button.up('window');
        var form = win.down('form');
        if(me.validateActivityHours(form)){
        if(!form.isValid()) return;
        Ext.Msg.show({
            title: me.messages.msgTitleSaveConfirmation,
            msg: Ext.String.format(me.messages.msgConfirmComploteOrder, record.data.workOrderFullNumber),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(res){
                if(res === 'yes'){
                    if(me.validCompleteExecution()){
                        if(me.validActivityDateOnSave()){
                            me.validEvidenceDocumentType(button);
                        }
                        else{
                            showAlertMessage(me.messages.alertActivitiesInvalid);
                        }
                    }
                }
            }
        });
        }
    },
    
    validCompleteExecution: function(){
        var me = this;
        var message = '';
        var record = this.getWorkOrderExecutionForm().getRecord();
        var scheduledActivityStore = Ext.getCmp('activityExecutionOtGrid').getStore();
        var activityStore = Ext.getCmp('newActivityGrid').getStore();
       //var scheduledProductStore = Ext.getCmp('workOrderScheduledProductGrid').getStore(); 
        //var productStore = Ext.getCmp('workOrderProductGrid').getStore(); 
        var employeeStore = Ext.getCmp('quadrilleEmployeesGrid').getStore();
        
        if(scheduledActivityStore.find('isPerformed', true) < 0 && activityStore.getCount() === 0){
            message += '<li>' + me.messages.alertActivity + '</li>';
        }
        
//        if(scheduledProductStore.find('isUsed', true) < 0 && productStore.getCount() === 0){
//            message += '<li>' + me.messages.alertProduct + '</li>';
//        }
        
        if(record.data.ownResources){
            if(employeeStore.getCount() === 0){
                message += '<li>' + me.messages.alertEmployee + '</li>';
            }
        }
        
        if(Ext.getCmp('percentageAdvance').getValue() === '' || Ext.getCmp('percentageAdvance').getValue() === null){
            message += '<li>' + me.messages.inputPercentageAdvance + '</li>';
        }
        
        if(Ext.getCmp('executionEndDate').getValue() === '' || Ext.getCmp('executionEndDate').getValue() === null){
            message += '<li>' + me.messages.inputExecutionEndDate+ '</li>';
        }
        
        if(Ext.getCmp('idResponsibleOfInstallation').getValue() === '' || Ext.getCmp('idResponsibleOfInstallation').getValue() === null){
            message += '<li>' + me.messages.inputResponsibleOfInstallation+ '</li>';
        }
        
        if(message !== ''){
            message = '<ul>' + message + '</ul>';
            message = Ext.String.format(me.messages.alertGeneral, record.data.workOrderFullNumber) + '<br>' + message;
            showAlertMessage(message);
            return false;
        }
        return true;
    },
            
    validEvidenceDocumentType: function(button){
        var me = this;
        var evidenceTypeStore = Ext.create('sisprod.store.EvidenceDocumentTypeAll');
        evidenceTypeStore.load({
            callback: function(){
                var grid = Ext.getCmp('evidenceFilesGrid');
                if(Ext.isDefined(grid)){
                    var storeGrid = grid.getStore();
                    var messageAlert = '';
                    for(var i = 0; i < evidenceTypeStore.getCount(); i++){
                        var record = evidenceTypeStore.getAt(i);
                        if(record.data.required){
                            if(storeGrid.find('evidenceDocumentType.idEvidenceDocumentType', record.data.idEvidenceDocumentType) < 0){
                                messageAlert += '<li>' + record.data.evidenceDocumentTypeName + '</li>';
                            }
                        }
                    }
                    if(messageAlert !== ''){
                        messageAlert = me.messages.alertNoFounAllEvidenceTypeRequired + '<br>'+ '<ul>' + messageAlert + '</ul>';
                        showAlertMessage(messageAlert);
                        return false;
                    }
                    else{
                        me.saveOrder(button, 'rest/workOrder/completeExecution.htm');
                    }
                }
            }
        });
    },
            
    setProductInGrid: function(list){
        var grid = Ext.getCmp('workOrderProductGrid');
        if(grid !== null){
            var pstore = grid.getStore();
            for(var i = 0; i < list.length; i++){
                var p = list[i];
                var model = Ext.create('sisprod.model.WorkOrderProductModel', {
                    idWorkOrderProduct: p.idWorkOrderProduct,
                    idProduct: p.product.idProduct,
                    productName: p.product.productName,
                    productCode: p.product.productCode,
                    productPrice: p.product.price,
                    productStock: p.product.stock,
                    productStore: p.product.store,
                    quantity: p.quantity,
                    idMeasureUnit: p.measureUnit.idMeasureUnit,
                    measureUnitName: p.measureUnit.measureUnitName
                });
                pstore.add(model);
            }
        }
    },
            
    setScheduledProductInGrid: function(list){
        var grid = Ext.getCmp('workOrderScheduledProductGrid');
        if(grid !== null){
            var pstore = grid.getStore();
            for(var i = 0; i < list.length; i++){
                var p = list[i];
                var model = Ext.create('sisprod.model.WorkOrderScheduledProductModel', {
                    idWorkOrderScheduledProduct: p.idWorkOrderScheduledProduct,
                    idProduct: p.product.idProduct,
                    productName: p.product.productName,
                    productCode: p.product.productCode,
                    productPrice: p.product.price,
                    productStock: p.product.stock,
                    productStore: p.product.store,
                    quantity: p.quantity,
                    idMeasureUnit: p.measureUnit.idMeasureUnit,
                    measureUnitName: p.measureUnit.measureUnitName,
                    isUsed: p.isUsed,
                    usedQuantity: p.usedQuantity
                });
                pstore.add(model);
            }
        }
    },
            
    setQuadrilleEmployeeInGrid: function(list){
        var grid = Ext.getCmp('quadrilleEmployeesGrid');
        
        if(grid !== null){
            var pstore = grid.getStore();
            for(var i = 0; i < list.length; i++){
                var e = list[i];
                var model = Ext.create('sisprod.model.EmployeeTempModel', {
                    idEmployee: e.employee.idEmployee,
                    idPerson: e.employee.person.idPerson,
                    personFullName: e.employee.person.personFullName,
                    fullDocumentNumber: e.employee.person.fullDocumentNumber
                });
                pstore.add(model);
            }
        }
    },
            
    loadActivityDetail: function(){
        var viewDetail = this.getWorkOrderActivityDetail();
        var record = viewDetail.record;
        var store = viewDetail.store;
        var listDetail = record.data.listWorkOrderActivityDetail;
        store.loadData([]);
        for(var i = 0; i < listDetail.length; i++){
            var d = Ext.create('sisprod.model.WorkOrderActivityDetailModel',{
                idWorkOrderActivity: listDetail[i].idWorkOrderActivity,
                activityDate: listDetail[i].activityDate,
                manHours: listDetail[i].manHours,
                machineHours: listDetail[i].machineHours,
                description: listDetail[i].description
            });
            store.add(d);
        }
    },
            
    refreshTotalHours: function(button){
        var me = this;
        var win = button.up('window');
        var view = this.getWorkOrderActivityDetail();
        var store = view.store;
        var record = view.record;
        var listDeatil = new Array();
        var sumManHours = 0;
        var sumMachineHours = 0;
        var countErrorRange = 0;
        var countErrorNow = 0;
        for(var i = 0; i < store.getCount(); i++){
            var r = store.getAt(i);
            if(r.data.isValid == '0'){
                countErrorRange ++;
            }
            else if(r.data.isValid == '2'){
                countErrorNow ++;
            }
            var d = {
                idWorkOrderActivityDetail: r.data.idWorkOrderActivityDetail,
                idWorkOrderActivity: r.data.idWorkOrderActivity,
                activityDate: r.data.activityDate,
                manHours: r.data.manHours,
                machineHours: r.data.machineHours,
                description: r.data.description,
                stringDate: Ext.Date.format(r.data.activityDate, 'Y-m-d')
            };
            listDeatil.push(d);
            sumManHours += r.data.manHours;
            sumMachineHours += r.data.machineHours;
        }
        
        if(countErrorRange > 0 || countErrorNow > 0){
            var message = '';
            if(countErrorRange > 0)
                message = '<li>' + me.messages.alertActivitiesInvalid + '</li>';
            if(countErrorNow > 0)
                message = message + '<li>' + me.messages.alertErrorNow + '</li>';
            message = '<ul>' + message + '</ul>';
            showAlertMessage(message);
            return;
        }
        record.data.listWorkOrderActivityDetail = listDeatil;
        record.set('performedManHours', sumManHours);
        record.set('performedMachineHours', sumMachineHours);
        this.updateHours();
        win.close();
    },
            
    validActivityDateOnSave: function(){    
        var me = this;
        var scheduledActivityStore = Ext.getCmp('activityExecutionOtGrid').getStore();
        var activityStore = Ext.getCmp('newActivityGrid').getStore();
        var returnValue = true;
        for(var i = 0; i < scheduledActivityStore.getCount(); i++){
            var listDetail = scheduledActivityStore.getAt(i).data.listWorkOrderActivityDetail;
            var error = false;
            for(var j = 0; j < listDetail.length; j++){
                var object = listDetail[j];
                if(!me.validActivityDate(object)){
                    returnValue = false;
                    error = true;
                    break;
                }
            }
            if(error == true){
                break;
            }
        }
        if(returnValue == true){
            for(var i = 0; i < activityStore.getCount(); i++){
                var listDetail = activityStore.getAt(i).data.listWorkOrderActivityDetail;
                var error = false;
                for(var j = 0; j < listDetail.length; j++){
                    var object = listDetail[j];
                    if(!me.validActivityDate(object)){
                        returnValue = false;
                        error = true;
                        break;
                    }
                }
                if(error == true){
                    break;
                }
            }
        }
        return returnValue;
    },
            
    validActivityDate: function(object){
        var txtExecutionStartDate = Ext.getCmp('executionStartDate');
        var txtExecutionEndDate = Ext.getCmp('executionEndDate');
        var returnValue = true;
        if(Ext.isDefined(txtExecutionStartDate) && Ext.isDefined(txtExecutionEndDate)){
            var startDate = txtExecutionStartDate.getValue();
            var endDate = txtExecutionEndDate.getValue();
            var activityDate = Ext.Date.parseDate(object.stringDate, 'Y-m-d')
            if(activityDate == null || activityDate == ''){
                returnValue = false;
            }
            if((startDate == null || startDate == '') && (endDate != null && endDate != '')){
                if(activityDate > endDate){
                    returnValue = false;
                }
            }
            else if((endDate == null || endDate == '') && (startDate != null && startDate != '')){
                if(activityDate < startDate){
                    returnValue = false;
                }
            }
            else if(activityDate < startDate || activityDate > endDate){
                    returnValue = false;
            }
        }
        return returnValue;
    },
    
    validExecutionEndDate: function(obj){
        var me = this;
        Ext.BaseAjax.request({
            url:'rest/workOrder/getCurrentDate.htm',
            method: 'POST',
            async: false,
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                var currentDate = Ext.Date.parse(data.currentDate, 'Y-m-d');
                if(obj.getValue() > currentDate){
                    showAlertMessage(me.messages.alertExecutionEndDate);
                    obj.setValue("");
                }
            }
        });
    }
}); 

