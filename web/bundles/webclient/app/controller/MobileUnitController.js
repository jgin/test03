
/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.MobileUnitController', {
    extend: 'sisprod.controller.Base',
    stores: ['MobileUnitStore'],
    models: ['MobileUnitModel'],
    entityName: 'MobileUnit',
    refs: [{ref: 'listMobileUnit', selector: 'listMobileUnit'}],
    views: ['MobileUnit.ListMobileUnit'],
    requires: [
        'sisprod.store.MobileUnitStore'
    ],
    deleteOptions: {
        deleteKeys: ['idMobileUnit'],
        caption: 'equipment.equipmentName'
    },
    messages: {
        equipmentAssignedOnSelfError: 'The component can not be assigned to itself',
        duplicateComponentnSelectError: 'The component has already been selected',
        noComponentSelectToAddError: 'Select the component to add',
        noComponentSelectToRemoveError: 'Select the component to remove',
        locationNoRelatedError: 'The equipment can not be assigned to this location',
        equipmentTypeNoAvailableError: "This Equipment Type Can not Be Registered since this module"
    },
    init: function() {
        Ext.create('Ext.data.Store', {
            storeId: 'componentStoreGrid',
            fields: ['idEquipment', 'equipmentName'],
            idProperty: 'idEquipment',
            proxy: {
                type: 'ajax',
                api: {
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
            'listMobileUnit button[action=activate]': {
                click: this.activate
            },
            'listMobileUnit button[action=add]': {
                click: this.showAdd
            },
            'listMobileUnit button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listMobileUnit dataview': {
                itemdblclick: this.showUpdate
            },
            'listMobileUnit button[action=delete]': {
                click: this.destroy
            },
            'listMobileUnit button[action=print]': {
                click: this.showPrint
            },
//            'basePrintWindow button[action=print]': {
//                click: this.onPrint
//            },
            'addMobileUnit': {
                beforeshow: this.beforeShow,
                afterrender: this.showAddForm
            },
            'addMobileUnit button[id=idEquipmentTypeAddButton],updateMobileUnit button[id=idEquipmentTypeAddButton]': {
                click: this.onEquipmentTypeAddButton
            },
            'addMobileUnit combo[id=idEquipmentType]': {
                select: function() {
                    var cboEquipmentType = Ext.getCmp("idEquipmentType");
                    var me = this;
                    if (cboEquipmentType.getValue() !== null) {
                        Ext.BaseAjax.request({
                            url: 'rest/equipments/isEquipmentTypeParam.htm',
                            method: "POST",
                            async: false,
                            params: {idEquipmentType: cboEquipmentType.getValue()},
                            success: function(response) {
                                var objResponse = Ext.decode(response.responseText);
                                if (objResponse.success === true) {
                                    cboEquipmentType.clearValue();
                                    Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.equipmentTypeNoAvailableError);
                                } else {
                                    me.listFeatures(null, "featuresForRegister");
                                }
                            },
                            failure: function(response) {
                            }
                        });
                    }
                }
            },
            'updateMobileUnit combo[id=idEquipmentType]': {
                select: function() {
                    var idEquipment = Ext.getCmp('idEquipment').getValue();
                    var cboEquipmentType = Ext.getCmp("idEquipmentType");
                    var me = this;
                    if (cboEquipmentType.getValue() !== null) {
                        Ext.BaseAjax.request({
                            url: 'rest/equipments/isEquipmentTypeParam.htm',
                            method: "POST",
                            async: false,
                            params: {idEquipmentType: cboEquipmentType.getValue()},
                            success: function(response) {
                                var objResponse = Ext.decode(response.responseText);
                                if (objResponse.success === true) {
                                    cboEquipmentType.clearValue();
                                    Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.equipmentTypeNoAvailableError);
                                } else {
                                    me.listFeatures(idEquipment, "featuresForUpdate");
                                }
                            },
                            failure: function(response) {
                            }
                        });
                    }
                },
                change: function() {
                    var cboEquipmentType = Ext.getCmp("idEquipmentType");
                    if (cboEquipmentType.getValue() !== null) {
                        var idEquipment = Ext.getCmp('idEquipment').getValue();
                        this.listFeatures(idEquipment, "featuresForUpdate");
                    }
                }
            },
            'addMobileUnit button[id=idMarkAddButton],updateMobileUnit button[id=idMarkAddButton]': {
                click: this.onMarkAddButton
            },
            'updateMobileUnit sensitivecombo[id=idLocation]': {
                beforeselect: this.onBeforeSelectLocation
            },
            'addMobileUnit button[id=idLocationAddButton],updateMobileUnit button[id=idLocationAddButton]': {
                click: this.onLocationAddButton
            },
            'addMobileUnit button[id=idEquipmentConditionAddButton],updateMobileUnit button[id=idEquipmentConditionAddButton]': {
                click: this.onEquipmentConditionAddButton
            },
            'addMobileUnit button[action=save]': {
                click: this.saveEntity
            },
            'addMobileUnit button[id=savecomponent]': {
                click: this.addComponent
            },
            'addMobileUnit button[id=removecomponent]': {
                click: this.removeComponent
            },
            'updateMobileUnit button[action=save]': {
                click: this.saveEntity
            },
            'updateMobileUnit button[id=savecomponent]': {
                click: this.addComponent
            },
            'updateMobileUnit button[id=removecomponent]': {
                click: this.removeComponent
            },
            'updateFeature': {
                beforeshow: this.beforeShow
            }
        });
        this.callParent(arguments);
    },
    reloadLocation: function() {
        var cboLocation = Ext.getCmp("idLocation");
        cboLocation.clearValue();
        cboLocation.getStore().load();
    },
    listFeatures: function(idEquipment, requestMapping) {
        var idEquipmentType = Ext.getCmp('idEquipmentType').getValue();
        var me = Ext.getCmp('featuresPanel');
        me.removeAll();
        var combosArray = new Array();
        me.items = [];
        var url = "rest/equipmentTypes/" + requestMapping + ".htm";
        url = url + "?idEquipmentType=" + idEquipmentType;
        if (idEquipment !== null) {
            url = url + "&idEquipment=" + idEquipment;
        }
        var objResponse = Ext.decode(synchronousRequest(url, "GET").responseText);
        for (var i = 0; i < objResponse.features.length; i++) {
            objResponse.features[i].labelWidth = 150;
            if (objResponse.features[i].xtype === 'combobox') {
                var varStore = Ext.create('sisprod.store.' + objResponse.features[i].store + 'Store');
                var response = Ext.decode(synchronousRequest("rest/itemFeatureList/listAll.htm?idFeature=" + objResponse.features[i].id, "GET").responseText);
                varStore.loadData(response.data, false);
                objResponse.features[i].store = varStore;
                if (Ext.isDefined(objResponse.features[i].value)) {
                    combosArray.push(objResponse.features[i]);
                }
            }
            me.items.push(objResponse.features[i]);
        }
        me.initComponent();
        for (var i = 0; i < combosArray.length; i++) {
            var cbo = Ext.getCmp(combosArray[i].id);
            cbo.rawValue = combosArray[i].value;
            cbo.value = combosArray[i].value;
            cbo.lastValue = combosArray[i].value;
        }
    },
    getGridForEntity: function() {
        var tabGrid = this.getListMobileUnit();
        return tabGrid.getGridPanel();
    },
    onEquipmentTypeAddButton: function() {
        this.showSingleAdditonWindow('EquipmentType');
    },
    onMarkAddButton: function() {
        this.showSingleAdditonWindow('Mark');
    },
    onLocationAddButton: function() {
        this.showSingleAdditonWindow('Location');
    },
    onEquipmentConditionAddButton: function() {
        this.showSingleAdditonWindow('EquipmentCondition');
    },
    showAddForm: function(form) {
        var me = this;
        // Muestra los valores iniciales de las unidades de medida
        Ext.BaseAjax.request({
            url: 'rest/configParam/getDefaultMobileUnitEquipmentType.htm',
            method: 'POST',
            success: function(response, options) {
                var objResponse = Ext.decode(response.responseText);
                if (objResponse.success === true) {
                    var cboEquipmentType = Ext.getCmp("idEquipmentType");
                    cboEquipmentType.getStore().load({
                        scope: this,
                        callback: function(records, operation, success) {
                            cboEquipmentType.select(objResponse.defaultMobileUnitEquipmentType.equipmentType.idEquipmentType);
                        }
                    });
                }
                else {
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options) {
            }
        });
    },
    beforeShow: function() {
        var store = Ext.StoreManager.lookup('componentStoreGrid');
        store.removeAll();
    },
    addComponent: function() {
        var idEquipment = -1;
        if (Ext.isDefined(Ext.getCmp('idEquipment'))) {
            idEquipment = Ext.getCmp('idEquipment').getValue();
        }
        var combo = Ext.getCmp('cboComponent');
        var value = Ext.getCmp('cboComponent').getValue();
        var record = combo.findRecordByValue(value);
        if (record) {
            var store = Ext.StoreManager.lookup('componentStoreGrid');
            var pos = store.find('idEquipment', value);
            if (pos < 0) {
                if (value !== idEquipment) {
                    store.add({
                        idEquipment: value,
                        equipmentName: record.raw.equipmentName
                    });
                }
                else {
                    Ext.Msg.alert(this.controllerMessages.alertMessage, this.messages.equipmentAssignedOnSelfError);
                }
            } else {
                Ext.Msg.alert(this.controllerMessages.alertMessage, this.messages.duplicateComponentnSelectError);
            }
        } else {
            Ext.Msg.alert(this.controllerMessages.alertMessage, this.messages.noComponentSelectToAddError);
        }
        combo.clearValue();
    },
    removeComponent: function() {
        var grid = Ext.getCmp('componentsGrid');
        var record = grid.getSelectionModel().getSelection()[0];
        if (Ext.isDefined(record)) {
            var store = Ext.StoreManager.lookup('componentStoreGrid');
            var pos = store.find('idEquipment', record.raw.idEquipment);
            store.removeAt(pos);
        } else {
            Ext.Msg.alert(this.controllerMessages.alertMessage, this.messages.noComponentSelectToRemoveError);
        }
    },
    beforeSaveEntity: function(win, form, values) {
        var items = new Array();
        var success = false;
        if (values.idMark === "") {
            values.idMark = -1;
        }
        if (values.idLocation === "") {
            values.idLocation = -1;
        }
        if (values.idEquipmentCondition === "") {
            values.idEquipmentCondition = -1;
        }
        if (values.cboSupplier === "") {
            values.cboSupplier = -1;
        }
        if (this.extraValid()) {
            var store = Ext.StoreManager.lookup('componentStoreGrid');
            for (var i = 0; i < store.getCount(); i++) {
                var record = store.getAt(i).raw;
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
    mapControlsFeature: function(controlsFeature) {
        var listFeaturesDetail = new Array();
        for (var i = 0; i < controlsFeature.length; i++) {
            var control = controlsFeature[i];
//            if(control.value != null && control.value != '') {
            if (control.value !== null) {
                if (control.xtype === 'textfield') {
                    listFeaturesDetail.push({idFeature: control.id, valueString: control.value});
                }
                else if (control.xtype === 'numberfield') {
                    listFeaturesDetail.push({idFeature: control.id, valueNumeric: control.value});
                }
                else if (control.xtype === 'datefield') {
                    listFeaturesDetail.push({idFeature: control.id, valueDateString: control.value});
                }
                else if (control.xtype === 'checkboxfield') {
                    listFeaturesDetail.push({idFeature: control.id, valueBoolean: control.value});
                }
                else if (control.xtype === 'combobox') {
                    listFeaturesDetail.push({idFeature: control.id, valueString: control.value});
                }
            }
        }
        return listFeaturesDetail;
    },
    extraValid: function() {
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
    autoMappingFunction: function(grid, form, record) {
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboEquipmentType = varForm.query("[name=idEquipmentType]")[0];
        var cboMark = varForm.query("[name=idMark]")[0];
        var cboLocation = varForm.query("[name=idLocation]")[0];
        var txtEquipmentName = varForm.query("[name=equipmentName]")[0];
        var cboEquipmentCondition = varForm.query("[name=idEquipmentCondition]")[0];
        var cboSupplier = varForm.query("[name=cboSupplier]")[0];
        var cboLot = varForm.query("[name=idLot]")[0];

        var idEquipmentType = record.raw.equipment.equipmentType.idEquipmentType;
        var idLot = 0;
        if (record.raw.equipment.lot !== null)
            idLot = record.raw.equipment.lot.idLot;
        var idSupplier;
        if (record.raw.equipment.supplier === null) {
            idSupplier = 0;
        } else {
            idSupplier = record.raw.equipment.supplier.idSupplier;
        }
        var idMark;
        if (record.raw.equipment.mark === null) {
            idMark = 0;
        } else {
            idMark = record.raw.equipment.mark.idMark;
        }
        var idLocation;
        if (record.raw.equipment.location === null) {
            idLocation = 0;
        } else {
            idLocation = record.raw.equipment.location.idLocation;
        }
        var idEquipmentCondition;
        if (record.raw.equipment.equipmentCondition === null) {
            idEquipmentCondition = 0;
        } else {
            idEquipmentCondition = record.raw.equipment.equipmentCondition.idEquipmentCondition;
        }

        if (Ext.isDefined(cboEquipmentType) && Ext.isDefined(cboMark) && Ext.isDefined(cboEquipmentCondition) && Ext.isDefined(cboLocation) && Ext.isDefined(cboSupplier)) {
            cboSupplier.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    cboSupplier.select(idSupplier);
                }
            });
            cboLot.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    cboLot.select(idLot);
                }
            });
            cboEquipmentType.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    cboEquipmentType.select(idEquipmentType);
                }
            });
            cboMark.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    cboMark.select(idMark);
                }
            });
            cboEquipmentCondition.getStore().load({
                scope: this,
                callback: function(records, operation, success) {
                    cboEquipmentCondition.select(idEquipmentCondition);
                }
            });
            if (record.raw.equipment.location !== null) {
                cboLocation.setValue(new Ext.create(sisprod.getApplication().getModelName('Location'), {
                    idLocation: record.raw.equipment.location.idLocation,
                    locationName: record.raw.equipment.location.locationName
                }));
            }
            this.loadComponents();
        }
        Ext.BaseAjax.request({
            url: 'rest/equipments/isEquipmentTypeParam.htm',
            method: "POST",
            async: false,
            params: {idEquipmentType: record.raw.equipment.equipmentType.idEquipmentType},
            success: function(response) {
                var objResponse = Ext.decode(response.responseText);
                if (objResponse.success === true) {
                    txtEquipmentName.setReadOnly(true);
                    cboEquipmentType.setReadOnly(true);
                    cboLocation.setReadOnly(true);
                }
            },
            failure: function(response) {
            }
        });
    },
    loadComponents: function() {
        var varId = Ext.getCmp("idEquipment").getValue();
        var store = Ext.StoreManager.lookup('componentStoreGrid');
        store.load({params: {idEquipmentParent: varId}});
    },
    onBeforeSelectLocation: function(combo, record, index, eOpts) {
        var idEquipment = Ext.getCmp("idEquipment").getValue();
        var varSuccess;
        var idLocation = record.data.idLocation;
        Ext.BaseAjax.request({
            url: 'rest/equipments/isRelatedLocation.htm',
            method: "GET",
            async: false,
            params: {idLocation: idLocation, idEquipment: idEquipment},
            success: function(response) {
                var objResponse = Ext.decode(response.responseText);
                varSuccess = objResponse.success;
            },
            failure: function(response) {
            }
        });
        if (varSuccess === false) {
            Ext.Msg.alert(this.controllerMessages.alertMessage, this.messages.locationNoRelatedError);
        }
        return varSuccess;
    }
});

