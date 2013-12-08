/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WorkOrderClosableController', {
   extend: 'sisprod.controller.Base',
   refs: [
       {ref: 'workOrderClosableForm', selector: 'workOrderClosableForm'},
       {ref: 'workOrderConsult', selector: 'workOrderConsult'},
       {ref: 'listWorkRequestAll', selector: 'listWorkRequestAll'},
       {ref: 'scheduledActivityGrid', selector: 'scheduledActivityGrid'},
       {ref: 'workOrderObservation', selector: 'workOrderObservation'},
       {ref: 'newActivityGrid', selector: 'newActivityGrid'}
   ],
   models : ['WorkOrderActivityModel'],
   entityName: 'WorkOrderForTaskGeneralScheduler',
   checkOutPermissions: false,
   stores: ['UnperformedReasonAll'],
   
   requires: ['sisprod.store.UnperformedReasonAll'],
   
   listActivities: null,
   listStore: null,
   
   messages: {
       titleObserve: 'Observe Work Order',
       confirmText: 'Are you sure you want Observer {0}?',
       msgConfirmCloseOrder: 'Are you sure you want Close {0}?',
       titleClose: 'Close Work Order'
   },
  
   init : function(){
//        this.createWorkOrderActivityStore('activityOtStoreGrid');
//        this.createQuadrilleEmployeesStore('quadrilleEmployeeStoreGrid');
//        this.createScheduleProductStore('scheduledProductStore');
//        this.createProductStore('productStoreGrid');
        this.control({
           'workOrderClosableForm button[action=saveObservation]': {
               click: this.saveObservation
           },
           
           'workOrderClosableForm button[action=closeOrder]': {
               click: this.completeClosable
           },
           
           'workOrderClosableForm':{
               beforerender: this.loadForm
           },
           
           'workOrderConsult':{
               beforerender: this.loadFormConsult
           },
           
           'workOrderClosableForm button[action=uploadFile]':{
               click: this.showUploadForm
           },
           
           'workOrderObservation button[action=observeOrder]':{
               click: this.observeOrder
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
            idWorkOrder:me.getWorkOrderClosableForm().getRecord().data.idWorkOrder,
            storeRef:evidenceGrid.getStore(),
            controller:controller
        });        
        addEvidence.show();
    },
    observeOrder:function(button){
        var me = this;
        var fullNumberWorkOrder = this.getWorkOrderObservation().record.data.workOrderFullNumber;
        var windowParent = this.getWorkOrderObservation().parent;
        var idWorkOrder = this.getWorkOrderObservation().record.data.idWorkOrder;
        var observation = Ext.getCmp('Observation').getValue();
        Ext.Msg.show({
            title: me.messages.titleObserve,
            msg: Ext.String.format(me.messages.confirmText, fullNumberWorkOrder ),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(resp){
                if(resp==="yes"){
                    Ext.BaseAjax.request({
                        url: 'rest/workOrder/ObserveWorkOrder.htm',
                        method: "POST",
                        params: {idWorkOrder: idWorkOrder, observation: observation},
                        success: function(response){
                            var window = button.up('window');
                            var listStore = me.listStore;
                            if(!Ext.isDefined(listStore)) return;
                            var objResponse = Ext.decode(response.responseText);
                            if(Ext.isDefined(objResponse.success) && objResponse.success === true){
                                if(Ext.isDefined(listStore) && listStore !== null) listStore.reload();
                                window.close();
                                if(Ext.isDefined(windowParent)) windowParent.close();
                            }
                            else {
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
//        Ext.create('Ext.data.Store',{
//            storeId: id,
//            model: 'sisprod.model.WorkOrderScheduledProductModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
    },
            
    createProductStore: function(id){
//        Ext.create('Ext.data.Store',{
//            storeId: id,
//            model: 'sisprod.model.WorkOrderProductModel',
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
        var view = this.getWorkOrderClosableForm();
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
    loadFormConsult: function(window){
        var me = this;
        var view = this.getWorkOrderConsult();
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
                    me.setFormConsultData(window, data, record);
                }
            });
        }
    },
    
    clearStores: function(){
        var scheduledActivityStore = Ext.getCmp('activityClosableOtGrid').getStore();
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
            this.clearStores();
            me.setWorkOrderDataInForm(formPanel, wo);
            me.setActivitiesInGrids(data.listWorkOrderActivity);
            me.setProductInGrid(data.listWorkOrderProduct);
            me.setScheduledProductInGrid(data.listWorkOrderScheduledProduct);
            me.updateHours();
            if(Ext.isDefined(data.listQuadrilleEmployee) && data.listQuadrilleEmployee != null)
                me.setQuadrilleEmployeeInGrid(data.listQuadrilleEmployee);
        }
    },
            
    setFormConsultData: function(window, data, record){
        var me = this;
        var wo = data.workOrder;
        var formPanel = window.down('form');
        if(formPanel!==null){
            this.clearStores();
            me.setWorkOrderConsultDataInForm(formPanel, wo);
            me.setActivitiesInGrids(data.listWorkOrderActivity);
            me.setProductInGrid(data.listWorkOrderProduct);
            me.setScheduledProductInGrid(data.listWorkOrderScheduledProduct);
            me.updateHours();
            if(Ext.isDefined(data.listQuadrilleEmployee) && data.listQuadrilleEmployee != null)
                me.setQuadrilleEmployeeInGrid(data.listQuadrilleEmployee);
        }
    },
            
    setWorkOrderDataInForm: function(formPanel, wo){
       
        formPanel.query('[name=manHours]')[0].setValue(wo.manHours);
        formPanel.query('[name=machineHours]')[0].setValue(wo.machineHours);
        formPanel.query('[name=performedManHours]')[0].setValue(wo.performedManHours);
        formPanel.query('[name=performedMachineHours]')[0].setValue(wo.performedMachineHours);
        formPanel.query('[name=performedMachineHours]')[0].setValue(wo.performedMachineHours);
        formPanel.query('[name=idWorkOrder]')[0].setValue(wo.idWorkOrder);
        if(!wo.isDirectWorkOrder){
            formPanel.query('[name=workRequestFullNumber]')[0].setValue(wo.workRequest.workRequestFullNumber);
            formPanel.query('[name=workRequestSourceName]')[0].setValue(wo.workRequest.workRequestSource.workRequestSourceName);
            formPanel.query('[name=equipmentName]')[0].setValue(wo.workRequest.equipment.equipmentName);
            formPanel.query('[name=attentionMaximumDate]')[0].setValue(wo.workRequest.attentionMaximumDate);
            formPanel.query('[name=taskSchedulerName]')[0].setValue(wo.taskScheduler.employee.person.personFullName);
            formPanel.query('[name=locationName]')[0].setValue(wo.location.locationName);
        }else{
            formPanel.query('[name=idLot]')[0].setValue(wo.lot.lotName);
            formPanel.query('[name=executionStartDate]')[0].setValue(wo.executionStartDate);
            formPanel.query('[name=executionEndDate]')[0].setValue(wo.executionEndDate);
            formPanel.query('[name=comment]')[0].setValue(wo.comment);
            formPanel.query('[name=idWorkOrderReason]')[0].setValue(wo.workOrderReason.workOrderReasonName);
            formPanel.query('[name=idEquipment]')[0].setValue(wo.equipment.equipmentName);
            formPanel.query('[name=idSelectEquipmentType]')[0].setValue(wo.equipment.equipmentType.equipmentTypeName);
            formPanel.query('[name=workOrderFullNumber]')[0].setValue(wo.workOrderFullNumber);
            
        }
        formPanel.query('[name=sectorName]')[0].setValue(wo.sector.sectorName);
        
        formPanel.query('[name=workCategoryName]')[0].setValue(wo.workCategoryDetail.workCategory.workCategoryName);
        formPanel.query('[name=workCategoryDetailName]')[0].setValue(wo.workCategoryDetail.workCategoryDetailName);
        
        formPanel.query('[name=description]')[0].setValue(wo.description);
        formPanel.query('[name=workshopName]')[0].setValue(wo.workShop.workShopName);
        if(!wo.ownResources){
            formPanel.query('[name=entityName]')[0].setValue(wo.wOThirdPartyResource.supplier.entity.entityName);      
            formPanel.query('[name=serviceOrderNumber]')[0].setValue(wo.wOThirdPartyResource.serviceOrderNumber);     
        }else{
            formPanel.query('[name=quadrileName]')[0].setValue(wo.wOOwnResources.quadrille.quadrilleName);
//            formPanel.query('[name=idQuadrille]')[0].setValue(wo.wOOwnResources.quadrille.idQuadrille);
        }
//        formPanel.query('[name=quadrileName]')[0].setValue(wo.wOOwnResources.quadrille.quadrilleName);
//        formPanel.query('[name=idQuadrille]')[0].setValue(wo.wOOwnResources.quadrille.idQuadrille);
        
        
        formPanel.query('[name=workshopCoordinatorName]')[0].setValue(wo.workShopCoordinator.employee.person.personFullName);        
        formPanel.query('[name=startDate]')[0].setValue(wo.scheduledStartDate);      
        formPanel.query('[name=endDate]')[0].setValue(wo.scheduledEndDate);      
        formPanel.query('[name=percentageUsageResources]')[0].setValue(wo.percentageUsageResources);   
        formPanel.query('[name=percentageAdvance]')[0].setValue(wo.percentageAdvance); 
        formPanel.query('[name=executionStartDate]')[0].setValue(wo.executionStartDate);   
        formPanel.query('[name=executionEndDate]')[0].setValue(wo.executionEndDate);   
        formPanel.query('[name=comment]')[0].setValue(wo.comment);  
//        if(wo.wOThirdPartyResource !== null){
//            formPanel.query('[name=entityName]')[0].setValue(wo.wOThirdPartyResource.entity.entityName);      
//            formPanel.query('[name=serviceOrderNumber]')[0].setValue(wo.wOThirdPartyResource.serviceOrderNumber);     
//        }
    },
    setWorkOrderConsultDataInForm: function(formPanel, wo){
        formPanel.query('[name=manHours]')[0].setValue(wo.manHours);
        formPanel.query('[name=machineHours]')[0].setValue(wo.machineHours);
        formPanel.query('[name=performedManHours]')[0].setValue(wo.performedManHours);
        formPanel.query('[name=performedMachineHours]')[0].setValue(wo.performedMachineHours);
        formPanel.query('[name=performedMachineHours]')[0].setValue(wo.performedMachineHours);
        formPanel.query('[name=idWorkOrder]')[0].setValue(wo.idWorkOrder);
        formPanel.query('[name=workshopName]')[0].setValue(wo.workShop.workShopName);
        if(!wo.wOOwnResources){
            formPanel.query('[name=entityName]')[0].setValue(wo.wOThirdPartyResource.supplier.entity.entityName);      
            formPanel.query('[name=serviceOrderNumber]')[0].setValue(wo.wOThirdPartyResource.serviceOrderNumber);     
        }else{
            formPanel.query('[name=quadrileName]')[0].setValue(wo.wOOwnResources.quadrille.quadrilleName);
            formPanel.query('[name=idQuadrille]')[0].setValue(wo.wOOwnResources.quadrille.idQuadrille);
        }
        formPanel.query('[name=workshopCoordinatorName]')[0].setValue(wo.workShopCoordinator.employee.person.personFullName);        
        formPanel.query('[name=startDate]')[0].setValue(wo.scheduledStartDate);      
        formPanel.query('[name=endDate]')[0].setValue(wo.scheduledEndDate);      
        formPanel.query('[name=percentageUsageResources]')[0].setValue(wo.percentageUsageResources);   
        formPanel.query('[name=percentageAdvance]')[0].setValue(wo.percentageAdvance);   
        formPanel.query('[name=executionStartDate]')[0].setValue(wo.executionStartDate);   
        formPanel.query('[name=executionEndDate]')[0].setValue(wo.executionEndDate);   
        formPanel.query('[name=comment]')[0].setValue(wo.comment);  
//        if(wo.wOThirdPartyResource !== null){
//            formPanel.query('[name=entityName]')[0].setValue(wo.wOThirdPartyResource.entity.entityName);      
//            formPanel.query('[name=serviceOrderNumber]')[0].setValue(wo.wOThirdPartyResource.serviceOrderNumber);     
//        }
    },
            
    setActivitiesInGrids: function(listWorkOrderActivity){
        var pgrid = Ext.getCmp('activityClosableOtGrid');
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
                    idUnperformedReason: idUnperformedReason
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
        
        var percentage = ((countMachineHours + countManHours) * 100) / (manHours + machineHours);
        Ext.getCmp('percentageUsageResources').setValue(percentage.toFixed(2));
        pManHours.setValue(countManHours);    
        pMachineHours.setValue(countMachineHours);    
        
    },
            
    commontListActivities: function(scheduledStore, store){ 
        var activities = new Array();
        for(var i = 0; i < scheduledStore.getCount(); i++){
            var record = scheduledStore.getAt(i);
            var idUnperformedReason = 0;
            if(!record.data.isPerformed)
                idUnperformedReason = record.data.idUnperformedReason;
            var activity = {
                idWorkOrderActivity: record.data.idWorkOrderActivity,
                activityOt: {idActivityOt: record.data.idActivityOt},
                manHours: record.data.manHours,
                machineHours: record.data.machineHours,
                isPlanned: true,
                isPerformed: record.data.isPerformed,
                performedManHours: record.data.performedManHours,
                performedMachineHours: record.data.performedMachineHours,
                unperformedReason: {idUnperformedReason: idUnperformedReason}
            };
            activities.push(activity);
        }
        
        for(var i = 0; i < store.getCount(); i++){
            var record = store.getAt(i);
            var activity = {
                activityOt: {idActivityOt: record.data.idActivityOt},
                isPlanned: false,
                isPerformed: true,
                performedManHours: record.data.performedManHours,
                performedMachineHours: record.data.performedMachineHours
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
            
    beforeSave: function(values){
        var idQuadrille = Ext.getCmp('idQuadrille').getValue();
        var percentageAdvance = Ext.getCmp('percentageAdvance').getValue();
        var percentageUsageResources = Ext.getCmp('percentageUsageResources').getValue();
        var idWorkOrder = this.getWorkOrderClosableForm().getRecord().data.idWorkOrder;
        var ownResources = this.getWorkOrderClosableForm().getRecord().data.ownResources;
        var scheduledActivityStore = Ext.getCmp('activityClosableOtGrid').getStore();
        var activityStore = Ext.getCmp('newActivityGrid').getStore();
        var scheduledProductStore = Ext.getCmp('workOrderScheduledProductGrid').getStore(); 
        var productStore = Ext.getCmp('workOrderProductGrid').getStore(); 
        var employeeStore = Ext.getCmp('quadrilleEmployeesGrid').getStore();
        values.idQuadrille = idQuadrille;
        values.idWorkOrder = idWorkOrder;
        values.percentageAdvance = percentageAdvance;
        values.percentageUsageResources = percentageUsageResources;
        values.activities = JSON.stringify(this.commontListActivities(scheduledActivityStore, activityStore));
        values.products = JSON.stringify(this.commontListProducts(productStore));
        values.scheduledProducts = JSON.stringify(this.commontListScheduledProducts(scheduledProductStore));
        
        if(!ownResources)
            values.employees = JSON.stringify(this.commontEmployess(employeeStore));
    },
            
    saveOrder: function(button, url){
        var me = this;
        var values = {};
        this.beforeSave(values);
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
    },
    
    saveObservation: function(button){
//        var idWorkOrder = this.getWorkOrderClosableForm().getRecord().data.idOWrkOrder;
        var record = this.getWorkOrderClosableForm().getRecord();
        var windowClose = Ext.create('sisprod.view.WorkOrderClosable.WorkOrderObservation',{
            record: record,
            parent: button.up('window')
        });
        windowClose.show();
//        var record = selection.raw;
//        var idWorkOrder = record['idWorkOrder'];
//        this.saveOrder(button, 'rest/workOrder/partialClosable.htm');
    },
    
    completeClosable: function(button){
        var fullNumberWorkOrder = this.getWorkOrderClosableForm().record.data.workOrderFullNumber;
        var idWorkOrder = this.getWorkOrderClosableForm().record.data.idWorkOrder;
        var me = this;
        Ext.Msg.show({
            title: me.messages.titleClose, 
            msg: Ext.String.format(me.messages.msgConfirmCloseOrder , fullNumberWorkOrder),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(res){
                if(res === 'yes'){
                    Ext.BaseAjax.request({
                        url: 'rest/workOrder/CloseWorkOrder.htm',
                        method: "POST",
                        params: {idWorkOrder: idWorkOrder},
                        success: function(response){
                            var listStore = me.listStore;
                            if(!Ext.isDefined(listStore)) return;
                            var window = button.up('window');
                            var objResponse = Ext.decode(response.responseText);
                            if(Ext.isDefined(objResponse.success) && objResponse.success === true){
                                if(Ext.isDefined(listStore) && listStore !== null) listStore.reload();
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
    
    validCompleteClosable: function(){
        var me = this;
        var message = '';
        var record = this.getWorkOrderClosableForm().getRecord();
        var scheduledActivityStore = Ext.getCmp('activityClosableOtGrid').getStore();
        var activityStore = Ext.getCmp('newActivityGrid').getStore();
        var scheduledProductStore = Ext.getCmp('workOrderScheduledProductGrid').getStore(); 
        var productStore = Ext.getCmp('workOrderProductGrid').getStore(); 
        var employeeStore = Ext.getCmp('quadrilleEmployeesGrid').getStore();
        
        if(scheduledActivityStore.find('isPerformed', true) < 0 && activityStore.getCount() === 0){
            message += '<li>' + me.messages.alertActivity + '</li>';
        }
        
        if(scheduledProductStore.find('isUsed', true) < 0 && productStore.getCount() === 0){
            message += '<li>' + me.messages.alertProduct + '</li>';
        }
        
        if(!record.data.ownResources){
            if(employeeStore.getCount() === 0){
                message += '<li>' + me.messages.alertEmployee + '</li>';
            }
        }
        
        if(Ext.getCmp('percentageAdvance').getValue() === '' || Ext.getCmp('percentageAdvance').getValue() === null){
            message += '<li>' + me.messages.inputPercentageAdvance + '</li>';
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
                        me.saveOrder(button, 'rest/workOrder/completeClosable.htm');
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
    }
}); 

