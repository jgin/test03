
/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
    Ext.define('sisprod.controller.WorkTemplateController', {
   extend: 'sisprod.controller.Base',
   stores : ['WorkTemplateStore'],
   models : ['WorkTemplateModel'],
   entityName: 'WorkTemplate',
   refs: [{ref: 'listWorkTemplate', selector: 'listWorkTemplate'}],
   views : ['WorkTemplate.ListWorkTemplate'],
   
   requires: [
       'sisprod.store.WorkTemplateStore',
       'sisprod.model.WorkTemplateEquipmentModel',
       'sisprod.model.WorkTemplateProductModel',
       'sisprod.model.WorkTemplateActivityOtModel'
   ],
   messages: {
        alertCaption: 'Message',
        noActivityRegister:'Register at least one Activity',
        emptyActivities: "There're activities with 0 machine and man hours. Please, check them out"
   },
   deleteOptions: {
       deleteKeys: ['idWorkTemplate'],
       caption: 'workTemplateName'
   },
   
   init : function(){
//        Ext.create('Ext.data.Store',{
//            storeId: 'ppEquipmentStoreGrid',
//            model: 'sisprod.model.WorkTemplatePPEquipmentModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
//        Ext.create('Ext.data.Store',{
//            storeId: 'equipmentTypeStoreGrid',
//            model: 'sisprod.model.WorkTemplateEquipmentModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
        Ext.create('Ext.data.Store',{
            storeId: 'productStoreGrid',
            model: 'sisprod.model.WorkTemplateProductModel',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
//        Ext.create('Ext.data.Store',{
//            storeId: 'activityOtStoreGrid',
//            model: 'sisprod.model.WorkTemplateActivityOtModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });
        this.control({
           
           'listWorkTemplate button[action=add]':{
               click: this.showAdd
           },
           'listWorkTemplate button[action=activate]':{
               click: this.activate
           },
           
           'listWorkTemplate button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWorkTemplate dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWorkTemplate button[action=delete]': {
               click: this.destroy
           },
           
           'listWorkTemplate button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWorkTemplate button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWorkTemplate button[action=save]': {
               click: this.saveEntity
           },
           
           'addWorkTemplate,updateWorkTemplate':{
               beforeshow:this.beforeShow
           },
           'updateWorkTemplate':{
               afterrender:this.afterRender
           },
           'addWorkTemplate combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategoy
           },
           'updateWorkTemplate combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategoy
           },
           'addWorkTemplate, updateWorkTemplate': {
               close: this.onCloseWindow
           },
           'addWorkTemplate button[id=cboPPEquipmentAddButton]': {
               click: this.onPPEquipmentAddButton
           },
           'updateWorkTemplate button[id=cboPPEquipmentAddButton]': {
               click: this.onPPEquipmentAddButton
           },
           'addWorkTemplate button[id=cboProductAddButton]': {
               click: this.onProductAddButton
           },
           'updateWorkTemplate button[id=cboProductAddButton]': {
               click: this.onProductAddButton
           }
       });
       this.callParent(arguments);
    },
    onProductAddButton: function(){
        this.showSingleAdditonWindow('Product');
    },
    onPPEquipmentAddButton: function(){
        this.showSingleAdditonWindow('PPEquipment');
    },
    getGridForEntity: function(){
        var tabGrid = this.getListWorkTemplate();
        return tabGrid.getGridPanel();
    },
    onCloseWindow: function(){
//        var equipmentTypeStore = Ext.StoreManager.lookup('equipmentTypeStoreGrid');
//        if(Ext.isDefined(equipmentTypeStore) && equipmentTypeStore!==null) equipmentTypeStore.removeAll();
        //
//        var ppEquipmentStore = Ext.StoreManager.lookup('ppEquipmentStoreGrid');
//        if(Ext.isDefined(ppEquipmentStore) && ppEquipmentStore!==null) ppEquipmentStore.removeAll();
//        //
//        var productStore = Ext.StoreManager.lookup('productStoreGrid');
//        if(Ext.isDefined(productStore) && productStore!==null) productStore.removeAll();
//        //
//        var activityOtStore = Ext.StoreManager.lookup('activityOtStoreGrid');
//        if(Ext.isDefined(activityOtStore) && activityOtStore!==null) activityOtStore.removeAll();
    },
    onSelectWorkCategoy: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var workCategoryDetail = formPanel.down('#idWorkCategoryDetail');
        workCategoryDetail.clearValue();
        workCategoryDetail.getStore().reload();
    },      
    beforeShow:function(){
//        var storeEquipment=Ext.StoreManager.lookup('equipmentTypeStoreGrid');
//        var storeppEquipment=Ext.StoreManager.lookup('ppEquipmentStoreGrid');
//        var storeProduct=Ext.StoreManager.lookup('productStoreGrid');
//        var storeActivity=Ext.StoreManager.lookup('activityOtStoreGrid');
//        storeEquipment.removeAll();
//        storeppEquipment.removeAll();
//        storeProduct.removeAll();
//        storeActivity.removeAll();
    },    
    validateActivityHours:function(formPanel){
        var me = this;
        var activitiesStore = formPanel.down('#activityOtGrid').getStore();
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
    },
    beforeSaveEntity: function(win, form, values, jsonData){ 
        var activityGrid;
        activityGrid = Ext.getCmp('activityOtGrid');
        var store=activityGrid.store;
        if(store.getCount()>0){
//            var listEquipments = this.mapEquipmentsOnGrid();
            if(!this.validateActivityHours(form))return false;
            var listPPEquipments = this.mapppEquipmentsOnGrid();
            var listProducts = this.mapProductsOnGrid();
            var listActivities = this.mapActivitiesOnGrid();
//            values.listEquipments = JSON.stringify(listEquipments);
            values.listProducts = JSON.stringify(listProducts);
            values.listActivities = JSON.stringify(listActivities);
            values.listPPEquipments = JSON.stringify(listPPEquipments);
            return true;
        }else{
            Ext.Msg.alert(this.messages.alertCaption,this.messages.noActivityRegister);
            return false;
        }
    },
    mapppEquipmentsOnGrid:function(){
        var ppEquipmentGrid;
        ppEquipmentGrid = Ext.getCmp('ppEquipmentGrid');
        var store=ppEquipmentGrid.store;
        var listppEquipmentDetail = new Array();
        for(var i=0;i<store.getCount();i++){
            var record=store.getAt(i);
            listppEquipmentDetail.push({pPEquipment:{idPPEquipment:record.data.idPPEquipment},quantity:record.data.quantity});
        }
        return listppEquipmentDetail;
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
        productGrid = Ext.getCmp('productGrid');
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
        activityGrid = Ext.getCmp('activityOtGrid');
        var store=activityGrid.store;
        var listActivityDetail = new Array();
        for(var i=0;i<store.getCount();i++){
            var record=store.getAt(i);
            listActivityDetail.push({activityOt:{idActivityOt:record.data.idActivityOt},manHours:record.data.manHours,machineHours:record.data.machineHours});
        }
        return listActivityDetail;
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboWorkCategoryDetail = Ext.getCmp('idWorkCategoryDetail');
        var cboWorkCategory = Ext.getCmp('idWorkCategory');
        varForm.loadRecord(record);
        if(record.raw.workCategoryDetail!=null){
            cboWorkCategory.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboWorkCategory.select(record.raw.workCategoryDetail.workCategory.idWorkCategory);                     
                }
            });
            cboWorkCategoryDetail.setValue(new Ext.create(sisprod.getApplication().getModelName('WorkCategoryDetail'),{
                idWorkCategoryDetail: record.raw.workCategoryDetail.idWorkCategoryDetail,
                workCategoryDetailName: record.raw.workCategoryDetail.workCategoryDetailName,
                workCategoryName:record.raw.workCategoryDetail.workCategory.workCategoryName
            }));
        }
    },
    afterRender:function(){
//        this.loadEquipmentForWorkTemplate();
        this.loadPPEquipmentForWorkTemplate();
        this.loadActivityForWorkTemplate();
        this.loadProductForWorkTemplate();
    },
    loadPPEquipmentForWorkTemplate:function(){
        var idWorkTemplate = Ext.getCmp('idWorkTemplate').getValue();
        var store = Ext.getCmp('ppEquipmentGrid').getStore();
        Ext.BaseAjax.request({
            url:'rest/workTemplatePPEquipment/listByWorkTemplate.htm',
            method:'GET',
            params:{
                idWorkTemplate:idWorkTemplate
            },
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                for(var i=0;i<data.length;i++){
                    var model = Ext.create('sisprod.model.WorkTemplatePPEquipmentModel',{
                        idPPEquipment:data[i].pPEquipment.idPPEquipment,
                        description:data[i].pPEquipment.description,
                        isTool:data[i].pPEquipment.isTool,
                        quantity:data[i].quantity
                    });
                    store.insert(store.getCount(),model);
                }
            }
        });
    },
    loadEquipmentForWorkTemplate:function(){
        var idWorkTemplate = Ext.getCmp('idWorkTemplate').getValue();
        var store = Ext.getCmp('equipmentGrid').getStore();
        Ext.BaseAjax.request({
            url:'rest/workTemplateEquipment/listByWorkTemplate.htm',
            method:'GET',
            params:{
                idWorkTemplate:idWorkTemplate
            },
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                for(var i=0;i<data.length;i++){
                    var model = Ext.create('sisprod.model.WorkTemplateEquipmentModel',{
                        idEquipmentType:data[i].equipmentType.idEquipmentType,
                        equipmentTypeName:data[i].equipmentType.equipmentTypeName,
                        quantity:data[i].quantity
                    });
                    store.insert(store.getCount(),model);
                }
            }
        });
    },
    loadActivityForWorkTemplate:function(){
        var idWorkTemplate = Ext.getCmp('idWorkTemplate').getValue();
        var store = Ext.getCmp('activityOtGrid').store;
        Ext.BaseAjax.request({
            url:'rest/workTemplateActivity/listByWorkTemplate.htm',
            method:'GET',
            params:{
                idWorkTemplate:idWorkTemplate
            },
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                for(var i=0;i<data.length;i++){
                    var model = Ext.create('sisprod.model.WorkTemplateActivityOtModel',{
                            idActivityOt:data[i].activityOt.idActivityOt,
                            description:data[i].activityOt.description,
                            manHours:data[i].manHours,
                            machineHours:data[i].machineHours
                    });
                    store.insert(store.getCount(),model);
                }
            }
        });
    },
    loadProductForWorkTemplate:function(){
        var idWorkTemplate = Ext.getCmp('idWorkTemplate').getValue();
        var store = Ext.getCmp('productGrid').store;
        Ext.BaseAjax.request({
            url:'rest/workTemplateProduct/listByWorkTemplate.htm',
            method:'GET',
            params:{
                idWorkTemplate:idWorkTemplate
            },
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                for(var i=0;i<data.length;i++){
                    var model = Ext.create('sisprod.model.WorkTemplateProductModel',{
                            idProduct:data[i].product.idProduct,
                            productName:data[i].product.productName,
                            productCode:data[i].product.productCode,
                            idMeasureUnit:data[i].measureUnit.idMeasureUnit,
                            measureUnit:data[i].measureUnit.measureUnitName,
                            quantity:data[i].quantity,
                            store:data[i].store,
                            price:data[i].price,
                            stock:data[i].stock
                            
                    });
                    store.insert(store.getCount(),model);
                }
            }
        });
    }
});

