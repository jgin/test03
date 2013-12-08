/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellStore', 'WellStateAllStore', 'WellTypeByStateByWellStateStore', 'WellTypeByProductionAllStore',
            'ExtractionTypeByWellTypeByStateStore', 'WellGroupAllStore', 'FieldAllStore', 'BatteryAllStore', 
            'LotAll', 'BatteryByLotStore', 'FieldByLotStore'],
   models : ['WellModel'],
   entityName: 'Well',
   refs: [{ref: 'listWell', selector: 'listWell'}],
   views : ['Well.ListWell'],
   
   requires: [
       'sisprod.store.WellStore',
       'sisprod.store.WellStateAllStore',
       'sisprod.store.WellTypeByStateByWellStateStore',
       'sisprod.store.WellTypeByProductionAllStore',
       'sisprod.store.ExtractionTypeByWellTypeByStateStore',
       'sisprod.store.WellGroupAllStore',
       'sisprod.store.FieldAllStore',
       'sisprod.store.BatteryAllStore',
       'sisprod.store.LotAll',
       'sisprod.store.BatteryByLotStore',
       'sisprod.store.FieldByLotStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWell'],
       caption: function(data){
           return data['wellName'];
       }
   },
           
    idExtractionType: null,
   
    featureEditionTypeEnum: {
        FEATURE_EDITION_ON_WELLTEST: 0,
        FEATURE_EDITION_ON_WELLSERVICE: 1
    },
           
   messages: {
       msgNoConfigMeasureUnit: 'Not configured as units of production, contact the system administrator',
       msgOil: 'Oil',
       msgWater: 'Water',
       msgGas: 'Gas',
       msgCarrera: 'Carrera',
       msgAlertNoValidCicle: '{0} x {1} not a valid cycle',
       fileUploadingWaitMessage: 'Uploading file, please wait...'
   },
   
   init : function(){
        this.control({
           'listWell button[action=activate]':{
               click: this.activate
           },
           
           'listWell button[action=add]':{
               click: this.showAdd
           },
           
           'listWell button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWell button[action=test]':{
               click: this.showTest
           },
           
           'listWell dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWell button[action=delete]': {
               click: this.destroy
           },
           
           'listWell button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWell button[action=save]': {
               click: this.verifyConfigParam
           },
           
           'updateWell button[action=save]': {
               click: this.verifyConfigParam
           },
           
           'updateWell':{
               show: function(){
                   if(this.idExtractionType !== null){
                        this.loadWellFeatures(this.idExtractionType, 'featuresForUpdate');
                   }
               },
               afterrender: this.showInitialMeasureUnits
           },
                   
           'addWell':{
               afterrender: this.showInitialMeasureUnits
           },
                   
           'addWell combo[id=idExtractionType]':{
                select: function(cbo){
                    var idExtractionType = cbo.getValue();
                    this.loadWellFeatures(idExtractionType, 'featuresForRegister');
                }
           },
                   
           'updateWell combo[id=idExtractionType]':{
                select: function(cbo){
                    var idExtractionType = cbo.getValue();
                    this.loadWellFeatures(idExtractionType, 'featuresForRegister');
                }
           },
                   
           'updateWell combo[id=idWellState]':{
                select: function(cbo){
                    this.onWellStateSelect(cbo.getValue());
                }
           },
                   
           'addWell combo[id=idWellState]':{
                select: function(cbo){
                    this.onWellStateSelect(cbo.getValue());
                }
           },
                   
           'updateWell combo[id=idWellTypeByState]':{
                select: function(cbo){
                    this.onWellTypeByStateSelect(cbo.getValue());
                }
           },
                   
           'addWell combo[id=idWellTypeByState]':{
                select: function(cbo){
                    this.onWellTypeByStateSelect(cbo.getValue());
                }
           },
                   
           'addWell button[action=close]':{
                click: this.onCloseWindow
           },
                   
           'updateWell button[action=close]':{
                click: this.onCloseWindow
           },
                   
           'addWell textfield[id=workingTime]':{
                change: this.calculateOffOn
           },
                   
           'addWell textfield[id=breakTime]':{
                change: this.calculateOffOn
           },
           
           'updateWell textfield[id=workingTime]':{
                change: this.calculateOffOn
           },
                   
           'updateWell textfield[id=breakTime]':{
                change: this.calculateOffOn
           },
            
           'updateWellParamsAndFeatures button[action=save]':{
                click: this.updateWellParamsAndFeaturesAction
           },
           'updateWellParamsAndFeaturesSDP button[action=save]':{
                click: this.updateWellParamsAndFeaturesSdpAction
           },
            
           'updateWellParamsAndFeatures textfield[name=onCycle]':{
                change: this.calcWellOnOffHoursOnUpdateWellParamsAndFeaturesForm
           },
            
           'updateWellParamsAndFeatures textfield[name=offCycle]':{
                change: this.calcWellOnOffHoursOnUpdateWellParamsAndFeaturesForm
           },
                   
           'updateWell combo[id=idLot]':{
                select: function(cbo){
                    this.onLotSelect(cbo.getValue());
                }
           },
                   
           'addWell combo[id=idLot]':{
                select: function(cbo){
                    this.onLotSelect(cbo.getValue());
                }
           },
           'listWell button[action=attachFiles]': {
               click: this.onAttachFileButton
           },
           'completionDiagramWindow button[action=uploadFile]': {
               click: this.onUploadFile
           },
           'completionDiagramWindow button[action=removeFile]': {
               click: this.onRemoveFile
           },
                   
           'listWell button[action=assignEquipments]': {
               click: this.onAssignEquipmentsButton
           },
           
            'assignEquipments button[action=save]': {
               click: this.saveWellEquipment
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWell();
        return tabGrid.getGridPanel();
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
        var window = Ext.create('sisprod.view.Well.CompletionDiagramWindow',{
            data: record
        });
        window.show();
    },
    
    beforeSaveEntity: function(win, form, values, jsonData){        
        var formControls = Ext.getCmp('featureData');
        var controlsFeature = formControls.items.items;
        var listFeaturesDetail = this.mapControlsFeature(controlsFeature);
        
        var idWell = Ext.getCmp('idWell').getValue();
        if(Ext.isDefined(idWell) && idWell !== '' && idWell !== null){
            values.idWell = idWell;
        }
        values.listFeatures = JSON.stringify(listFeaturesDetail);
        return true;
    },
    
    onUploadFile: function(button){
        var me = this;
        var formPanel = button.up('form');
        var window = formPanel.up('window');
        var grid = window.down('#completionDiagramGrid');
        var store = grid.getStore();
//        var form = formPanel.getForm();
        if(formPanel.isValid()){
            formPanel.submit({
                url: 'rest/completionDiagram/register.htm',
                method: 'POST',
                waitMsg: me.messages.fileUploadingWaitMessage,
                success: function(form, action){
                    store.reload();
                    form.reset();
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
        var grid = button.up('#completionDiagramGrid');
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
                        var idCompletionDiagram = data['idCompletionDiagram'];
                        Ext.BaseAjax.request({
                           url: 'rest/completionDiagram/delete.htm',
                           params: {
                               idCompletionDiagram: idCompletionDiagram
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
    verifyConfigParam: function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/well/verifyConfigParam.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    me.saveEntity(button);
                }
                else{
                    showAlertMessage(me.messages.msgNoConfigMeasureUnit);
                }
            },
            failure: function(response, options){
            }
        });
    },
            
    mapControlsFeature: function(controlsFeature){
        var listFeaturesDetail = new Array();
        for(var i = 0; i < controlsFeature.length; i++){
            var control = controlsFeature[i];
            //if(control.value != null && control.value != '') {
                if(control.xtype === 'textfield'){
                    listFeaturesDetail.push({wellFeature:{idWellFeature: control.id}, valueString: control.value});
                }
                else if(control.xtype === 'numberfield'){
                    listFeaturesDetail.push({wellFeature:{idWellFeature: control.id}, valueNumeric: control.value});
                }
                else if(control.xtype === 'datefield'){
                    listFeaturesDetail.push({wellFeature:{idWellFeature: control.id}, valueDateString: control.value});
                }
                else if(control.xtype === 'checkboxfield'){
                    listFeaturesDetail.push({wellFeature:{idWellFeature: control.id}, valueBoolean: control.value});
                }
                else if(control.xtype === 'combobox'){
                    listFeaturesDetail.push({wellFeature:{idWellFeature: control.id}, valueString: control.value});
                }
           // }
        }
        return listFeaturesDetail;
    },
            
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record); 
        var idExtractionType = null;
        var idWellTypeByState = null;
        var idWellState;
        
        if(record.raw.wellState != undefined){
            idWellState = record.raw.wellState.idWellState;
            Ext.getCmp('idWellState').setValue(record.raw.wellState.idWellState);
        }       

        Ext.getCmp('idWell').setValue(record.data.idWell);

        if(Ext.isDefined(record.raw.wellTypeByState) && record.raw.wellTypeByState !== null)
            idWellTypeByState = record.raw.wellTypeByState.idWellTypeByState;
        
        if(Ext.isDefined(record.raw.wellTypeByProduction) && record.raw.wellTypeByProduction !== null)
            Ext.getCmp('idWellTypeByProduction').setValue(record.raw.wellTypeByProduction.idWellTypeByProduction);
        
        if(Ext.isDefined(record.raw.wellGroup) && record.raw.wellGroup !== null)
            Ext.getCmp('idWellGroup').setValue(record.raw.wellGroup.idWellGroup);
            
        if(Ext.isDefined(record.raw.extractionType) && record.raw.extractionType !== null){
            idExtractionType = record.raw.extractionType.idExtractionType;
            this.idExtractionType = idExtractionType;
        }
        
        var cboWellTypeByState = Ext.getCmp('idWellTypeByState');
        var cboExtractionType = Ext.getCmp('idExtractionType');
        var cboField = Ext.getCmp('idField');
        var cboLot = Ext.getCmp('idLot');
        var cboBattery = Ext.getCmp('idBattery');
        var storeWT = cboWellTypeByState.getStore();
        var storeET = cboExtractionType.getStore();
        var storeField = cboField.getStore();
        var storeBattery = cboBattery.getStore();
        
        storeWT.proxy.extraParams.idWellState = idWellState;
        storeET.proxy.extraParams.idWellTypeByState = idWellTypeByState;
        
        if(Ext.isDefined(record.raw.lot) && record.raw.lot !== null){
            storeField.proxy.extraParams.idLot = record.raw.lot.idLot;
            storeBattery.proxy.extraParams.idLot = record.raw.lot.idLot;
            cboLot.select(record.raw.lot.idLot);
        }
        
        if(idWellTypeByState !== null){
            storeWT.load({
               scope: this,
               callback: function(records, operation, success){
                   cboWellTypeByState.select(idWellTypeByState);
                   storeET.load({
                       scope: this,
                       callback: function(records, operation, success){
                           cboExtractionType.select(idExtractionType);
                       }
                   });
               }
            });
        }
        
        if(Ext.isDefined(record.raw.field) && record.raw.field !== null){
            storeField.load({
                scope: this,
                callback: function(records, operation, success){
                    cboField.select(record.raw.field.idField);
                }
            });
        }
        
        if(Ext.isDefined(record.raw.battery) && record.raw.battery !== null){
            storeBattery.load({
                scope: this,
                callback: function(records, operation, success){
                    cboBattery.select(record.raw.battery.idBattery);
                }
            });
        }
    },
    
    loadWellFeatures: function(idExtractionType, requestMapping){
        var idWell = Ext.getCmp('idWell').getValue();    
        this.renderView(idWell, idExtractionType, requestMapping);
    },
            
    onWellStateSelect: function(idWellState){
        var cboWellTypeByState = Ext.getCmp('idWellTypeByState');
        var cboExtractionType = Ext.getCmp('idExtractionType');
        var storeWT = cboWellTypeByState.getStore();
        var storeET = cboExtractionType.getStore();
        storeWT.proxy.extraParams.idWellState = idWellState;
        storeET.proxy.extraParams.idWellTypeByState = -1;
        storeWT.reload();
        storeET.loadData([]);
    },
            
    onWellTypeByStateSelect: function(idWellTypeByState){
        var cboExtractionType = Ext.getCmp('idExtractionType');
        var storeET = cboExtractionType.getStore();
        storeET.proxy.extraParams.idWellTypeByState = idWellTypeByState;
        storeET.reload();
    },
            
    renderView: function(idWell, idExtractionType, requestMapping){
        var me = Ext.getCmp('featureData');
        me.removeAll();
        var combosArray = new Array();
        var url = "rest/wellFeature/" + requestMapping + ".htm";
        url = url + "?idExtractionType=" + idExtractionType;
        if(idWell !== null){
            url = url + "&idWell=" + idWell;
        }
        var objResponse = Ext.decode(synchronousRequest(url, "GET").responseText);
        for (var i = 0; i < objResponse.features.length; i++){
            if(objResponse.features[i].xtype === 'combobox'){
                var varStore = Ext.create('sisprod.store.' + objResponse.features[i].store + 'Store');
                var response = Ext.decode(synchronousRequest("rest/itemWellFeatureList/listAll.htm?idWellFeature=" + objResponse.features[i].id, "GET").responseText);
                varStore.loadData(response.data, false);
                objResponse.features[i].store = varStore;
                if(Ext.isDefined(objResponse.features[i].value)){
                    combosArray.push(objResponse.features[i]);
                }
            }
            me.add(objResponse.features[i]);
        }
       
        for(var i = 0; i < combosArray.length; i++){
            var cbo = Ext.getCmp(combosArray[i].id);
            cbo.rawValue = combosArray[i].value;
            cbo.value = combosArray[i].value;
            cbo.lastValue = combosArray[i].value;
        }
    },
            
    onCloseWindow: function(){
        var wts = this.getStore('WellTypeByStateByWellStateStore');
        wts.proxy.extraParams.idWellState = -1;
        wts.loadData([]);

        var ets = this.getStore('ExtractionTypeByWellTypeByStateStore');
        ets.proxy.extraParams.idWellTypeByState = -1;
        ets.loadData([]);
    },
    
    requestDefaultMeasureUnits: function(opt) {
        var me=this;
        Ext.BaseAjax.request({
            url: 'rest/configParam/getDefaultMeasureUnits.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    if (opt.success) opt.success(objResponse);
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    },
    
    showInitialMeasureUnits: function (win) {
        var me=this;
        Ext.BaseAjax.request({
            url: 'rest/configParam/getDefaultMeasureUnits.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    Ext.getCmp("oil").setFieldLabel(me.messages.msgOil + " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
                    Ext.getCmp("gas").setFieldLabel(me.messages.msgGas + " (" + objResponse.defaultMeasureUnit.gas.measureUnitAcronym + ")");
                    Ext.getCmp("water").setFieldLabel(me.messages.msgWater + " (" + objResponse.defaultMeasureUnit.water.measureUnitAcronym + ")");
                    Ext.getCmp("carrera").setFieldLabel(me.messages.msgCarrera + " (" + objResponse.defaultMeasureUnit.carrera.measureUnitAcronym + ")");
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    },
    
    calculateOffOn: function (){
        var wt = Ext.getCmp('workingTime').getValue();
        var bt = Ext.getCmp('breakTime').getValue();
        if(Ext.isDefined(wt, bt) && wt !== '' && bt !== '' && wt !== null && bt !== null){
            var tc = wt + bt;

            if(24 % tc === 0){
                var nr = 24 / tc;
                Ext.getCmp('onHours').setValue(nr*wt);
                Ext.getCmp('offHours').setValue(nr*bt);
            }
            else{
                Ext.getCmp('onHours').setValue('');
                Ext.getCmp('offHours').setValue('');
            }
        }
    },
            
    calcWellOnOffHoursOf: function(onCycle, offCycle) {
        var sum=parseInt(onCycle)+parseInt(offCycle);
        var factor=24/sum;
        var ret={
            onHours: parseInt(onCycle*factor),
            offHours: parseInt(offCycle*factor)
        };
        return ret;
    },
            
    getWellCycleAndOnOffHours : function(data, successFunction) {
        Ext.BaseAjax.request({
            url: 'rest/well/getWellCycleAndOnOffHours.htm',
            method: 'POST',
            params:{
                idWell: data.idWell,
                productionPeriodDate: data.productionPeriodDate
            },
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    if (successFunction!==undefined && successFunction!==null)
                        successFunction(objResponse);
                }
                else{
                    return null;
                }
            },
            failure: function(response, options){
            }
        });
    },
    
    showWellCycleAndOnOffHours: function(data, form) {
        var me=this;
        var idWell=data.idWell;
        me.getWellCycleAndOnOffHours(data, function(res) {
            me.setDataInForm(form, res);
        });
    },
    
    /**
     * Muestra el formulario de edición de parámetros y características de pozo
     * @param {string} from Indica desde dónde se desea editar params/caract de pozo
     * @param {int} well raw de datos del pozo
     * @return form
     */
    showUpdateWellParamsAndFeaturesForm: function(featureEditionType, well, productionPeriod) {
        var me=this;
        var form = null;
        if(featureEditionType===0){
            form=Ext.create('sisprod.view.Well.UpdateWellParamsAndFeatures', {
                controller: me,
                well: well,
                featureEditionType: featureEditionType,
                productionPeriodDate: productionPeriod.productionPeriodDate
            });
        }
        else{
            Ext.BaseAjax.request({
                url: 'rest/wellEquipment/getByIdWell.htm',
                async:false,
                params: {idWell: well.idWell},
                success: function(response) {
                    var responseData = Ext.decode(response.responseText);
                    var wellEquipment = responseData.wellEquipment;
                    //
                    form = Ext.create('sisprod.view.Well.UpdateWellParamsAndFeaturesSDP', {
                        controller: me,
                        well: well,                
                        featureEditionType: featureEditionType,
                        productionPeriodDate: productionPeriod.productionPeriodDate,
                        wellEquipment: wellEquipment
                    });
                }
            });
//            form=Ext.create('sisprod.view.Well.UpdateWellParamsAndFeaturesSDP', {
//                controller: me,
//                well: well,                
//                featureEditionType: featureEditionType,
//                productionPeriodDate: productionPeriod.productionPeriodDate,
//                wellEquipment: wellEquipment,
//                fluidLevelConfigParam: fluidLevelConfigParam
//            });
        }
        if(well.extractionType !==null){
            var panel=form.down('[name=featuresPanel]');

            panel.removeAll();
            var combosArray = new Array();
            var url = "rest/wellFeature/featuresForUpdate.htm";
            url += "?idExtractionType=" + well.extractionType.idExtractionType;
            url += "&idWell=" + well.idWell;
            url += "&featureEditionType="+featureEditionType;
            url += "&productionPeriodDate="+productionPeriod.productionPeriodDate;
            var objResponse = Ext.decode(synchronousRequest(url, "GET").responseText);
            for (var i = 0; i < objResponse.features.length; i++){
                if(objResponse.features[i].xtype === 'combobox'){
                    var varStore = Ext.create('sisprod.store.' + objResponse.features[i].store + 'Store');
                    var response = Ext.decode(synchronousRequest("rest/itemWellFeatureList/listAll.htm?idWellFeature=" + objResponse.features[i].id, "GET").responseText);
                    varStore.loadData(response.data, false);
                    objResponse.features[i].store = varStore;
                    if(Ext.isDefined(objResponse.features[i].value)){
                        combosArray.push(objResponse.features[i]);
                    }
                }
                panel.add(objResponse.features[i]);
            }

            for(var i = 0; i < combosArray.length; i++){
                var cbo = Ext.getCmp(combosArray[i].id);
                cbo.rawValue = combosArray[i].value;
                cbo.value = combosArray[i].value;
                cbo.lastValue = combosArray[i].value;
            }
        }
        //
        this.showWellCycleAndOnOffHours({
            idWell:well.idWell,
            productionPeriodDate:productionPeriod.productionPeriodDate
        }, form);
        var productionPeriodDateField=form.down('[name=productionPeriodDate]');
        productionPeriodDateField.setValue(sisprod.getApplication().formatEnglishDate(productionPeriod.productionPeriodDate));
        
//        var ppDateObject = Ext.Date.parse(productionPeriod.productionPeriodDate, "Y-m-d");
//        productionPeriodDateField.setValue(Ext.util.Format.date(ppDateObject, 'd-m-Y'));
//        var ppdController=this.getController("ProductionPeriod");
        
//        ppdController.showProductionPeriodDateIn(productionPeriodDateField);
        
        var wellField=form.down('[name=wellCode]');
        wellField.setValue(well.wellCode);
        
        if (productionPeriod.closed) {
            form.down("[action=save]").destroy();
        }
        
        form.show();
        
        return form;
    },
            
    updateWellParamsAndFeaturesAction: function(button) {
        var form=button.up("form");
        var win=form.up("window");
        var formValues=form.getValues();
        
        var formControls = form.down('[name=featuresPanel]');
        var controlsFeature = formControls.items.items;
        var listFeaturesDetail = this.mapControlsFeature(controlsFeature);
        var listFeatures = JSON.stringify(listFeaturesDetail);
        
        Ext.BaseAjax.request({
            url: 'rest/well/updateWellParamsAndFeatures.htm',
            method: "POST",
            params: {
                idWell: win.well.idWell,
                featureEditionType: win.featureEditionType,
                onCycle: formValues.onCycle,
                offCycle: formValues.offCycle,
                productionPeriodDate: win.productionPeriodDate,
                listFeatures: listFeatures
            },
            success: function(response){
                
                win.close();
            }
        });
    },
    updateWellParamsAndFeaturesSdpAction: function(button) {
        var form=button.up("form");
        var win=form.up("window");
        var formValues=form.getValues();
        console.log(win);
        console.log(formValues);
        var formControls = form.down('[name=featuresPanel]');
        var controlsFeature = formControls.items.items;
        var listFeaturesDetail = this.mapControlsFeature(controlsFeature);
        var listFeatures = JSON.stringify(listFeaturesDetail);
        
        var idWellEquipment = formValues.idWellEquipment;
        if(Ext.isEmpty(idWellEquipment)){
            idWellEquipment = '-1';
        }
        
        Ext.BaseAjax.request({
            url: 'rest/well/updateWellParamsAndFeaturesSDP.htm',
            method: "POST",
            params: {
                idWell: win.well.idWell,
                featureEditionType: win.featureEditionType,
                idWellEquipment: idWellEquipment,
                onCycle: formValues.onCycle,
                offCycle: formValues.offCycle,
                engineIdEquipment: formValues.engineIdEquipment,
                unitIdEquipment: formValues.unitIdEquipment,
                productionPeriodDate: win.productionPeriodDate,
                listFeatures: listFeatures
            },
            success: function(response){
                
                win.close();
            }
        });
    },
    
    calcWellOnOffHoursOnUpdateWellParamsAndFeaturesForm: function(field) {
        var form=field.up("form");
        
        var onCycleField=form.down("[name=onCycle]");
        var offCycleField=form.down("[name=offCycle]");
        
        var onHoursField=form.down("[name=onHours]");
        var offHoursField=form.down("[name=offHours]");
        
        var onOffHours=this.calcWellOnOffHoursOf(onCycleField.getValue(), offCycleField.getValue());
        if (!isNaN(onOffHours.onHours)) onHoursField.setValue(onOffHours.onHours);
        else onHoursField.setValue('');
        
        if (!isNaN(onOffHours.offHours)) offHoursField.setValue(onOffHours.offHours);
        else offHoursField.setValue('');
//        offHoursField.setValue(onOffHours.offHours);
    },
    
    onLotSelect: function(idLot){
        var cboBattery = Ext.getCmp('idBattery');
        var cboField = Ext.getCmp('idField');
        var storeBattery = cboBattery.getStore();
        var storeField = cboField.getStore();
        storeBattery.proxy.extraParams.idLot = idLot;
        storeField.proxy.extraParams.idLot = idLot;
        storeBattery.reload();
        storeField.reload();
    },
            
    onAssignEquipmentsButton: function(button) {
        var me = this;
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)) {
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
        var record = selection.raw;
        Ext.BaseAjax.request({
            url: 'rest/wellEquipment/getByIdWell.htm',
            params: {idWell: record['idWell']},
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                var wellEquipment = responseData.wellEquipment;
                var fluidLevelConfigParam = responseData.fluidLevelConfigParam;
                //
                var window = Ext.create('sisprod.view.Well.AssignEquipments', {
                    record: record,
                    wellEquipment: wellEquipment,
                    fluidLevelConfigParam: fluidLevelConfigParam
                });
                window.show();
            }
        });
    },
    
    saveWellEquipment: function(button) {
        var me = this;
        var form = button.up('form');
        var window = button.up('window');
        
        if(form.isValid()) {
            var values = sisprod.getApplication().getOnlyKeysWithValue(form.getValues());
            Ext.BaseAjax.request({
               url: 'rest/wellEquipment/saveWellEquipments.htm',
               method: 'POST',
               params: values,
               success: function(response) {
                   var responseData = Ext.decode(response.responseText);
                   if(responseData.success) window.close();
                   else Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
               }
            });
            console.log(values);
        }
    }
});
