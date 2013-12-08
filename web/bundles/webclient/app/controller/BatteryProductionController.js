Ext.define('sisprod.controller.BatteryProductionController', {
   extend: 'sisprod.controller.Base',
   stores : ['BatteryProductionStore'],
   models : ['BatteryProductionModel'],
   entityName: 'BatteryProduction',
   refs: [{ref: 'listBatteryProduction', selector: 'listBatteryProduction'}],
   views : ['BatteryProduction.ListBatteryProduction'],
  
   requires: [
       'sisprod.store.BatteryProductionStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idBatteryProduction'],
       caption: function(data){ 
               return data['battery'].batteryCode;
       } 
   },
   messages:{
        batteryLabel:'Name Battery',
        msgOil:'Oil',
        msgWater:'Water',
        msgGas:'Gas',
        msgProductionPeriod: 'The period of production is already approved'
    },
   
   init : function(){
        this.control({
            'listBatteryProduction button[action=activate]':{
               click: this.activate
           },
           'listBatteryProduction button[action=add]':{
               click: this.onClickAdd
               
           },
           
           'listBatteryProduction button[action=update]':{
               click: this.onClickUpdateOnButton
           },
           
           'listBatteryProduction dataview': {
               itemdblclick: this.onClickUpdate
           },
           
           'listBatteryProduction button[action=delete]': {
               click: this.onClickDelete
           },
           
           'listBatteryProduction button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addBatteryProduction button[action=save]': {
               click: this.saveEntity
           },
           
           'updateBatteryProduction button[action=save]': {
               click: this.saveEntity
           },
           'addBatteryProduction':{
               afterrender: this.showInitialMeasureUnits
           },      
           'updateBatteryProduction':{
               afterrender: this.showInitialMeasureUnits
           },      
           'addBatteryProduction combobox[id=cboBatteryByLot]': { 
               select: this.onSelectBattery
           },
           'updateBatteryProduction combobox[id=cboBatteryByLot]': { 
               select: this.onSelectBattery
           },
           'addBatteryProduction combobox[id=idLotBatteryProduction]': { 
               select: this.onSelectLot
           }
       });
       this.callParent(arguments);
    },
    showInitialMeasureUnits: function (win) {
        var me=this;
        this.afterRender();
        Ext.BaseAjax.request({
            url: 'rest/configParam/getDefaultMeasureUnits.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    Ext.getCmp("oilBatteryProduction").setFieldLabel(me.messages.msgOil + " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
                    Ext.getCmp("gasBatteryProduction").setFieldLabel(me.messages.msgGas + " (" + objResponse.defaultMeasureUnit.gas.measureUnitAcronym + ")");
                    Ext.getCmp("waterBatteryProduction").setFieldLabel(me.messages.msgWater + " (" + objResponse.defaultMeasureUnit.water.measureUnitAcronym + ")");
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
        
    },
    afterRender:function(){ 
        var cboLot = Ext.getCmp('idLotBatteryProduction'); 
        var idLot = -1; 
        if(Ext.util.Cookies.get('envLotId')!=null){ 
            idLot=parseInt(Ext.util.Cookies.get('envLotId')); 
        } 
        if(Ext.isDefined(cboLot)){ 
            cboLot.getStore().load({ 
                scope: this, 
                callback: function(records, operation, success){ 
                    cboLot.select(idLot); 
                } 
            }); 
        } 
    },        
    getGridForEntity: function(){
        var tabGrid = this.getListBatteryProduction();
        return tabGrid.getGridPanel();
    }  ,
    onSelectBattery: function(combo, selectedRecords, eOpts) { 
        var wellNumber = Ext.getCmp('idWellNumber'); 
        var oilPrevious = Ext.getCmp('oilPrevios'); 
        var adjustmentFactor = Ext.getCmp('adjustmentFactor'); 
        var idBattery = selectedRecords[0].data.idBattery;
        var data = selectedRecords[0].data;
        adjustmentFactor.setValue(data.adjustmentFactor);
        Ext.BaseAjax.request({
            url: 'rest/batterys/getCountWellExceptSwab.htm',
            method: 'POST',
            params: {idBattery: idBattery},
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    wellNumber.setValue(objResponse.countWellExceptSwab.countWellExceptSwab);
                    oilPrevious.setValue(objResponse.oilPrevious);
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    } ,
    onSelectLot: function(combo, selectedRecords, eOpts) { 
        var cboBattery = Ext.getCmp('cboBatteryByLot'); 
        cboBattery.clearValue();
        cboBattery.getStore().reload();
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboBattery = Ext.getCmp('cboBatteryByLot');
        if(record.raw.battery!=null){
            cboBattery.setValue(new Ext.create(sisprod.getApplication().getModelName('Battery'),{
                idBattery: record.raw.battery.idBattery,
                batteryName: record.raw.battery.batteryName
            }));
        }
        
    },
    onClickAdd: function (button, event, options, singleAddition){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/batteryProduction/checkIsApprovedProductionPeriod.htm',
            method: 'POST',
            params:{date:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    if(responseData.result===false){
                        me.showAdd(button, event, options, singleAddition);
                    }else{
                        Ext.Msg.alert('Message',Ext.String.format(responseData.message, Ext.getCmp('envProductionPeriodDate').getRawValue()));
                    }
                }else{
                    Ext.Msg.alert('Message',Ext.String.format(responseData.message, Ext.getCmp('envProductionPeriodDate').getRawValue()));
                }
                                
            },
            failure: function(response, options){
            }
        });
    },
    onClickUpdate: function(grid, record){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/batteryProduction/checkIsApprovedProductionPeriod.htm',
            method: 'POST',
            params:{date:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    if(responseData.result===false){
                        me.showUpdate(grid, record);
                    }else{
                        Ext.Msg.alert('Message',Ext.String.format(responseData.message, Ext.getCmp('envProductionPeriodDate').getRawValue()));
                    }
                }else{
                    Ext.Msg.alert('Message',Ext.String.format(responseData.message, Ext.getCmp('envProductionPeriodDate').getRawValue()));
                }
                                
            },
            failure: function(response, options){
            }
        });
    },
    onClickUpdateOnButton: function(button, event){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/batteryProduction/checkIsApprovedProductionPeriod.htm',
            method: 'POST',
            params:{date:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    if(responseData.result===false){
                        me.showUpdateOnButton(button,event);
                    }else{
                        Ext.Msg.alert('Message',Ext.String.format(responseData.message, Ext.getCmp('envProductionPeriodDate').getRawValue()));
                    }                    
                }else{
                    Ext.Msg.alert('Message',Ext.String.format(responseData.message, Ext.getCmp('envProductionPeriodDate').getRawValue()));
                }
                                
            },
            failure: function(response, options){
            }
        });
    },
    onClickDelete: function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/batteryProduction/checkIsApprovedProductionPeriod.htm',
            method: 'POST',
            params:{date:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    if(responseData.result===false){
                        me.destroy(button);
                    }else{
                        Ext.Msg.alert('Message',Ext.String.format(responseData.message, Ext.getCmp('envProductionPeriodDate').getRawValue()));
                    }
                }else{
                    Ext.Msg.alert('Message',Ext.String.format(responseData.message, Ext.getCmp('envProductionPeriodDate').getRawValue()));
                }
                                
            },
            failure: function(response, options){
            }
        });
    },
    beforeSaveEntity: function(win, form, values) {
        if(Ext.isEmpty(values.oil)){
            values.oil = 0;
        }
        if(Ext.isEmpty(values.water)){
            values.water = 0;
        }
        if(Ext.isEmpty(values.gas)){
            values.gas = 0;
        }
        if(Ext.isEmpty(values.oilTransfer)){
            values.oilTransfer = 0;
        }
        return true;
    }
});

