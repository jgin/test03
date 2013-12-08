Ext.define('sisprod.controller.SwabController', {
    extend: 'sisprod.controller.Base',
    stores: ['SwabStore'],
    models: ['SwabModel'],
    entityName: 'Swab',
    refs: [{ref: 'listSwab', selector: 'listSwab'}],
    views: ['Swab.ListSwab'],
    requires: [
        'sisprod.store.SwabStore'
    ],
    messages: {
        noProductionPeriodSelected: '{0} is not a Production Period',
        confirmText: 'Approve the Swab Production for the Period {0} ?',
        periodAlreadyApprove: 'The Period {0} has already been approved'
    },
    deleteOptions: {
        deleteKeys: ['idSwab'],
        caption: function(data) {
            return data[0];
        }
    },
    init: function() {
        this.control({'listSwab button[action=activate]':{
               click: this.activate
           },
           'listSwab button[action=add]':{
               click: this.showAdd
           },
           'listSwab button[action=update]':{
               click: this.clickOnUpdate
           },
           'listSwab button[action=delete]': {
               click: this.onDeleteClick
           },

           'listSwab button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addSwab button[action=save]': {
               click: this.saveEntity
           },
           'addSwab  combobox[id=idWell]': {
               select: this.onSelectWell
           },
           'updateSwab  combobox[id=idWell]': {
               select: this.onSelectWell
           },
           'updateSwab combobox[id=idLot]': {
               select: this.onSelectLot
           },
           'addSwab combobox[id=idLot]': {
               select: this.onSelectLot
           },
           'addSwab numberfield[id=totalHours]': {
               change: this.onChangeHours
           },              
           'updateSwab numberfield[id=totalHours]': {
               change: this.onChangeHours
           },              
           'addSwab': {
               afterrender: this.showAddForm
           },              
           'updateSwab': {
               afterrender: this.showAddForm
           },              
           'updateSwab button[action=save]': {
               click: this.saveEntity
           }
       });
        this.callParent(arguments);
    },
    onSelectLot: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var cboWell = formPanel.down('#idWell');
        var battery = formPanel.down('#battery');
        var idBattery = formPanel.down('#idBattery');
        cboWell.clearValue();
        battery.setValue("");
        idBattery.setValue("");
        cboWell.getStore().reload();
    },   
    afterRender:function(form){
        var cboLot = Ext.getCmp('idLot');
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
    getGridForEntity: function() {
        var tabGrid = this.getListSwab();
        return tabGrid.getGridPanel();
    },
    onSelectWell: function(combo, selectedRecords, eOpts) {
        var form=combo.up("form");
        this.showBatteryCode(selectedRecords[0].raw.battery, form);
        
    },
    autoMappingFunction: function(grid, window, record) {
        var me = this;
        var formPanel = window.down('form');
        formPanel.down('#idSwab').setValue(record.raw['idSwab']);
        formPanel.down('#idEntity').setValue(record.raw['entity.entityId']);
        var idLot = record.raw.well.battery.zone.lot.idLot;
        var idWell = record.raw.well.idWell;
        var cboLot = Ext.getCmp("idLot");
        var cmbWell = formPanel.query("[name=idWell]")[0];
        if(Ext.isDefined(cboLot)){
            cboLot.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboLot.select(idLot);
                    cmbWell.store.load(
                        {params:{idLot:idLot},
                        scope: this,
                        callback: function(records, operation, success){
                            cmbWell.select(idWell); 
                        }
                    });                                           
                }
            });
        }
        formPanel.loadRecord(record);
//        if (Ext.isDefined(cmbWell)) {
//            cmbWell.setValue(new Ext.create(sisprod.getApplication().getModelName('WellSwabTemp'), {
//                idWell: record.raw.well.idWell,
//                wellName: record.raw.well.wellName
//            }));
//        }
        
        var cmbEntity = formPanel.query("[name=idEntity]")[0];
        if (Ext.isDefined(cmbEntity)) {
            cmbEntity.setValue(new Ext.create(sisprod.getApplication().getModelName('EntitySwabTemp'), {
                entityId: record.raw.entity.entityId,
                entityName: record.raw.entity.entityName
            }));
        }
        formPanel.down("[name=idBattery]").setValue(record.raw.battery.idBattery);
        formPanel.down("[name=battery]").setValue(record.raw.battery.batteryName);
    },
    showBatteryCode: function(rawBattery, form) {
        form.down("[name=idBattery]").setValue(rawBattery.idBattery);
        form.down("[name=battery]").setValue(rawBattery.batteryName);
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
                    var isApproved = me.isProductionPeriodAlreadyApproved();
                    if(isApproved===false){
                        var single = Ext.isDefined(singleAddition)?singleAddition:false;
                        var form = Ext.create('sisprod.view.'+ me.entityName + '.Add' + me.entityName,{
                            singleAddition: single,
                            controller: me
                        });
                        form.show();
                    }else{
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
    isProductionPeriodAlreadyApproved:function(){
        var me = this;
        var isApprove=false;
        Ext.BaseAjax.request({
            url: 'rest/swab/isSwabApproved.htm',
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
    onDataViewDblClick: function(grid, record){
         var isApproved = this.isProductionPeriodAlreadyApproved();
         if(isApproved===false){
           this.showUpdate(grid,record);
         }else{
           Ext.Msg.alert(this.controllerMessages.alertMessage,Ext.String.format(this.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
         }
    },
    clickOnUpdate: function(button, event){       
        var isApproved = this.isProductionPeriodAlreadyApproved();
        if(isApproved===false){
           this.showUpdateOnButton(button,event);
        }else{
           Ext.Msg.alert(this.controllerMessages.alertMessage,Ext.String.format(this.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
        }
    },
    onDeleteClick: function(button){
        var isApproved = this.isProductionPeriodAlreadyApproved();
        if(isApproved===false){
           this.destroy(button);
        }else{
           Ext.Msg.alert(this.controllerMessages.alertMessage,Ext.String.format(this.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
        }
    },
    afterEdit: function(editor, context, eventOptions){
        var me = this;
        var record = context.record.data;
        var values = {
            idSwab: record['idSwab'],
            oil: record['oil'],
            water: record['water'],
            runNumber:record['runNumber'],
            pistonDepth: record['pistonDepth'],
            stayTime: record['stayTime'],
            initialLevel: record['initialLevel'],
            finalLevel: record['finalLevel'],
            idWell: record['well.idWell'],
            idEntity: record['entity.entityId'],
            idBattery: record['battery.idBattery'],
            oilIdMeasureUnit: record['oilMeasureUnit.idMeasureUnit'],
            waterIdMeasureUnit: record['waterMeasureUnit.idMeasureUnit']
        };
        Ext.BaseAjax.request({
            url: 'rest/swab/update.htm',
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
    },cancelEdit: function(editor, context, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getLastSelected();
        var originalValues = selection.originalValues, idDeferredProductionReason = null;
//        if(Ext.isDefined(originalValues) && originalValues!==null){
//            idDeferredProductionReason = originalValues['deferredProductionReason.idDeferredProductionReason'];
//            if(Ext.isDefined(idDeferredProductionReason) && idDeferredProductionReason!==null)
//                selection.set('deferredProductionReason.idDeferredProductionReason', idDeferredProductionReason);
//        }
    },
    beforeEdit: function(editor, context, eventOptions){
        var me = this;
        var isApprove = me.isProductionPeriodAlreadyApproved();
        if(isApprove===true){
            context.cancel=true;
            Ext.Msg.alert(me.controllerMessages.alertMessage,Ext.String.format(me.messages.periodAlreadyApprove,Ext.getCmp('envProductionPeriodDate').getRawValue()));
        }
        else
            context.cancel=false;
    },
    showAddForm: function(form) {
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/configParam/getDefaultMeasureUnits.htm',
            method: 'POST',
            success: function(response, options) {
                var objResponse = Ext.decode(response.responseText);
                if (objResponse.success === true) {
                    Ext.getCmp("oil").setFieldLabel(form.messages.labels.oil + " (" + objResponse.defaultMeasureUnit.oil.measureUnitAcronym + ")");
                    Ext.getCmp("oilIdMeasureUnit").setValue(objResponse.defaultMeasureUnit.oil.idMeasureUnit);
                    Ext.getCmp("water").setFieldLabel(form.messages.labels.water + " (" + objResponse.defaultMeasureUnit.water.measureUnitAcronym + ")");
                    Ext.getCmp("waterIdMeasureUnit").setValue(objResponse.defaultMeasureUnit.water.idMeasureUnit);
                }
                else {
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options) {
            }
        });
    }
});