/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.DirectWorkOrderController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkOrderStore', 'LotAll', 'SectorAll'],
   models : ['WorkOrderModel'],
   entityName: 'DirectWorkOrder',
   checkOutPermissions: false,
   refs: [{ref: 'listDirectWorkOrder', selector: 'listDirectWorkOrder'}, 
       {ref: 'workOrderActivityDetailDirect', selector: 'workOrderActivityDetailDirect'},
       {ref: 'updateDirectWorkOrder', selector: 'updateDirectWorkOrder'}],
   views : ['DirectWorkOrder.ListDirectWorkOrder'],
   
   requires: [
       'sisprod.store.WorkOrderStore',
       'sisprod.store.LotAll',
       'sisprod.store.SectorAll',
       'sisprod.store.EquipmentTypeAll'
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
           scheduledStartDate: 'Scheduled Start Date',
           scheduledEndDate: 'Scheduled End Date',
           quadrille: 'Quadrille'
       },
       noActivityRegister:'Register at least one Activity',
       workTemplateSave:'Template saved success',
       alertActivity: 'Should at least record the execution of an activity (planned or new)',
       alertProduct: 'Should at least record the use of a material (planned or new)',
       alertNoFounAllEvidenceTypeRequired: 'Must register at least one document of evidence of the following types:',
       alertActivitiesInvalid: '¡Hay actividades con ejecuciones fuera del rango del ejecución de la orden, proceda a corregir!',
       alertDetailInValid: 'No dated activity executions outside the range of order execution!',
       quadrille: 'Quadrille',
       alertErrorNow: '¡Hay actividades con ejecuciones mayores a la fecha actual del servidor, proceda a corregir!',
       alertDirectWorkOrderNotEditable: 'You can not directly edit an order that has already been validated',
       alertExecutionEndDate: 'To the date of execution should not be more than the current server date!',
       emptyActivities: "There're activities with 0 machine and man hours. Please, check them out"
   },
   formats: {
        sourceDateFormat: 'Y-m-d',
        targetDateFormat: 'd-m-Y'
   },
   
   init: function(){
//       this.createQuadrilleEmployeesStore('quadrilleEmployeeStoreGrid');
//       this.createWorkOrderActivityDetailStore('workOrderActivityDetailStore');
//        Ext.create('Ext.data.Store',{
//            storeId: 'productStoreTplGrid',
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
//            model: 'sisprod.model.WorkOrderActivityModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
       
        this.control({
           'listDirectWorkOrder button[action=add]':{
               click: this.showAdd
           },
           
           'listDirectWorkOrder button[action=update]':{
               click: this.verifyDirectWorkOrderIsEditableOnButton
           },
           
           'addDirectWorkOrder combobox[id=idWorkShop]': {
               select: this.onSelectWorkShop
           },
           
           'addDirectWorkOrder combobox[id=idSector]': {
               select: this.onSelectSector
           },
           
           'addDirectWorkOrder combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           
           'addDirectWorkOrder checkbox[id=ownResources]': {
               change: this.onCheckOwnResources
           },
           
           'addDirectWorkOrder button[action=generateOrder]': {
               click: this.addDirectWorkOrder
           },
           
           'addDirectWorkOrder combobox[id=idSelectEquipmentType]': {
               select: this.onSelectEquipmentType
           },
           
           'updateDirectWorkOrder combobox[id=idSector]': {
               select: this.onSelectSector
           },
           
           'updateDirectWorkOrder combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           
           'updateDirectWorkOrder checkbox[id=ownResources]': {
               change: this.onCheckOwnResources
           },
           
           'updateDirectWorkOrder button[action=generateOrder]': {
               click: this.updateDirectWorkOrder
           },
           
//           'listWorkOrdersByWorkRequest button[action=edit]': {
//               click: this.onEdit
//           },
//           
//           'listWorkOrdersByWorkRequest dataview': {
//               itemdblclick: this.onEdit
//           },
           
           'addDirectWorkOrder': {
               close: this.onCloseWindow
           },
           
           'updateDirectWorkOrder': {
               close: this.onCloseWindow
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'workOrderActivityDetailDirect':{
               afterrender: this.loadActivityDetail
           },
           
           'workOrderActivityDetailDirect button[action=save]': {
               click: this.refreshTotalHours
           },
           
           'updateDirectWorkOrder button[action=uploadFile]':{
               click: this.showUploadForm
           },
           
           'listDirectWorkOrder dataview': {
               itemdblclick: this.verifyDirectWorkOrderIsEditable
           },
           
           'addDirectWorkOrder datefield[name=executionEndDate]':{
               change: this.validExecutionEndDate
           },
           
           'updateDirectWorkOrder datefield[name=executionEndDate]':{
               change: this.validExecutionEndDate
           }
       });
       this.callParent(arguments);
    },
    
    onCloseWindow: function(){
//        var productStore = Ext.StoreManager.lookup('productStoreTplGrid');
//        if(Ext.isDefined(productStore) && productStore!==null) productStore.removeAll();
//        var activityOtStore = Ext.StoreManager.lookup('activityOtStoreTplGrid');
//        if(Ext.isDefined(activityOtStore) && activityOtStore!==null) activityOtStore.removeAll();
        this.clearStores();
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
    
    onSelectEquipmentType: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var idEquipment = formPanel.down('#idEquipment');
        idEquipment.clearValue();
        idEquipment.getStore().reload();
    },
    
    onCheckOwnResources: function(checkbox, newValue, oldValue, eventOptions){
        var me = this;
        var formPanel = checkbox.up('form');
        if(newValue){
            formPanel.down('#idSupplier').enable();
            formPanel.down('#serviceOrderNumber').enable();
            formPanel.down('#idQuadrille').disable();
            me.onIsServiceDesactive();
        }
        else{
            formPanel.down('#idSupplier').disable();
            formPanel.down('#serviceOrderNumber').disable();
            formPanel.down('#idQuadrille').enable();
            me.onIsServiceActive();
        }
    },
   
    getGridForEntity: function(){
        var tabGrid = this.getListDirectWorkOrder();
        return tabGrid.getGridPanel();
    },
    
    onGenerateWorkOrder: function(button, url){
        var me = this;
        var window = button.up('window');
        var formPanel = button.up('form');
        var isService = Ext.getCmp('ownResources').getValue();
        if(formPanel.isValid()){
            if(!me.validateResourcesData(formPanel)) return false;
            var values = formPanel.getForm().getValues();
            var ownResources = values['ownResources'];
            if(!Ext.isDefined(ownResources) || ownResources === null) values.ownResources = true;
            else values.ownResources = !ownResources;
            //
            var activities = me.getActivitiesData(formPanel);
            if(activities !== null) values.activities = activities;
            var products = me.getProductsData(formPanel);
            if(products !== null) values.products = products;
            else {
                values.products = new Array();
            }
            if(!isService){
                var quadrille = me.commonEmployess(formPanel);
                if(quadrille != null) values.quadrille = quadrille;
            }
            
            var idResponsibleOfInstallation = Ext.getCmp('idResponsibleOfInstallation').getValue();
            if(Ext.isDefined(idResponsibleOfInstallation) && idResponsibleOfInstallation !== null && idResponsibleOfInstallation !== '')
                values.idResponsibleOfInstallation = idResponsibleOfInstallation;
            //
            me.callGenerateDirectWorkOrder(window, values, url);
        }
    },
            
            
    addDirectWorkOrder: function(button){
        var me = this;
        if(me.validActivityDateOnSave()){
            me.onGenerateWorkOrder(button, 'rest/workOrder/registerDirectWorkOrder.htm');
        }
        else{
            showAlertMessage(me.messages.alertActivitiesInvalid);
        }
    },
            
    updateDirectWorkOrder: function(button){
        var me = this;
        if(me.validActivityDateOnSave()){
            me.validEvidenceDocumentType(button);
        }
        else{
            showAlertMessage(me.messages.alertActivitiesInvalid);
        }
    },
    
    callGenerateDirectWorkOrder: function(window, values, url){
        var me = this;
        Ext.BaseAjax.request({
            url: url,
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
    validateActivityHours:function(formPanel){
        var me = this;
        var activitiesStore = formPanel.down('#directWOActivityOtGrid').getStore();
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
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.emptyActivities);
            return false;
        }
        return true;
    },
    validateResourcesData: function(formPanel){
        var isService = Ext.getCmp('ownResources').getValue();
        var me = this;
        var result = true;
        var messages = new Array();
        var activitiesStore = formPanel.down('#directWOActivityOtGrid').getStore();
        var productsStore = formPanel.down('#directWOProductGrid').getStore();
        
        var quadrilleGrid = formPanel.down('#directWOQuadrilleEmployeesGrid');
        
        var quadrilleStore = null;
        if(Ext.isDefined(quadrilleGrid) && quadrilleGrid !== null)
             quadrilleStore = quadrilleGrid.getStore();
         
        if(activitiesStore.getCount()===0) messages.push(me.messages.validations.activities);
        //if(productsStore.getCount()===0) messages.push(me.messages.validations.products);
        if(!isService){
            if(quadrilleStore.getCount()===0) messages.push(me.messages.validations.quadrille);
        }
        if(messages.length > 0){
            Ext.Msg.alert(me.controllerMessages.alertMessage, Ext.String.format(me.messages.validations.emptyResourcesText,
                messages.join(', ')));
            result = false;
        }else{
            result = me.validateActivityHours(formPanel);
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
        var activitiesStore = formPanel.down('#directWOActivityOtGrid').getStore();
        var activities = new Array();
        for(var i=0;i<activitiesStore.getCount();i++){
            activities.push(activitiesStore.getAt(i).data);
        }
        if(activities.length>0) return Ext.encode(activities);
        else return null;
    },
    
    getProductsData: function(formPanel){
        var productsStore = formPanel.down('#directWOProductGrid').getStore();
        //
        var products = new Array();
        for(var i = 0; i < productsStore.getCount(); i++){
            var record = productsStore.getAt(i);
            var product = {
                product: {idProduct: record.data.idProduct},
                quantity: record.data.quantity,
                measureUnit: {idMeasureUnit: record.data.idMeasureUnit}
            };
            products.push(product);
        }
        if(products.length>0) return Ext.encode(products);
        else return null;        
    },
            
    commonEmployess: function(formPanel){
        var store = formPanel.down('#directWOQuadrilleEmployeesGrid').getStore();
        var employees = new Array();
        for(var i = 0; i < store.getCount(); i++){
            var record = store.getAt(i);
            var employee = {
                employee: {idEmployee: record.data.idEmployee}
            };
            employees.push(employee);
        }
        if(employees.length > 0) return Ext.encode(employees);
        else return null;
    },
            
    refreshDataLists: function(){
        var me = this;
        me.getGridForEntity().getStore().reload();
    },
            
    autoMappingFunction: function(grid, form, record){
        var me = this;
        if(record !== null){
            Ext.BaseAjax.request({
                url:'rest/workOrder/getById.htm',
                method: 'GET',
                params:{
                    idWorkOrder: record.data.idWorkOrder
                },
                success: function(response, options){
                    var data = Ext.JSON.decode(response.responseText);
                    me.setFormData(form, data, record);
                }
            });
        }
    },
    
    setFormData: function(window, data, record){
        var me = this;
        var wo = data.workOrder;
        var form = window.down('form');
        if(form!==null){
            me.clearStores();
            //me.setDataInForm(form, wo);
            me.setWorkOrderFormData(form, wo, data);
            me.setActivitiesInGrids(data.listWorkOrderActivity);
            me.setProductInGrid(data.listWorkOrderProduct);
            me.updateHours();
        }
    },
    
    setWorkOrderFormData: function(form, wo, data){ 
        var me = this;
        if(Ext.isDefined(wo.idWorkOrder) && wo.idWorkOrder !== null){
            form.query('[name=idWorkOrder]')[0].setValue(wo.idWorkOrder);
            form.query('[id=workOrderFullNumber]')[0].setValue(wo.workOrderFullNumber);
        }
        form.query('[name=idLot]')[0].setValue(wo.lot.idLot);
        form.query('[name=idSector]')[0].setValue(wo.sector.idSector);
        form.query('[name=executionStartDate]')[0].setValue(wo.executionStartDate);
        form.query('[name=executionEndDate]')[0].setValue(wo.executionEndDate);
        form.query('[name=description]')[0].setValue(wo.description);
        form.query('[name=comment]')[0].setValue(wo.comment);
        var cboEquipmentType = form.query('[name=idSelectEquipmentType]')[0];
        var cboEquipment = form.query('[name=idEquipment]')[0];
        var cboWorkCategory = form.query('[name=idWorkCategory]')[0];
        var cboWorkCategoryDetail = form.query('[name=idWorkCategoryDetail]')[0];
        var cboWorkOrderReason = form.query('[name=idWorkOrderReason]')[0];
        var cboWorkshop = form.query('[name=idWorkShop]')[0];
        var cboQuadrille = form.query('[name=idQuadrille]')[0];
        var cboWorkCoordinator = form.query('[name=idWorkShopCoordinator]')[0];
        cboEquipmentType.getStore().load({
           scope: this,
           callback: function(){
               cboEquipmentType.select(wo.equipment.equipmentType.idEquipmentType);
               var equipmentModel = Ext.create(sisprod.getApplication().getModelName('EquipmentTemp'), {
                   idEquipment: wo.equipment.idEquipment,
                   equipmentName: wo.equipment.equipmentName,
                   locationName: wo.equipment.location.locationName
               });
               cboEquipment.setValue(equipmentModel);
           }
        });
        
        cboWorkCategory.getStore().load({
           scope: this,
           callback: function(){
                cboWorkCategory.setValue(wo.workCategoryDetail.workCategory.idWorkCategory);
                var workCModel = Ext.create(sisprod.getApplication().getModelName('WorkCategoryDetail'), {
                   idWorkCategoryDetail: wo.workCategoryDetail.idWorkCategoryDetail,
                   workCategoryDetailName: wo.workCategoryDetail.workCategoryDetailName
               });
               cboWorkCategoryDetail.setValue(workCModel);
           }
        });
        
        cboWorkOrderReason.getStore().load({
           scope: this,
           callback: function(){
                cboWorkOrderReason.setValue(wo.workOrderReason.idWorkOrderReason);
           }
        });
        
       var workshopModel = Ext.create(sisprod.getApplication().getModelName('WorkShop'), {
           idWorkShop: wo.workShop.idWorkShop,
           workShopName: wo.workShop.workShopName
       });
       cboWorkshop.setValue(workshopModel);
       
       var coordinatorModel = Ext.create(sisprod.getApplication().getModelName('WorkShopCoordinator'), {
           personFullName: wo.workShopCoordinator.employee.person.personFullName,
           fullDocumentNumber: wo.workShopCoordinator.employee.person.fullDocumentNumber,
           idWorkShopCoordinator: wo.workShopCoordinator.idWorkShopCoordinator
       });
       cboWorkCoordinator.setValue(coordinatorModel);
       
       if(Ext.isDefined(wo.responsibleOfInstallation) && wo.responsibleOfInstallation !== null){
            form.query('[name=idResponsibleOfInstallation]')[0].setValue(Ext.create('sisprod.model.EmployeeTempModel', {
                idEmployee: wo.responsibleOfInstallation.idEmployee,
                idPerson: wo.responsibleOfInstallation.person.idPerson,
                personFullName: wo.responsibleOfInstallation.person.personFullName,
                fullDocumentNumber: wo.responsibleOfInstallation.person.fullDocumentNumber
            }));
        }
       
       if(!wo.ownResources){
           var cboSupplier = form.query('[name=idSupplier]')[0];
            cboSupplier.getStore().load({
               scope: this,
               callback: function(){
                    cboSupplier.setValue(data.workOrderThirdPartyResources.supplier.idSupplier);
               }
            });
           form.query('[name=serviceOrderNumber]')[0].setValue(data.workOrderThirdPartyResources.serviceOrderNumber);     
           cboQuadrille.disable();
           Ext.getCmp('ownResources').setValue(true);
       }
       else{
           var quadrilleModel = Ext.create(sisprod.getApplication().getModelName('Quadrille'), {
                idQuadrille: data.workOrderOwnResources.quadrille.idQuadrille,
                quadrilleName: data.workOrderOwnResources.quadrille.quadrilleName
            });
            cboQuadrille.setValue(quadrilleModel);
            Ext.getCmp('ownResources').setValue(false);
            me.setQuadrilleEmployeeInGrid(data.listQuadrilleEmployee);
       }
    },
    
    setActivitiesInGrids: function(listWorkOrderActivity){
        var pgrid = Ext.getCmp('directWOActivityOtGrid');
        
        if(pgrid !== null){
            var pstore = pgrid.getStore();
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
                    manHours: woa.performedManHours,
                    machineHours: woa.performedMachineHours,
                    performedManHours: woa.performedManHours,
                    performedMachineHours: woa.performedMachineHours,
                    unperformedReasonName: unperformedReasonName,
                    idUnperformedReason: idUnperformedReason,
                    listWorkOrderActivityDetail: woa.listWorkOrderActivityDetail
                });
                pstore.add(model);
            }
        }
    },
            
    setProductInGrid: function(list){
        var grid = Ext.getCmp('directWOProductGrid');
        
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
            
    clearStores: function(){
        var activityStore = Ext.getCmp('directWOActivityOtGrid').getStore();
        var productStore = Ext.getCmp('directWOProductGrid').getStore();
        
        if(Ext.isDefined(Ext.getCmp('directWOQuadrilleEmployeesGrid')) && Ext.getCmp('directWOQuadrilleEmployeesGrid') !== null){
            var queadrilleStore = Ext.getCmp('directWOQuadrilleEmployeesGrid').getStore();
            queadrilleStore.loadData([]);
            
        }
        productStore.loadData([]);
        activityStore.loadData([]);
    },
            
    updateHours: function(){
        var pManHours= Ext.getCmp('manHours');
        var pMachineHours= Ext.getCmp('machineHours');
        var countManHours = 0;
        var countMachineHours = 0;
        var gridScheduled = Ext.getCmp('directWOActivityOtGrid');
        for(var i = 0; i<gridScheduled.store.getCount(); i++){
            var record=gridScheduled.store.getAt(i);
                countManHours=countManHours+record.data.manHours;
                countMachineHours=countMachineHours+record.data.machineHours;
        }
        pManHours.setValue(countManHours);    
        pMachineHours.setValue(countMachineHours);    
    },
            
    loadActivityDetail: function(){
        var viewDetail = this.getWorkOrderActivityDetailDirect();
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
        var view = this.getWorkOrderActivityDetailDirect();
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
        record.set('manHours', sumManHours);
        record.set('machineHours', sumMachineHours);
        me.updateHours();
        win.close();
    },
            
    validActivityDateOnSave: function(){    
        var me = this;
        var activityStore = Ext.getCmp('directWOActivityOtGrid').getStore();
        var returnValue = true;
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
            
    saveOrder: function(button){
        var me = this;
        var values = {};
        this.beforeSave(values);
        Ext.BaseAjax.request({
            url: 'rest/workOrder/updateDirectWorkOrder.htm',
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
    
    showUpdate: function(grid, record){
        var chkInactive = Ext.getCmp('chk' + this.entityName);
        if(Ext.isDefined(chkInactive) && chkInactive.getValue()) return;
        var me = this;
        if(Ext.isDefined(record)){
            var window = Ext.create('sisprod.view.'+ this.entityName + '.Update' + this.entityName, {controller: me, record: record});
            if(Ext.isDefined(me.autoMappingFunction) && typeof(me.autoMappingFunction)==='function'){
                me.autoMappingFunction.apply(me, [grid, window, record]);
            }
            else{
                window.down('form').loadRecord(record);
            }
            if(window.isHidden) window.show();
        }
        else Ext.Msg.alert(me.controllerMessages.updateText, me.controllerMessages.selectRecordMessage);
    },
            
    showUploadForm:function(){
        var controllerName = sisprod.getApplication().getControllerName("EvidenceFile");
        var controller = sisprod.getApplication().getController(controllerName);
        var evidenceGrid=Ext.getCmp('evidenceFilesGrid'); 
        var me =this;
        var addEvidence = Ext.create("sisprod.view.EvidenceFile.AddEvidenceFile",{
            idWorkOrder:me.getUpdateDirectWorkOrder().record.data.idWorkOrder,
            storeRef:evidenceGrid.getStore(),
            controller:controller
        });        
        addEvidence.show();
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
                        me.onGenerateWorkOrder(button, 'rest/workOrder/updateDirectWorkOrder.htm');
                    }
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
            
    onIsServiceActive: function(){
        var me = this;
        var quadrilleGrid=Ext.create('sisprod.view.WorkOrderExecution.QuadrilleEmployeeGrid', {id:'directWOQuadrilleEmployeesGrid'});
        var tabContainer = Ext.getCmp('tabContainer');
        var quadrilleEmployeeControls = new Array();
        quadrilleEmployeeControls.push(quadrilleGrid);
        if(Ext.isDefined(quadrilleGrid) && Ext.isDefined(tabContainer)){
            tabContainer.insert(2, {
                xtype: 'panel',
                id: 'quadrillePanel',
                title: me.messages.quadrille,
                items: quadrilleEmployeeControls
            });
        }
    },
            
    onIsServiceDesactive: function(){
        var tabContainer = Ext.getCmp('tabContainer');
        var quadrillePanel = Ext.getCmp('quadrillePanel');
        if(Ext.isDefined(tabContainer)){
            if(Ext.isDefined(quadrillePanel) && quadrillePanel !== null)
                tabContainer.remove(quadrillePanel);
        }
    },
            
    setQuadrilleEmployeeInGrid: function(list){
        var grid = Ext.getCmp('directWOQuadrilleEmployeesGrid');
        
        if(grid !== null){
            var pstore = grid.getStore();
            pstore.loadData([]);
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
            
    verifyDirectWorkOrderIsEditableOnButton: function(button, event){
        var grid = this.getGridForEntity();
        if(grid === undefined || grid === null){
            Ext.Error.raise('There´s no grid for this view. Redefined getGridForEntity for ' + this.$className +'!');
            return;
        }
    	var record = grid.getSelectionModel().getSelection()[0];
        this.verifyDirectWorkOrderIsEditable(grid, record);
    },
    
    verifyDirectWorkOrderIsEditable: function(grid, record){
        var me = this;
        Ext.BaseAjax.request({
        url: 'rest/workOrder/checkDirectWorkOrderIsEditable.htm',
        method: "POST",
        params: {idWorkOrder: record.data.idWorkOrder},
        success: function(response){
            var responseData = Ext.decode(response.responseText);
            if(Ext.isDefined(responseData.success) && responseData.success === true){
                if(responseData.result){
                    me.showUpdate(grid, record);
                }else{
                    showAlertMessage(me.messages.alertDirectWorkOrderNotEditable);                                                
                }
            }
            }
        });
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

