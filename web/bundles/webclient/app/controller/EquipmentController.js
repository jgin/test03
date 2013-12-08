
/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.EquipmentController', {
   extend: 'sisprod.controller.Base',
   stores : ['EquipmentStore'],
   models : ['EquipmentModel'],
   entityName: 'Equipment',
   refs: [{ref: 'listEquipment', selector: 'listEquipment'}],
   views : ['Equipment.ListEquipment'],
   
   requires: [
       'sisprod.store.EquipmentStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idEquipment'],
       caption: 'equipmentName'
   },
   
   messages:{
       equipmentAssignedOnSelfError:'The component can not be assigned to itself',
       duplicateComponentnSelectError:'The component has already been selected',
       noComponentSelectToAddError:'Select the component to add',
       noComponentSelectToRemoveError:'Select the component to remove',
       locationNoRelatedError:'The equipment can not be assigned to this location',
       equipmentTypeNoAvailableError:"This Equipment Type Can not Be Registered since this module",
       importTitle : "Equipment Import",
       importQuestion : "Equipment Import may last for awhile. Do you want to continue?"
   }, 
   
   init : function(){
        Ext.create('Ext.data.Store',{
            storeId: 'componentStoreGrid',
            fields: ['idEquipment','equipmentName'],
            idProperty:'idEquipment',
            proxy: {
                type: 'ajax',
                api:{
                    read: 'rest/equipments/listAssigned.htm'
                },
                reader: {
                    type: 'json',
                    idProperty: 'idEquipment',
                    root: 'data'
                }
            }
        });
        this.control({
           'listEquipment button[action=activate]':{
               click: this.activate
           },
           'listEquipment button[action=add]':{
               click: this.showAdd
           },
           
           'listEquipment button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listEquipment dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listEquipment button[action=delete]': {
               click: this.destroy
           },
           
           'listEquipment button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addEquipment': {
               beforeshow: this.beforeShow
           },
           'addEquipment button[id=idEquipmentTypeAddButton],updateEquipment button[id=idEquipmentTypeAddButton]':{
               click: this.onEquipmentTypeAddButton
           },
           'addEquipment combo[id=idEquipmentType]':{
               select: function(){
                        var cboEquipmentType=Ext.getCmp("idEquipmentType");
                        var me=this;
                        if(cboEquipmentType.getValue()!==null){
                            Ext.BaseAjax.request({
                            url: 'rest/equipments/isEquipmentTypeParam.htm',
                            method:"POST",
                            async:false,
                            params: {idEquipmentType:cboEquipmentType.getValue()},
                            success: function(response){
                                   var objResponse = Ext.decode(response.responseText);
                                   if(objResponse.success===true){
                                        cboEquipmentType.clearValue();
                                        Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.equipmentTypeNoAvailableError);
                                   }else{
                                       me.listFeatures(null,"featuresForRegister");
                                   }
                            },
                            failure: function(response){
                            }
                            }); 
                        }
               }
           },
           'updateEquipment combo[id=idEquipmentType]':{
               select: function(){
                    var idEquipment = Ext.getCmp('idEquipment').getValue();
                    var cboEquipmentType=Ext.getCmp("idEquipmentType");
                    var me=this;
                    if(cboEquipmentType.getValue()!==null){
                        Ext.BaseAjax.request({
                        url: 'rest/equipments/isEquipmentTypeParam.htm',
                        method:"POST",
                        async:false,
                        params: {idEquipmentType:cboEquipmentType.getValue()},
                        success: function(response){
                               var objResponse = Ext.decode(response.responseText);
                               if(objResponse.success===true){
                                    cboEquipmentType.clearValue();
                                    Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.equipmentTypeNoAvailableError);
                               }else{
                                   me.listFeatures(idEquipment,"featuresForUpdate");
                               }
                        },
                        failure: function(response){
                        }
                        }); 
                    }
               },
               change:function(){
                      var cboEquipmentType=Ext.getCmp("idEquipmentType");
                      if(cboEquipmentType.getValue()!==null){
                        var idEquipment = Ext.getCmp('idEquipment').getValue();
                        this.listFeatures(idEquipment,"featuresForUpdate");
                      }
               }
           },
           'addEquipment button[id=idMarkAddButton],updateEquipment button[id=idMarkAddButton]':{
               click: this.onMarkAddButton
           },
           'updateEquipment sensitivecombo[id=idLocation]':{
               beforeselect: this.onBeforeSelectLocation
           },
           'addEquipment button[id=idLocationAddButton],updateEquipment button[id=idLocationAddButton]':{
               click: this.onLocationAddButton
           },
           'addEquipment button[id=idEquipmentConditionAddButton],updateEquipment button[id=idEquipmentConditionAddButton]':{
               click: this.onEquipmentConditionAddButton
           },
           'addEquipment button[action=save]': {
               click: this.saveEntity
           },
           'addEquipment button[id=savecomponent]': {
               click: this.addComponent
           },
           'addEquipment button[id=removecomponent]': {
               click: this.removeComponent
           },
           'updateEquipment button[action=save]': {
               click: this.saveEntity
           },
           'updateEquipment button[id=savecomponent]': {
               click: this.addComponent
           },
           'updateEquipment button[id=removecomponent]': {
               click: this.removeComponent
           },
           'updateFeature':{
               beforeshow: this.beforeShow
           },
           'listEquipment button[action=importEquipment]': {
               click: this.importEquipment
           },
           'addEquipment combo[id=idLot]':{
               select: this.reloadLocation
               //change : this.renderUpdate
           },
           'updateEquipment combo[id=idLot]':{
               select : this.reloadLocation
           },
           'listEquipment button[action=importEquipmentState]': {
               click: this.importEquipmentState
           }
       });
       this.callParent(arguments);
    },
    reloadLocation: function() {
        var cboLocation= Ext.getCmp("idLocation");
        cboLocation.clearValue();
        cboLocation.getStore().load();
    },   
    listFeatures: function(idEquipment, requestMapping){
        var idEquipmentType=Ext.getCmp('idEquipmentType').getValue();
        var me = Ext.getCmp('featuresPanel');
        me.removeAll();
        var combosArray = new Array();
        me.items = [];
        var url = "rest/equipmentTypes/"+requestMapping+".htm";
        url = url + "?idEquipmentType=" + idEquipmentType;
        if(idEquipment!==null){
            url = url + "&idEquipment=" + idEquipment;
        }
        var objResponse = Ext.decode(synchronousRequest(url, "GET").responseText);
        for (var i = 0; i < objResponse.features.length; i++){
            objResponse.features[i].labelWidth=150;
            if(objResponse.features[i].xtype === 'combobox'){                
                var varStore = Ext.create('sisprod.store.' + objResponse.features[i].store + 'Store');
                var response = Ext.decode(synchronousRequest("rest/itemFeatureList/listAll.htm?idFeature=" + objResponse.features[i].id, "GET").responseText);
                varStore.loadData(response.data, false);
                objResponse.features[i].store = varStore;
                if(Ext.isDefined(objResponse.features[i].value)){
                    combosArray.push(objResponse.features[i]);
                }
            }
            me.items.push(objResponse.features[i]);
        }
        me.initComponent();
        for(var i = 0; i < combosArray.length; i++){
            var cbo = Ext.getCmp(combosArray[i].id);
            cbo.rawValue = combosArray[i].value;
            cbo.value = combosArray[i].value;
            cbo.lastValue = combosArray[i].value;
        }
    },
    getGridForEntity: function(){
        var tabGrid = this.getListEquipment();
        return tabGrid.getGridPanel();
    },
    onEquipmentTypeAddButton: function(){
        this.showSingleAdditonWindow('EquipmentType');
    },           
    onMarkAddButton: function(){
        this.showSingleAdditonWindow('Mark');
    },           
    onLocationAddButton: function(){
        this.showSingleAdditonWindow('Location');
    },           
    onEquipmentConditionAddButton: function(){
        this.showSingleAdditonWindow('EquipmentCondition');
    },           
    beforeShow:function(){
        var store=Ext.StoreManager.lookup('componentStoreGrid');
        store.removeAll();
    },    
    addComponent:function (){
            var idEquipment=-1;
            if(Ext.isDefined(Ext.getCmp('idEquipment'))){
                idEquipment=Ext.getCmp('idEquipment').getValue();
            }
            var combo=Ext.getCmp('cboComponent');
            var value=Ext.getCmp('cboComponent').getValue();
            var record = combo.findRecordByValue(value);   
            if(record){
                var store=Ext.StoreManager.lookup('componentStoreGrid');
                var pos=store.find('idEquipment',value);
                if(pos<0){
                    if(value!==idEquipment){
                        store.add({
                            idEquipment:value,
                            equipmentName: record.raw.equipmentName
                        });      
                    }
                    else{
                        Ext.Msg.alert(this.controllerMessages.alertMessage,this.messages.equipmentAssignedOnSelfError);      
                    }
                }else{
                    Ext.Msg.alert(this.controllerMessages.alertMessage,this.messages.duplicateComponentnSelectError);                    
                }
            }else{
                Ext.Msg.alert(this.controllerMessages.alertMessage,this.messages.noComponentSelectToAddError);
            }    
            combo.clearValue();
   },
    removeComponent: function(){
        var grid =Ext.getCmp('componentsGrid');
        var record=grid.getSelectionModel().getSelection()[0];
        if(Ext.isDefined(record)){
            var store=Ext.StoreManager.lookup('componentStoreGrid');
            var pos=store.find('idEquipment',record.raw.idEquipment);            
            store.removeAt(pos);
        }else{
            Ext.Msg.alert(this.controllerMessages.alertMessage,this.messages.noComponentSelectToRemoveError);
        }
    },        
    beforeSaveEntity:function(win, form, values){
        var items = new Array();
        var success = false;
        if(values.idMark===""){
            values.idMark=-1;
        }
        if(values.idLocation===""){
            values.idLocation=-1;
        }
        if(values.idEquipmentCondition===""){
            values.idEquipmentCondition=-1;
        }
        if(values.cboSupplier===""){
            values.cboSupplier=-1;
        }
        if(this.extraValid()){
            var store = Ext.StoreManager.lookup('componentStoreGrid');
            for(var i=0;i<store.getCount();i++){
                var record=store.getAt(i).raw;
                items.push({idEquipment: record.idEquipment, equipmentName: record.equipmentName});
            }
            values.items = JSON.stringify(items);
            success = true;
        }
        var formControls = Ext.getCmp('featuresPanel');
        var controlsFeature = formControls.items.items;
        var listFeaturesDetail = this.mapControlsFeature(controlsFeature);
        values.listFeatures = JSON.stringify(listFeaturesDetail);
        return success;
    },  
    mapControlsFeature: function(controlsFeature){
        var listFeaturesDetail = new Array();
        for(var i = 0; i < controlsFeature.length; i++){
            var control = controlsFeature[i];
//            if(control.value != null && control.value != '') {
            if(control.value !== null) {
                if(control.xtype === 'textfield'){
                    listFeaturesDetail.push({idFeature: control.id, valueString: control.value});
                }
                else if(control.xtype === 'numberfield'){
                    listFeaturesDetail.push({idFeature: control.id, valueNumeric: control.value});
                }
                else if(control.xtype === 'datefield'){
                    listFeaturesDetail.push({idFeature: control.id, valueDateString: control.value});
                }
                else if(control.xtype === 'checkboxfield'){
                    listFeaturesDetail.push({idFeature: control.id, valueBoolean: control.value});
                }
                else if(control.xtype === 'combobox'){
                    listFeaturesDetail.push({idFeature: control.id, valueString: control.value});
                }
            }
        }
        return listFeaturesDetail;
    },           
    extraValid: function(){
//        var success = true;
//        var store = Ext.StoreManager.lookup('itemFeatureListStore');
//        var cboFeatureType = Ext.getCmp('idFeatureType');
//        var featureType = cboFeatureType.findRecordByValue(cboFeatureType.getValue()).raw;
//        if(featureType.xtype == 'combobox'){
//            if(store.getCount() === 0){
//                showAlertMessage("Ingrese por lo menos un valor para la lista desplegable");
//                success = false;
//            }
//        }
//        return success;
    return true;
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboEquipmentType = varForm.query("[name=idEquipmentType]")[0];
        var cboMark = varForm.query("[name=idMark]")[0];
        var cboLocation = varForm.query("[name=idLocation]")[0];
        var txtEquipmentName = varForm.query("[name=equipmentName]")[0];
        var cboEquipmentCondition = varForm.query("[name=idEquipmentCondition]")[0];
        var cboSupplier = varForm.query("[name=cboSupplier]")[0];
        var cboLot = varForm.query("[name=idLot]")[0];
        
        var idEquipmentType = record.raw.equipmentType.idEquipmentType;
        var idLot=0;
        if(record.raw.lot!==null)
            idLot= record.raw.lot.idLot;
        var idSupplier;
        if(record.raw.supplier===null){
            idSupplier=0;
        }else{
            idSupplier=record.raw.supplier.idSupplier;
        } 
        var idMark;
        if(record.raw.mark===null){
            idMark=0;
        }else{
            idMark=record.raw.mark.idMark;
        } 
        var idLocation;
        if(record.raw.location===null){
            idLocation=0;
        }else{
            idLocation=record.raw.location.idLocation;
        } 
        var idEquipmentCondition;
        if(record.raw.equipmentCondition===null){
            idEquipmentCondition=0;
        }else{
            idEquipmentCondition=record.raw.equipmentCondition.idEquipmentCondition;
        } 
        
        if(Ext.isDefined(cboEquipmentType) && Ext.isDefined(cboMark) && Ext.isDefined(cboEquipmentCondition) && Ext.isDefined(cboLocation) && Ext.isDefined(cboSupplier) ){
            cboSupplier.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboSupplier.select(idSupplier);
                }
            });
            cboLot.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboLot.select(idLot);
                }
            });
            cboEquipmentType.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboEquipmentType.select(idEquipmentType);
                }
            });
            cboMark.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboMark.select(idMark);
                }
            });
            cboEquipmentCondition.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboEquipmentCondition.select(idEquipmentCondition);
                }
            });
            if(record.raw.location!==null){
            cboLocation.setValue(new Ext.create(sisprod.getApplication().getModelName('Location'),{
                idLocation: record.raw.location.idLocation,
                locationName: record.raw.location.locationName
            }));
            }
            this.loadComponents();
        }
        Ext.BaseAjax.request({
            url: 'rest/equipments/isEquipmentTypeParam.htm',
            method:"POST",
            async:false,
            params: {idEquipmentType:record.raw.equipmentType.idEquipmentType},
            success: function(response){
                   var objResponse = Ext.decode(response.responseText);
                   if(objResponse.success===true){
                       txtEquipmentName.setReadOnly(true);
                       cboEquipmentType.setReadOnly(true);
                       cboLocation.setReadOnly(true);
                       cboLot.setReadOnly(true);
                   }
            },
            failure: function(response){
            }
        });  
    },
    loadComponents: function(){
        var varId = Ext.getCmp("idEquipment").getValue();
        var store = Ext.StoreManager.lookup('componentStoreGrid');
        store.load({params:{idEquipmentParent: varId}});
    },
    onBeforeSelectLocation:function(combo, record, index, eOpts){
        var idEquipment = Ext.getCmp("idEquipment").getValue();
        var varSuccess;
        var idLocation =record.data.idLocation;
        Ext.BaseAjax.request({
            url: 'rest/equipments/isRelatedLocation.htm',
            method:"GET",
            async:false,
            params: {idLocation:idLocation ,idEquipment:idEquipment},
            success: function(response){
                   var objResponse = Ext.decode(response.responseText);
                   varSuccess=objResponse.success;
            },
            failure: function(response){
            }
        });  
        if(varSuccess===false){
            Ext.Msg.alert(this.controllerMessages.alertMessage,this.messages.locationNoRelatedError);
        }
        return varSuccess;
    },
    importEquipment : function(button){
        var me = this;
        Ext.Msg.show({
            title: me.messages.importTitle,
            msg: me.messages.importQuestion,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button){
                if(button==="yes"){
                    Ext.getCmp("btnImport" + me.entityName).disable();
                    Ext.getCmp("btnImportState" + me.entityName).enable();
                    Ext.BaseAjax.request({
                        url: 'rest/equipments/importEquipmentFromSisman.htm',
                        method: 'GET',
                        success: function(response, options){
                            var objResponse = Ext.decode(response.responseText);
                            Ext.getCmp("btnImport" + me.entityName).enable();
                            Ext.getCmp("btnImportState" + me.entityName).disable();
                            if(objResponse.success == true){
                                showAlertMessage(objResponse.message);
                                var grid =me.getGridForEntity();
                                var store = grid.getStore();
                                store.reload();
                            } else {                    
                                showAlertMessage(objResponse.message);    
                            }
                        }
                    });
                }          
            }
        });
    },
    importEquipmentState : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/equipments/stateImportEquipmentFromSisman.htm',
            method: 'GET',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);                
                showAlertMessage(objResponse.message);
                if(objResponse.success == true){
                    Ext.getCmp("btnImport" + me.entityName).enable();
                    Ext.getCmp("btnImportState" + me.entityName).disable();
                    var grid =me.getGridForEntity();
                    var store = grid.getStore();
                    store.reload();
                }
            }
        });
    }
});

