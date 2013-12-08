/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ApprovedDeferredProductionController', {
   extend: 'sisprod.controller.Base',
   stores : ['ApprovedDeferredProductionStore'],
   models : ['ApprovedDeferredProductionModel'],
   entityName: 'ApprovedDeferredProduction',
   checkOutPermissions: false,
   refs: [{ref: 'listApprovedDeferredProduction', selector: 'listApprovedDeferredProduction'}],
   views : ['ApprovedDeferredProduction.ListApprovedDeferredProduction'],
   
   requires: [
       'sisprod.store.ApprovedDeferredProductionStore'
   ],
   messages:{
       noProductionPeriodSelected:'{0} is not a Production Period',
       confirmText:'Approve the Deferred Production for the Period {0} ?',
       periodAlreadyApprove:'The Period {0} has already been approved'
   },
   deleteOptions: {
       deleteKeys: ['idDeferredProduction'],
       caption: function(data){ 
               return data['well'].wellCode;
       } 
   },
   
   init : function(){
        this.control({
           'listApprovedDeferredProduction button[action=activate]':{
               click: this.activate
           },
           'listApprovedDeferredProduction button[action=add]':{
               click: this.showAdd
           },
           
           'listApprovedDeferredProduction button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listApprovedDeferredProduction button[action=approve]':{
               click: this.approve
           },
           
//           'listApprovedDeferredProduction dataview': {
//               itemdblclick: this.showUpdate
//           },
           
           'listApprovedDeferredProduction button[action=delete]': {
               click: this.destroy
           },
           
           'listApprovedDeferredProduction button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addApprovedDeferredProduction button[action=save]': {
               click: this.saveEntity
           },
           'addApprovedDeferredProduction  combobox[id=idWell]': {
               select: this.onSelectWell
           },
           'updateApprovedDeferredProduction  combobox[id=idWell]': {
               select: this.onSelectWell
           },
           'addApprovedDeferredProduction combobox[id=idLot]': {
               select: this.onSelectLot
           },
           'addApprovedDeferredProduction combobox[id=idDeferredProductionReason]': {
               select: this.onSelectReason
           },           
           'updateApprovedDeferredProduction combobox[id=idDeferredProductionReason]': {
               select: this.onSelectReason
           },           
           'addApprovedDeferredProduction numberfield[id=totalHours]': {
               change: this.onChangeHours
           },              
           'updateApprovedDeferredProduction numberfield[id=totalHours]': {
               change: this.onChangeHours
           },              
           'addApprovedDeferredProduction numberfield[id=totalMinute]': {
               change: this.onChangeMinutes
           },              
           'updateApprovedDeferredProduction numberfield[id=totalMinute]': {
               change: this.onChangeMinutes
           },              
           'addApprovedDeferredProduction': {
               afterrender: this.afterRender
           },              
           'updateApprovedDeferredProduction': {
               afterrender: this.loadMeasureUnits
           },              
           'updateApprovedDeferredProduction button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
    onChangeMinutes:function(){
        this.calculateDeferred();
    },
    onSelectLot: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var cboWell = formPanel.down('#idWell');
        var battery = formPanel.down('#batteryCode');
        cboWell.clearValue();
        battery.setValue("");
        cboWell.getStore().reload();
    },   
    afterRender:function(form){
        var cboLot = Ext.getCmp('idLot');
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
        this.loadMeasureUnits(form);
    },
    loadMeasureUnits:function(form){
        // Muestra los valores iniciales de las unidades de medida
        Ext.BaseAjax.request({
            url: 'rest/configParam/getDefaultMeasureUnits.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    Ext.getCmp("forecastOil").setFieldLabel(form.messages.labels.oil+ " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
                    Ext.getCmp("deferredNumber").setFieldLabel(form.messages.labels.deferred + " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    },
    onChangeHours:function(txtHours, newValue, oldValue, eOpts ){
          var hours = txtHours.getValue();
          var txtMinutes = Ext.getCmp("totalMinute");
          if(hours===24){
              txtMinutes.setValue(0);
              txtMinutes.setMinValue(0);
              txtMinutes.setMaxValue(0);
          }else if(hours===0){
              txtMinutes.setValue(1);
              txtMinutes.setMinValue(1);
              txtMinutes.setMaxValue(59);
          }
          else{
              txtMinutes.setMinValue(0);
              txtMinutes.setMaxValue(59);
          }
          this.calculateDeferred();
    },
    getGridForEntity: function(){
        var tabGrid = this.getListApprovedDeferredProduction();
        return tabGrid.getGridPanel();
    },
    onSelectWell: function(combo, selectedRecords, eOpts) {
        var form=combo.up("form");
//        var wellController=this.getController("Well");
//        wellController.showWellCycleAndOnOffHours(selectedRecords[0].data.idWell, form);
        this.showBatteryCode(selectedRecords[0].raw.battery, form);
        this.getForecastOil(combo.getValue());
        this.calculateDeferred();
    },
    getForecastOil:function(idWell){
        Ext.BaseAjax.request({
            url: 'rest/well/listForecastWellForDate.htm',
            method: 'GET',
            async:false,
            params:{idWell:idWell,date:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    Ext.getCmp("forecastOil").setValue(objResponse.oil);
                }
                else{
                    Ext.getCmp("forecastOil").setValue(0);
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    },
    showBatteryCode: function(rawBattery, form) {
        form.down("[name=batteryCode]").setValue(rawBattery.batteryCode);
    },
    onSelectReason: function(combo, selectedRecords, eOpts) {
        var form=combo.up("form");
        this.showReasonType(selectedRecords[0].raw.deferredProductionType, form);
    },
    showReasonType: function(rawBattery, form) {
        form.down("[name=reasonType]").setValue(rawBattery.deferredProductionTypeName);
    },
    beforeSaveEntity:function(win, form, values){
        if(!Ext.isDefined(values.offWell)){
            values.offWell=false;
        }else{
            values.offWell=true;
        }
        return true;
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var me = this;
        var idLot = record.raw.well.battery.zone.lot.idLot;
        var idWell = record.raw.well.idWell;
        var idDeferredProductionReason = record.raw.deferredProductionReason.idDeferredProductionReason;
        var cboLot = Ext.getCmp("idLot");
        var cboWell = Ext.getCmp("idWell");
        var txtBattery = Ext.getCmp("batteryCode");
        var txtReasonType = Ext.getCmp("reasonType");
        var cboApprovedDeferredProductionReason = Ext.getCmp("idDeferredProductionReason");
        txtBattery.setValue(record.raw.battery.batteryCode);
        txtReasonType.setValue(record.raw.deferredProductionReason.deferredProductionType.deferredProductionTypeName);
        if(Ext.isDefined(cboLot)){
            cboLot.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboLot.select(idLot);
                    cboWell.store.load(
                        {params:{idLot:idLot},
                        scope: this,
                        callback: function(records, operation, success){
                            cboWell.select(idWell); 
                        }
                    });                                           
                }
            });
        } 
        if(Ext.isDefined(cboApprovedDeferredProductionReason)){
            cboApprovedDeferredProductionReason.getStore().load({
                scope:this,
                callback:function(records, operation, success){
                    cboApprovedDeferredProductionReason.select(idDeferredProductionReason);
                }
            });
        }
    },
    showAdd: function (button, event, options, singleAddition){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/productionPeriod/findByDate.htm',
            method: 'POST',
            params:{date:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    var single = Ext.isDefined(singleAddition)?singleAddition:false;
                    var form = Ext.create('sisprod.view.'+ me.entityName + '.Add' + me.entityName,{
                        singleAddition: single,
                        controller: me
                    });
                    form.show();
                }else{
                    Ext.Msg.alert(me.controllerMessages.alertMessage,Ext.String.format(responseData.message));
                }                
            },
            failure: function(response, options){
            }
        });
    },
    approve: function (button, event, options, singleAddition){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/productionPeriod/findByDate.htm',
            method: 'POST',
            async:true,
            params:{date:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    var isApprove=me.isProductionPeriodAlreadyApproved();
                    if(isApprove===false){
                        Ext.Msg.show({
                            title: me.controllerMessages.confirmText,
                            msg: Ext.String.format(me.messages.confirmText,Ext.getCmp('envProductionPeriodDate').getRawValue()),
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function(button){
                                if(button==="yes"){
                                   me.approveDeferredProduction();
                                }
                            }
                        }); 
                    } 
                    else{
                        Ext.Msg.alert(me.controllerMessages.alertMessage,Ext.String.format(me.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
                    }
                }else{
                    Ext.Msg.alert(me.controllerMessages.alertMessage,Ext.String.format(responseData.message));
                }                
            },
            failure: function(response, options){
            }
        });
    },    
    approveDeferredProduction:function(){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/deferredProduction/approveDeferredProduction.htm',
            method: 'POST',
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(!responseData.success){
                    Ext.Msg.alert(me.controllerMessages.alertMessage,Ext.String.format(responseData.message));
                }      
            }
        })
    },
    isProductionPeriodAlreadyApproved:function(){
        var me = this;
        var isApprove=false;
        Ext.BaseAjax.request({
            url: 'rest/deferredProduction/isDeferredProductionApproved.htm',
            method: 'POST',
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
    afterEdit: function(editor, context, eventOptions){
        var me = this;
        var record = context.record.data;
        var values = {
            idDeferredProduction: record['idDeferredProduction'],
            totalHours: record['totalHours'],
            totalMinute: record['totalMinute'],
            deferredNumber: record['deferredNumber'],
            idDeferredProductionReason: record['deferredProductionReason.idDeferredProductionReason'],
            offWell: record['offWell'],
            comment: record['comment']
        };
        Ext.BaseAjax.request({
            url: 'rest/deferredProduction/update.htm',
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
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getLastSelected();
//        var selection = grid.getSelectionModel().getSelection()[0];
        //
        var originalValues = selection.originalValues,
            idDeferredProductionReason = null;
        if(Ext.isDefined(originalValues) && originalValues!==null){
            idDeferredProductionReason = originalValues['deferredProductionReason.idDeferredProductionReason'];
            if(Ext.isDefined(idDeferredProductionReason) && idDeferredProductionReason!==null)
                selection.set('deferredProductionReason.idDeferredProductionReason', idDeferredProductionReason);
        }
    },
    onSelectReasonForEdit: function(combobox, record, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];
        selection.originalValues = {
            'deferredProductionReason.idDeferredProductionReason': selection.data['deferredProductionReason.idDeferredProductionReason']
        };
        selection.set('deferredProductionReason.idDeferredProductionReason', record[0].data['idDeferredProductionReason']);
    },
    onChangeHoursForEdit: function(txthours,newValue,oldValue,opt){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];   
        selection.set('totalHours',newValue);
        me.calculateDeferredForEdit(newValue,selection.get('totalMinute'));
    },
    onChangeMinutesForEdit: function(txtMinute,newValue,oldValue,opt){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];  
        selection.set('totalMinute',newValue);
        me.calculateDeferredForEdit(selection.get('totalHours'),newValue);
    },
    calculateDeferredForEdit:function(hours,minutes){
        var me =this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];  
        var petroleo =selection.get('forecastOil');
        var totalTime = hours+ (minutes/60);
        var factor=24/totalTime;
        var deferred = Math.ceil(petroleo/factor);
        selection.set('deferredNumber',deferred);
        var inputDeferred = Ext.getCmp("deferredNumberEdit");
        inputDeferred.setValue(deferred);
    },
    beforeEdit: function(editor, context, eventOptions){
        var me = this;
//        return context.cancel=true;
    },
    calculateDeferred:function(){
        var petroleo =Ext.getCmp("forecastOil").getValue();
        if(petroleo!=''){
            var hours = 0;
            var minutes = 0;
            var deferred = 0;
            var inputHours=Ext.getCmp("totalHours").getValue();
            var inputMinutes=Ext.getCmp("totalMinute").getValue();
            if(inputHours!=''){
                hours=inputHours;
            }
            if(inputMinutes!=''){
                minutes=Math.round((inputMinutes/60) * 100) / 100;
            }
            var totalTime = hours+ minutes;
            var factor=24/totalTime;
            deferred = Math.ceil(petroleo/factor);
            var inputDeferred=Ext.getCmp("deferredNumber");
            inputDeferred.setValue(deferred);
        }
    }
});

