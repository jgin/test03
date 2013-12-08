/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ProductionForecastController', {
   extend: 'sisprod.controller.Base',
   stores : ['ProductionForecastStore', 'LotAll', 'BatteryByLotStore'],
   models : ['ProductionForecastModel'],
   entityName: 'ProductionForecast',
   refs: [{ref: 'listProductionForecast', selector: 'listProductionForecast'}],
   views : ['ProductionForecast.ListProductionForecast'],
   
   requires: [
       'sisprod.store.ProductionForecastStore',
       'sisprod.store.LotAll',
       'sisprod.store.BatteryByLotStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idProductionForecast'],
       caption: function(data){
           return data['productionForecastName'];
       }
   },
           
    messages:{
        msgAlertNoGenerateForecast: 'Not been run generation forecast'
    },
   
   init : function(){
        Ext.create('sisprod.store.ProductionForecastWellStore',{
                storeId : 'forecastDetailStore'
        });
        this.control({
           'listProductionForecast button[action=activate]':{
               click: this.activate
           },
           
           'listProductionForecast button[action=add]':{
               click: this.showAdd
           },
           
           'listProductionForecast button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listProductionForecast button[action=test]':{
               click: this.showTest
           },
           
           'listProductionForecast dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listProductionForecast button[action=delete]': {
               click: this.destroy
           },
           
           'listProductionForecast button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addProductionForecast button[action=save]': {
               click: this.saveEntity
           },
           
           'updateProductionForecast button[action=save]': {
               click: this.saveEntity
           },
           
           'addProductionForecast button[action=generateForecast]': {
               click: this.generateForecast
           },

           'addProductionForecast':{
               beforerender: this.onBeforeRender
           },
                   
           'addProductionForecast combo[id=idLot]':{
                change: this.listBatteryByLotPerAdd
           },
                   
           'addProductionForecast gridpanel[id=gridProductionForecast]': {
               itemdblclick: this.showProductionForecastDetail
           }, 
                   
           'updateProductionForecast gridpanel[id=gridProductionForecast]': {
               itemdblclick: this.showProductionForecastDetail
           },        
           
           'updateProductionForecast': {
                afterrender: this.listBatteryByLotPerUpdate
           },
                   
           'productionForecastDetail button[action=save]':{
                click: this.saveChangesInDetail
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListProductionForecast();
        return tabGrid.getGridPanel();
    },
            
    showProductionForecastDetail: function(){
        var gridBattery = Ext.getCmp('gridProductionForecast');
        var idProductionForecast = Ext.getCmp('idProductionForecast').getValue();
        if(Ext.isDefined(gridBattery) && Ext.isDefined(idProductionForecast) && idProductionForecast !== ''){
            var batteryRecord = gridBattery.getSelectionModel().getSelection()[0];
            if(!Ext.isDefined(batteryRecord)){
                batteryRecord = gridBattery.getStore().getAt(index);
            }
            var forecastDetailStore = Ext.StoreManager.lookup('forecastDetailStore');
            forecastDetailStore.load({params: {idProductionForecast: idProductionForecast, idBattery:batteryRecord.raw.idBattery}});
            var form = Ext.create('sisprod.view.ProductionForecast.ProductionForecastDetail');
            form.show();
        }
        else{
            showAlertMessage(this.messages.msgAlertNoGenerateForecast);
        }
    },
            
    showProductionForecastDetailFromImage: function(grid, index){
        var idProductionForecast = Ext.getCmp('idProductionForecast').getValue();
        if(Ext.isDefined(idProductionForecast) && idProductionForecast !== ''){
            var batteryRecord = grid.getStore().getAt(index);
            var forecastDetailStore = Ext.StoreManager.lookup('forecastDetailStore');
            forecastDetailStore.load({params: {idProductionForecast: idProductionForecast, idBattery:batteryRecord.raw.idBattery}});
            var form = Ext.create('sisprod.view.ProductionForecast.ProductionForecastDetail');
            form.show();
        }
        else{
            showAlertMessage(this.messages.msgAlertNoGenerateForecast);
        }
    },
            
    generateForecast: function(button){
        var window = button.up('window');
        var form = window.down('form');
        var me = this;
        var values = form.getValues();
        this.setEffectiveDates(values);
        if(!form.isValid()) return;
        Ext.BaseAjax.request({
            url: 'rest/productionForecast/verifyExistForecast.htm',
            method: 'POST',
            params: values,
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.result == true){
                    me.saveEntity(button);
                    button.disable();
                }
                else{
                    showAlertMessage('Ya Existe un pronostico para el lote y fechas ingresadas');
                }
            },
            failure: function(response, options){
            }
        });
    },
            
    listBatteryByLotPerAdd: function(){
        var idLot = Ext.getCmp('idLot').getValue();
        var button = Ext.getCmp('buttonAdd');
        var idProductionForecast = Ext.getCmp('idProductionForecast');
        if(Ext.isDefined(idLot) && idLot != ''){
            idProductionForecast.setValue(null);
            var batteryStore = this.getStore('BatteryByLotStore');
            batteryStore.load({
                params: {idLot: idLot},
                callback: function(){
                    if(batteryStore.getCount() == 0) button.disable();
                    else button.enable();
                }
            });
        }
    },
            
    listBatteryByLotPerUpdate: function(){
        var idLot = Ext.getCmp('idLot').getValue();
        if(Ext.isDefined(idLot) && idLot != ''){
            var batteryStore = this.getStore('BatteryByLotStore');
            batteryStore.load({params: {idLot: idLot}});
        }
    },
            
    afterSaveEntity: function(win, form, response, options){
        var objResponse = Ext.decode(response.responseText);
        var productionForecast = objResponse.register;
        var idProductionForecast = Ext.getCmp("idProductionForecast");
        idProductionForecast.setValue(productionForecast.idProductionForecast);
        var batteryStore = this.getStore("BatteryByLotStore");
        
        var values = {};
        values.idProductionForecast = productionForecast.idProductionForecast;
        this.setPreviusMonthDates(values);
        for(var i = 0; i < batteryStore.getCount(); i++){
            var battery = batteryStore.getAt(i);
            values.idBattery = battery.raw.idBattery;
            Ext.Ajax.request({
                url: 'rest/productionForecast/generateForecast.htm',
                method: 'POST',
                params: values,
                async: false,
                success: function(response, options){
                    var obj = Ext.decode(response.responseText);
                    if(obj.success == true){
                        battery.set('isProcessed', true);
                    }
                    else{
                        battery.set('isProcessed', false);
                    }
                },
                failure: function(response, options){}
            });
        }
    },
    
    saveChangesInDetail: function(button){
        var forecastDetailStore = Ext.StoreManager.lookup('forecastDetailStore');
        var win = button.up('window');
        var listDetails = new Array();
        for(var i = 0; i < forecastDetailStore.getCount(); i++){
            var record = forecastDetailStore.getAt(i);
            var detail = {
                idProductionForecastWell: record.data.idProductionForecastWell,
                oil: record.data.oil,
                water: record.data.water,
                gas: record.data.gas,
                workingTime: record.data.workingTime,
                breakTime:  record.data.breakTime,
                onHours: record.data.onHours,
                offHours: record.data.offHours
            };
            listDetails.push(detail);
        }
        
        var values = {};
        values.listDetails = JSON.stringify(listDetails);
        Ext.BaseAjax.request({
           url: 'rest/productionForecastWell/updateDetails.htm',
           method: 'POST',
           params: values,
           success: function(response, options){
               var objResponse = Ext.decode(response.responseText);
               if(objResponse.success == true){
                   win.close();
               }
               else{
                   showModalDialog("Ocurrio un Error al guardar los cambios");
               }
           },
           failure: function(response, options){
           }
        });
    },
    
    beforeSaveEntity: function(window, form, values, jsonData){
        this.setEffectiveDates(values);
        return true;
    },
            
    setEffectiveDates: function(values){
        var controlDate = Ext.getCmp('idMonth');
        if(!Ext.isDefined(controlDate)) return false;
        var month = controlDate.month;
        var year = controlDate.year;
        var effectiveStartDate = getStartDateInMonth(month, year);
        var effectiveEndDate = getEndDateInMonth(month, year);
        values.effectiveStartDate = effectiveStartDate;
        values.effectiveEndDate = effectiveEndDate;
    },
            
    onBeforeRender: function(){
        var batteryStore = this.getStore("BatteryByLotStore");
        var buttonAdd = Ext.getCmp('buttonAdd');
        batteryStore.removeAll();
        buttonAdd.disable();
    },
            
    autoMappingFunction: function(grid, window, record){
        window.down('form').loadRecord(record);
        var data = record.data;
        var cboMonth = Ext.getCmp('idMonth');
        cboMonth.setValue(data.effectiveStartDate);
        cboMonth.month = parseInt(data.effectiveStartDate.substring(5, 7));
        cboMonth.year = parseInt(data.effectiveStartDate.substring(0, 4));
    },
            
    setPreviusMonthDates: function(values){
        var controlDate = Ext.getCmp('idMonth');
        if(!Ext.isDefined(controlDate)) return false;
        var month = controlDate.month;
        var year = controlDate.year;
        var previusMonthStartDate = getStartDateInMonth(month - 1, year);
        var previusMonthEndDate = getEndDateInMonth(month - 1, year);
        values.startDate = previusMonthStartDate;
        values.endDate = previusMonthEndDate;
    }
});

