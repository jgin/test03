/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.FluidLevelController', {
   extend: 'sisprod.controller.Base',
   stores : ['FluidLevelStore'],
   models : ['FluidLevelModel'],
   entityName: 'FluidLevel',
//   checkOutPermissions: false,
   refs: [{ref: 'listFluidLevel', selector: 'listFluidLevel'}],
   views : ['FluidLevel.ListFluidLevel'],
   
   requires: [
       'sisprod.store.FluidLevelStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idFluidLevel'],
       caption: function(data) {
           var message = Ext.String.format("{0} - {1} - {2} - {3}", data['well']['wellName'],
                data["well"]["battery"]['batteryName'], 
                data["fluidLevelType"]["fluidLevelTypeName"], 
                data["company"]["companyName"]);
           return message;
       }
   },
   
   messages: {
       wellEquipmentNotSetUp: 'The selected well has not pumping unit assigned',
       fileUploadingWaitMessage: 'Uploading file, please wait...'
   },
   
   init : function(){
        this.control({
           'listFluidLevel button[action=add]':{
               click: this.showAdd
           },
           
           'listFluidLevel button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listFluidLevel dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listFluidLevel button[action=delete]': {
               click: this.destroy
           },
           
           'listFluidLevel button[action=print]': {
               click: this.showPrint
           },
           
           'listFluidLevel button[action=attachFiles]': {
               click: this.onAttachFileButton
           },
           
           'addFluidLevel button[action=save]': {
               click: this.saveEntity
           },
           
           'addFluidLevel combobox[id=idFluidLevelLot]': {
               select: this.onSelectFluidLevelLot
           },
           
           'addFluidLevel combobox[id=idFluidLevelWell]': {
               select: this.onSelectFluidLevelWell
           },
           
           'updateFluidLevel button[action=save]': {
               click: this.saveEntity
           },
           
           'updateFluidLevel combobox[id=idFluidLevelLot]': {
               select: this.onSelectFluidLevelLot
           },
           
           'updateFluidLevel combobox[id=idFluidLevelWell]': {
               select: this.onSelectFluidLevelWell
           },
           
           'fluidLevelFilesWindow button[action=uploadFile]': {
               click: this.onUploadFile
           },
           
           'fluidLevelFilesWindow button[action=removeFile]': {
               click: this.onRemoveFile
           }
       });
       this.callParent(arguments);
    },
            
    onSelectFluidLevelWell: function(combobox, records, eventOptions){
        var me = this;
        var form = combobox.up('form'),
            data, battery, batteryCode, carrera, carreraMeasureUnit, spm;
        if(records.length > 0) {
            data = records[0].raw;
            if(Ext.isDefined(data) && data !== null){
                battery = data.battery;
                //
                carrera = data.carrera;
                carreraMeasureUnit = data.carreraMeasureUnit;
                spm = data.spm;
                //
                if(Ext.isDefined(battery) && battery !== null)
                    batteryCode = battery.batteryCode;
            }
        }
        form.down("#fluidLevelBatteryCode").setValue(batteryCode);
//        form.down("#fluidLevelCarrera").setValue(Ext.String.format('{0} {1}', carrera, carreraMeasureUnit['measureUnitAcronym']));
        form.down("#fluidLevelCarrera").setValue(carrera);
        form.down("#fluidLevelSpm").setValue(spm);
        //
        var grid = form.down('#fluidLevelEquipmentGrid');
        var store = grid.getStore();
        var idWell = combobox.getValue();
        store.load({params: {idWell: idWell}});
        //
        Ext.BaseAjax.request({
            url: 'rest/wellEquipment/getByIdWell.htm',
            method: 'POST',
            params: {idWell: idWell},
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                var fluidLevelConfigParam = responseData['fluidLevelConfigParam'];
                //
                if(Ext.isDefined(fluidLevelConfigParam) && fluidLevelConfigParam !== null) {
                    form.down('[name=idFluidLevelConfigParam]').setValue(fluidLevelConfigParam['idFluidLevelConfigParam']);
                    form.down('[name=gearboxPeakBalanced]').setValue(fluidLevelConfigParam['gearboxBalanced']);
                    form.down('[name=gearboxRating]').setValue(fluidLevelConfigParam['gearboxRating']);
                }
                else {
                    form.down('[name=idFluidLevelConfigParam]').setValue('');
                    form.down('[name=gearboxPeakBalanced]').setValue('');
                    form.down('[name=gearboxRating]').setValue('');
                    Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.wellEquipmentNotSetUp);
                }
            }
        });
    },
            
    onSelectFluidLevelLot: function(combobox, records, eventOptions) {
        var me = this;
        var form = combobox.up('form');
        var idFluidLevelWellInput = form.down('#idFluidLevelWell');
        if(Ext.isDefined(idFluidLevelWellInput) && idFluidLevelWellInput !== null) {
            idFluidLevelWellInput.clearValue();
            idFluidLevelWellInput.getStore().reload();
        }
        var fluidLevelBatteryCodeInput = form.down('#fluidLevelBatteryCode');
        if(Ext.isDefined(fluidLevelBatteryCodeInput) && fluidLevelBatteryCodeInput !== null)
            fluidLevelBatteryCodeInput.reset();
        //
        form.down("#fluidLevelCarrera").reset();
        form.down("#fluidLevelSpm").reset();
        form.down('[name=idFluidLevelConfigParam]').reset();
        form.down('[name=gearboxPeakBalanced]').reset();
        form.down('[name=gearboxRating]').reset();
        form.down('#fluidLevelEquipmentGrid').getStore().removeAll();
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListFluidLevel();
        return tabGrid.getGridPanel();
    },
            
    beforeShowUpdate: function(grid, record) {
        var me = this;
        var data = record.raw;
        //
        Ext.BaseAjax.request({
            url: 'rest/fluidLevel/getCompleteById.htm',
            params: {
                idFluidLevel: data['idFluidLevel']
            },
            success: function(response) {
                var responseData = Ext.decode(response.responseText);
                if(responseData.success) {
                    var window = Ext.create('sisprod.view.FluidLevel.UpdateFluidLevel', {
                        fluidLevel: responseData['fluidLevel'],
                        fluidLevelConfigParam: responseData['fluidLevelConfigParam']
                    });
                    window.show();
                }
            }
        });
        return false;
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
        var window = Ext.create('sisprod.view.FluidLevel.FluidLevelFilesWindow',{
            data: record
        });
        window.show();
    },
            
    onUploadFile: function(button){
        var me = this;
        var formPanel = button.up('form');
        var window = formPanel.up('window');
        var grid = window.down('#fluidLevelFilesGrid');
        var store = grid.getStore();
//        var form = formPanel.getForm();
        if(formPanel.isValid()){
            formPanel.submit({
                url: 'rest/fluidLevelFile/register.htm',
                method: 'POST',
                waitMsg: me.messages.fileUploadingWaitMessage,
                success: function(form, action){
//                    var responseData = Ext.decode(action.response.responseText);
                    store.reload();
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
        var grid = button.up('#fluidLevelFilesGrid');
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
                        var idFluidLevelFile = data['idFluidLevelFile'];
                        Ext.BaseAjax.request({
                           url: 'rest/fluidLevelFile/delete.htm',
                           params: {
                               idFluidLevelFile: idFluidLevelFile
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
    }
});

