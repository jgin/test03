Ext.define('sisprod.controller.BatteryProductionApprovedController', {
   extend: 'sisprod.controller.Base',
   stores : ['BatteryProductionApprovedStore'],
   models : ['BatteryProductionApprovedModel'],
   entityName: 'BatteryProductionApproved',
   checkOutPermissions: false,
   refs: [{ref: 'listBatteryProductionApproved', selector: 'listBatteryProductionApproved'}],
   views : ['BatteryProductionApproved.ListBatteryProductionApproved'],
  
   requires: [
       'sisprod.store.BatteryProductionApprovedStore'
   ],
   messages:{
        batteryLabel:'Name Battery',
        msgOil:'Oil',
        msgWater:'Water',
        msgGas:'Gas',
        msgConfirmApprove: 'Confirm Approved Battery Production in the Period Production {0}?',
        msgTitle: 'Confirm Approve',
        msgConfirmResultApprove: 'Approval Successful',
        periodAlreadyApprove:'The Period {0} has been approved'
    },
    deleteOptions: {
       deleteKeys: ['idBatteryProduction'],
       caption: function(data){ 
               return data['battery'].batteryCode;
       } 
   },
   
   init : function(){
        this.control({
           'listBatteryProductionApproved button[action=approved]':{
               click: this.showAprovedProductionPeriodReport
           },
           'updateBatteryProductionApproved button[action=save]': {
               click: this.saveEntity
           },
           'updateBatteryProductionApproved':{
               afterrender: this.showInitialMeasureUnits
           },      
           'updateBatteryProductionApproved combobox[id=cboBatteryByLot]': { 
               select: this.onSelectBattery
           },
           'addBatteryProductionApproved combobox[id=cboBatteryByLot]': { 
               select: this.onSelectBattery
           },
           'listBatteryProductionApproved button[action=update]':{
               click: this.showUpdateOnButton
           },
           'addBatteryProductionApproved button[action=save]': {
               click: this.saveEntity
           },
           'listBatteryProductionApproved button[action=add]':{
               click: this.showAdd
           },
           'addBatteryProductionApproved':{
               afterrender: this.showInitialMeasureUnits
           },
           'listBatteryProductionApproved button[action=delete]': {
               click: this.destroy
           },
           'listBatteryProductionApproved button[action=print]': {
               click: this.showPrint
           },
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           }
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
        if(Ext.util.Cookies.get('envLotId')!==null){ 
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
        var tabGrid = this.getListBatteryProductionApproved();
        return tabGrid.getGridPanel();
    },
    showAprovedProductionPeriodReport: function(button){
        var isApproved = this.isProductionPeriodAlreadyApproved();
        var me = this;
        if(isApproved===false){
            Ext.Msg.show({
                title: me.messages.msgTitle, 
                msg: Ext.String.format(Ext.String.format(me.messages.msgConfirmApprove,Ext.getCmp('envProductionPeriodDate').getRawValue())),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(res){
                    if(res === 'yes'){
                        Ext.BaseAjax.request({
                            url: 'rest/batteryProduction/approvedBatteryProductionPeriod.htm',
                            method: "POST",
                            success: function(response){
    //                            var window = button.up('window');
                                var objResponse = Ext.decode(response.responseText);
                                if( Ext.isDefined(objResponse.success) && objResponse.success === true){
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
        }else{
            Ext.Msg.alert(this.controllerMessages.alertMessage,Ext.String.format(this.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
        }
        
    },
    isProductionPeriodAlreadyApproved:function(){
        var isApprove=false;
        Ext.BaseAjax.request({
            url: 'rest/batteryProduction/checkIsApprovedProductionPeriod.htm',
            method: 'POST',
            params:{date:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            async:false,
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    isApprove=responseData.result;
                }      
            }
        });
        return isApprove;
    },
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
        if(record.raw.battery!==null){
            cboBattery.setValue(new Ext.create(sisprod.getApplication().getModelName('Battery'),{
                idBattery: record.raw.battery.idBattery,
                batteryName: record.raw.battery.batteryName
            }));
        }
        
    },
    afterEdit: function(editor, context, eventOptions){
        var me = this;
        var record = context.record.data;
        var values = {
            idBatteryProduction: record['idBatteryProduction'],
            oil: record['oil'],
            water: record['water'],
            gas: record['gas'],
            oilTransfer: record['oilTransfer'],
            oilForecast: record['oilForecast']
        };
        Ext.BaseAjax.request({
            url: 'rest/batteryProduction/updateApproved.htm',
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
    cancelEdit: function(editor, context, eventOptions){
        var me = this;
    },
    beforeEdit: function(editor, context, eventOptions){
        var me = this;
    }
});

