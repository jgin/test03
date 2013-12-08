/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellTestController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellTestStore'],
   models : ['WellTestModel'],
   entityName: 'WellTest',
   refs: [{ref: 'listWellTest', selector: 'listWellTest'}],
   views : ['WellTest.ListWellTest'],
   
   requires: [
       'sisprod.store.WellTestStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWellTest'],
       caption: function(data){
           return data['wellTestName'];
       }
   },
   
   init : function(){
        this.control({
           'listWellTest button[action=add]':{
               click: this.showAdd
           },
           
           'listWellTest button[action=update]':{
               click: this.showUpdateOnButton
           },
           
//           'listWellTest dataview': {
//               itemdblclick: this.showUpdate
//           },
           
           'listWellTest button[action=delete]': {
               click: this.destroy
           },
           
           'listWellTest button[action=activate]': {
               click: this.activate
           },
           
           'addWellTest button[action=save]': {
               click: this.saveEntity
           },
           
           'addWellTest': {
               afterrender: this.showAddForm
           },
           
           'updateWellTest button[action=save]': {
               click: this.saveEntity
           },
           
           'addWellTest combobox[id=wellTestWellId]': {
               select: this.wellTestWellId_select
           },
           
           'updateWellTest combobox[id=wellTestWellId]': {
               select: this.wellTestWellId_select
           },
           
           'listWellTest button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           }          
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWellTest();
        return tabGrid.getGridPanel();
    },
            
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        
        var productionPeriodDate=form.down('[name=productionPeriodDate]');
        productionPeriodDate.setValue(Ext.util.Format.date(record.raw.productionPeriod.productionPeriodDate, 'd-m-Y'));
        
        var wellTestWellCode = varForm.query("[id=wellTestWellCode]")[0];
        wellTestWellCode.setValue(record.raw.well.wellCode);
        
//        var cboBattery = varForm.query("[id=wellTestBatteryId]")[0];
//        var idBattery = record.raw.battery.idBattery;
        
        var cboWellTestType = varForm.query("[id=wellTestTypeId]")[0];
        var idWellTestType = record.raw.wellTestType.idWellTestType;
        
//        if(Ext.isDefined(cboBattery)){
//            cboBattery.getStore().load({ scope: this,
//                callback: function(records, operation, success){ cboBattery.select(idBattery); }
//            }); 
//        } 
        if(Ext.isDefined(cboWellTestType)){
            cboWellTestType.getStore().load({ scope: this,
                callback: function(records, operation, success){ cboWellTestType.select(idWellTestType); }
            });
        }
        
        // TODO: Cargar horas ON y OFF del pozo
        var wellController=this.getController("Well");
        this.showBatteryCode(record.raw.battery, form);
        wellController.showWellCycleAndOnOffHours({
            idWell:record.raw.well.idWell,
            productionPeriodDate:record.raw.productionPeriod.productionPeriodDate
        }, form);
        
        // Cargar las unidades de medida de la producción
        Ext.getCmp("oilQuantity").setFieldLabel(form.messages.formFields.oilQuantity + " (" + record.raw.oilMeasureUnit.measureUnitAcronym + ")");
        Ext.getCmp("gasQuantity").setFieldLabel(form.messages.formFields.gasQuantity + " (" + record.raw.gasMeasureUnit.measureUnitAcronym + ")");
        Ext.getCmp("waterQuantity").setFieldLabel(form.messages.formFields.waterQuantity + " (" + record.raw.waterMeasureUnit.measureUnitAcronym + ")");
    }, 
    
    // After Render Event
    showAddForm: function (form) {
        var me=this;
        
        // Muestra los valores iniciales de las unidades de medida
        Ext.BaseAjax.request({
            url: 'rest/configParam/getDefaultMeasureUnits.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    Ext.getCmp("oilQuantity").setFieldLabel(form.messages.formFields.oilQuantity + " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
                    Ext.getCmp("gasQuantity").setFieldLabel(form.messages.formFields.gasQuantity + " (" + objResponse.defaultMeasureUnit.gas.measureUnitAcronym + ")");
                    Ext.getCmp("waterQuantity").setFieldLabel(form.messages.formFields.waterQuantity + " (" + objResponse.defaultMeasureUnit.water.measureUnitAcronym + ")");
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
        
        // Cargar la fecha de reporte
        var productionPeriodDate=form.down('[name=productionPeriodDate]');
        var ppdController=this.getController("ProductionPeriod");
        ppdController.showProductionPeriodDateIn(productionPeriodDate);
        
    },
    
    beforeSaveEntity: function(win, form, values, jsonData){
        var productionPeriodDate=Ext.getCmp("envProductionPeriodDate").value;
        values.envProductionPeriodDate = Ext.util.Format.date(productionPeriodDate, 'Y-m-d');
        if (values.forProductionForecast===undefined)
            values.forProductionForecast=false;
        return true;
    },
    
    wellTestWellId_select: function(combo, selectedRecords, eOpts) {
        var form=combo.up("form");
        var wellController=this.getController("Well");
        var productionPeriodController=this.getController("ProductionPeriod");
        wellController.showWellCycleAndOnOffHours({
            idWell:selectedRecords[0].data.idWell,
            productionPeriodDate:productionPeriodController.getEnvProductionPeriodDateForServer()
        }, form);
        this.showBatteryCode(selectedRecords[0].raw.battery, form);
    },
            
    showBatteryCode: function(rawBattery, form) {
        form.down("[name=wellTestBatteryCode]").setValue(rawBattery.batteryCode);
    },
    
    updateWellParamsAndFeaturesButton_click: function(grid, rowIndex, colIndex){
        var wellController=this.getController("Well");
        var wellTestRecord=grid.getRecord(rowIndex, colIndex);
        var rawWellTest=wellTestRecord.raw;
        var form=wellController.showUpdateWellParamsAndFeaturesForm(
                wellController.featureEditionTypeEnum.FEATURE_EDITION_ON_WELLTEST,
        rawWellTest.well, wellTestRecord.raw.productionPeriod);
    },
    
    validateEdit: function(editor, context, eventOptions){
        var me = this;
    },
    
    cancelEdit: function(editor, context, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getLastSelected();
//        var selection = grid.getSelectionModel().getSelection()[0];
        //
        var originalValues = selection.originalValues,
            idWellTestType = null;
        if(Ext.isDefined(originalValues) && originalValues!==null){
            idWellTestType = originalValues['wellTestType.idWellTestType'];
            if(Ext.isDefined(idWellTestType) && idWellTestType!==null)
                selection.set('wellTestType.idWellTestType', idWellTestType);
        }
    },
            
    beforeEdit: function(editor, context, eventOptions){
        var me = this;
    },
    
    afterEdit: function(editor, context, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getLastSelected();
        var gridRecord = selection.data;
        //
        var record = context.record.data;
        var values = {
            idWellTest: record['idWellTest'],
            testHours: record['testHours'],
            idWellTestType: gridRecord['wellTestType.idWellTestType'],
            oilQuantity: record['oilQuantity'],
            gasQuantity: record['gasQuantity'],
            waterQuantity: record['waterQuantity'],
            forProductionForecast: record['forProductionForecast'],
            comments: record['comments']
        };
        Ext.BaseAjax.request({
            url: 'rest/wellTest/inLineUpdate.htm',
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
            
    onSelectWellType: function(combobox, record, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];
        selection.originalValues = {
            'wellTestType.idWellTestType': selection.data['wellTestType.idWellTestType']
        };
        selection.set('wellTestType.idWellTestType', record[0].data['idWellTestType']);
    }
});

