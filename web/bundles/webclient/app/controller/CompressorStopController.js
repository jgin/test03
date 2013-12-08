/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.CompressorStopController', {
   extend: 'sisprod.controller.Base',
   stores : ['CompressorStopStore'],
   models : ['CompressorStopModel'],
   entityName: 'CompressorStop',
   refs: [{ref: 'listCompressorStop', selector: 'listCompressorStop'}],
   views : ['CompressorStop.ListCompressorStop'],
   
   requires: [
       'sisprod.store.CompressorStopStore'
   ],
   messages:{
       noProductionPeriodSelected:'{0} is not a Production Period',
       stopHoursError:'The Stop Hours must be greater than zero',
       labels:{
           volumen:'Volumen',
           pressure:'Pressure'
       }
   },
   deleteOptions: {
       deleteKeys: ['idCompressorStop'],
       caption: function(data){ 
               return data['equipment'].equipmentName;
       } 
   },
   
   init : function(){
        this.control({
           'listCompressorStop button[action=activate]':{
               click: this.activate
           },
           'listCompressorStop button[action=add]':{
               click: this.showAdd
           },
           'listCompressorStop button[action=update]':{
                 click: this.showUpdateOnButton
//               click: this.clickOnUpdate
           },
           
           'listCompressorStop button[action=delete]': {
               click: this.destroy
//               click: this.onDeleteClick
           },
           
           'listCompressorStop button[action=print]': {
               click: this.showPrint
           },
           'addCompressorStop button[action=save]': {
               click: this.saveEntity
           },
           'addCompressorStop combobox[id=idEquipment]': {
               select: this.setMaxValue
           },
           'addCompressorStop combobox[id=idLot]': {
               select: this.onSelectLot
           },
           
//           'addCompressorStop timefield[id=start]': {
//               change: this.calculateHours
//           },              
//           'updateCompressorStop timefield[id=start]': {
//               change: this.calculateHours
//           },              
//           'addCompressorStop timefield[id=finish]': {
//               change: this.calculateHours
//           },              
//           'updateCompressorStop timefield[id=finish]': {
//               change: this.calculateHours
//           },         
           'addCompressorStop': {
               afterrender: this.afterRender
           },              
           'updateCompressorStop': {
               afterrender: this.loadMeasureUnits
           },              
           'updateCompressorStop button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
//    calculateHours:function(){
//        var inputStart = Ext.getCmp('start');
//        var imputFinish = Ext.getCmp('finish');
//        var imputTotalHour = Ext.getCmp('stopHours');
//        
//        var start = inputStart.getValue();
//        var end = imputFinish.getValue();
//        if(end>=start){
//            var totalHour = (end - start)/3600000;
//            imputTotalHour.setValue(totalHour);
//        }else{
//            imputTotalHour.setValue('-');
//        }
//    },
    
    hoursForCompressor:function(idEquipment){
         var hours=0;
         Ext.BaseAjax.request({
            url:'rest/compressorStop/hoursForCompressorInPeriod.htm',
            method: 'GET',
            async:false,
            params:{idEquipment:idEquipment,productionPeriodDate:Ext.getCmp('envProductionPeriodDate').getRawValue()},
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    hours = objResponse.result;
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
        return hours;
    },
    setMaxValue:function(){
        var idEquipment = Ext.getCmp('idEquipment').getValue();
        var hours = this.hoursForCompressor(idEquipment);
        var input = Ext.getCmp('stopHours');
        input.maxValue=24-hours;
        input.setValue(24-hours);        
    },
    onSelectLot: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var cboEquipment = formPanel.down('#idEquipment');
        cboEquipment.clearValue();
        cboEquipment.getStore().reload();
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
                    Ext.getCmp("volume").setFieldLabel(form.messages.labels.volumen+ " (" + objResponse.defaultMeasureUnit.compressorVolumen.measureUnitAcronym + ")");
                    Ext.getCmp("pressure").setFieldLabel(form.messages.labels.pressure + " (" + objResponse.defaultMeasureUnit.compressorPressure.measureUnitAcronym + ")");
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    },
    
    getGridForEntity: function(){
        var tabGrid = this.getListCompressorStop();
        return tabGrid.getGridPanel();
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var me = this;
        var idLot = record.raw.equipment.lot.idLot;
//        var idEquipment = record.raw.equipment.idEquipment;
//        var idCompressorStopReason = record.raw.compressorStopReason.idCompressorStopReason;
        var cboLot = Ext.getCmp("idLot");
        var cboEquipment = Ext.getCmp("idEquipment");
        var cboCompressorStopReason = Ext.getCmp("idCompressorStopReason");
//        var inputStart = Ext.getCmp("start");
//        var inputFinish = Ext.getCmp("finish");
//        inputStart.setValue(record.raw.startTime);
//        inputFinish.setValue(record.raw.finishTime);
        if(Ext.isDefined(cboLot)){
            cboLot.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboLot.select(idLot);                                           
                }
            });
        } 
        cboEquipment.setValue(new Ext.create(sisprod.getApplication().getModelName('Equipment'),{
            idEquipment: record.raw.equipment.idEquipment,
            equipmentName: record.raw.equipment.equipmentName,
            supplierName: record.raw.equipment.supplier.entity.entityName
        }));
        cboCompressorStopReason.setValue(new Ext.create(sisprod.getApplication().getModelName('CompressorStopReason'),{
            idCompressorStopReason: record.raw.compressorStopReason.idCompressorStopReason,
            compressorStopReasonName: record.raw.compressorStopReason.compressorStopReasonName
        }));
//        if(Ext.isDefined(cboCompressorStopReason)){
//            cboCompressorStopReason.getStore().load({
//                scope:this,
//                callback:function(records, operation, success){
//                    cboCompressorStopReason.select(idCompressorStopReason);
//                }
//            });
//        }
         this.setMaxValueForEdit(record.raw.stopHours);
    },
    setMaxValueForEdit:function(editHours){
        var idEquipment = Ext.getCmp('idEquipment').getValue();
        var hours = this.hoursForCompressor(idEquipment);
        var input = Ext.getCmp('stopHours');
        input.maxValue=24-hours+editHours;    
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
    beforeSaveEntity: function(window, form, values, jsonData) {
        var stopHours = Ext.getCmp('stopHours').getValue();
        if (stopHours === 0) {
            Ext.Msg.alert(this.controllerMessages.alertMessage, this.messages.stopHoursError);
            return false;
        }
        return true;
    },
   
//     onDataViewDblClick: function(grid, record){
//         var isApproved = this.isProductionPeriodAlreadyApproved();
//         if(isApproved===false){
//           this.showUpdate(grid,record);
//         }else{
//           Ext.Msg.alert(this.controllerMessages.alertMessage,Ext.String.format(this.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
//         }
//    },
    
//    clickOnUpdate: function(button, event){       
//        var isApproved = this.isProductionPeriodAlreadyApproved();
//        if(isApproved===false){
//           this.showUpdateOnButton(button,event);
//        }else{
//           Ext.Msg.alert(this.controllerMessages.alertMessage,Ext.String.format(this.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
//        }
//    },
//    onDeleteClick: function(button){
//        var isApproved = this.isProductionPeriodAlreadyApproved();
//        if(isApproved===false){
//           this.destroy(button);
//        }else{
//           Ext.Msg.alert(this.controllerMessages.alertMessage,Ext.String.format(this.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
//        }
//    },
    afterEdit: function(editor, context, eventOptions){
        var me = this;
        var record = context.record.data;
        var values = {
            idCompressorStop: record['idCompressorStop'],
            stopHours: record['stopHours'],
            pressure: record['pressure'],
            volume: record['volume'],
            idCompressorStopReason: record['compressorStopReason.idCompressorStopReason'],
            comment: record['comment']
        };
        Ext.BaseAjax.request({
            url: 'rest/compressorStop/update.htm',
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
            idCompressorStopReason = null;
        if(Ext.isDefined(originalValues) && originalValues!==null){
            idCompressorStopReason = originalValues['compressorStopReason.idCompressorStopReason'];
            if(Ext.isDefined(idCompressorStopReason) && idCompressorStopReason!==null)
                selection.set('compressorStopReason.idCompressorStopReason', idCompressorStopReason);
        }
    },
    onSelectReasonForEdit: function(combobox, record, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];
        selection.originalValues = {
            'compressorStopReason.idCompressorStopReason': selection.data['compressorStopReason.idCompressorStopReason']
        };
        selection.set('compressorStopReason.idCompressorStopReason', record[0].data['idCompressorStopReason']);
    },
    beforeEditOnGrid: function(editor, context, eventOptions){
        var idEquipment = context.record.raw.equipment.idEquipment;
        var editHours = context.record.raw.stopHours;
        this.setMaxValueForEditOnGrid(idEquipment,editHours);
        context.cancel=false;
    },
    setMaxValueForEditOnGrid:function(idEquipment,editHours){
        var hours = this.hoursForCompressor(idEquipment);
        var input = Ext.getCmp('stopHoursGrid');
        input.maxValue=24-hours+editHours;    
    },
});

