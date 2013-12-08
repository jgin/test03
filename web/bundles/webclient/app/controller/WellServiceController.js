/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellServiceController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellServiceStore'],
   models : ['WellServiceModel'],
   entityName: 'WellService',
   refs: [{ref: 'listWellService', selector: 'listWellService'}],
   views : ['WellService.ListWellService'],
  
   requires: [
       'sisprod.store.WellServiceStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWellService'],
       caption: 'sdpReasonName'
   },
   messages: {
        msgSelectSdpReason: 'Select a Reason at last!'
   },
   init : function(){
        this.control({
            'listWellService button[action=activate]':{
               click: this.activate
           },
           'listWellService button[action=add]':{
               click: this.showAdd
           },
           
           'listWellService button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWellService dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWellService button[action=delete]': {
               click: this.destroy
           },
           
           'listWellService button[action=print]': {
               click: this.showPrint
           },
           'listWellService button[action=attachFiles]': {
               click: this.onAttachFileButton
           },
           'listWellService button[action=CostCompany]': {
               click: this.onCostSdpCompanyeButton
           },
           'addWellService button[action=save]': {
               click: this.saveEntity
           },
           'addWellService': {
               afterrender: this.afterRender
           },
           'addWellService combobox[id=idLot]': { 
               select: this.onSelectLot
           },
           'updateWellService button[action=save]': {
               click: this.saveEntity
           },           
           'sdpFileWindow button[action=uploadFile]': {
               click: this.onUploadFile
           },
           'sdpFileWindow button[action=removeFile]': {
               click: this.onRemoveFile
           },//addCostWellService
           'listSdpCompanyCost button[action=addCostWellService]': {
               click: this.onAddCostWellServiceButton
           },
           'listSdpCompanyCost button[action=updateCostWellService]': {
               click: this.onUpdateCostWellServiceButton
           },
           'listSdpCompanyCost button[action=removeCostWellService]': {
               click: this.onRemoveCostWellServiceButton
           }
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListWellService();
        return tabGrid.getGridPanel();
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboWell = Ext.getCmp('idWell');
        var cboLot = Ext.getCmp("idLot");
        var cboSupervisor = Ext.getCmp('idEmployee');
        var idLot = record.raw.well.lot.idLot;
        if(Ext.isDefined(cboLot)){
            cboLot.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboLot.select(idLot);
                    cboWell.setValue(new Ext.create(sisprod.getApplication().getModelName('Well'),{
                        idWell: record.raw.well.idWell,
                        wellName: record.raw.well.wellName
                    }));                                          
                }
            });
            
        }
        cboSupervisor.setValue(new Ext.create(sisprod.getApplication().getModelName('EmployeeTemp'),{
                idEmployee: record.raw.supervisorEmployee.idEmployee,
                personFullName: record.raw.supervisorEmployee.person.personFullName,
                fullDocumentNumber: record.raw.supervisorEmployee.person.fullDocumentNumber
            }));
    },
    showSdpCostForm:function(){
        var controllerName = sisprod.getApplication().getControllerName("SdpCompanyCost");    
        var controller = sisprod.getApplication().getController(controllerName);
        var sdpGrid=Ext.getCmp('sdpCompanyCostGrid'); 
        var addSdp = Ext.create("sisprod.view.SdpCompanyCost.AddSdpCompanyCost",{
            idSdp:-1,
            storeRef:sdpGrid.getStore(),
            controller:controller
        });        
        addSdp.show();
    },
    beforeSaveEntity:function(win, form, values){
        if(!Ext.isDefined(values.usedFrecuency)){
            values.usedFrecuency = false;
        }
        var selectorModel = Ext.getCmp('gridSdpReasonSelector').selModel;
        if(selectorModel.selected.getCount() === 0){
            showAlertMessage(this.messages.msgSelectSdpReason);
            return false;
        }
       
        var listGroup = new Array();
        for(var i = 0; i < selectorModel.selected.getCount(); i++){
            var etRecord = selectorModel.selected.getAt(i);
            listGroup.push(etRecord.data);
        }
        values.gridSdpReasonSelector =  JSON.stringify(listGroup);
        return true;
    },
    selectItems: function(selected, form){
        var me = this;
        var newGrid = form.down('[name=gridSdpReasonSelector]');
        console.log(newGrid);
//        var grid = Ext.getCmp('gridSdpReasonSelector');
        var selectModel = newGrid.getSelectionModel();
        var store =  newGrid.getStore();
//        selectModel.deselectAll();
        console.log(newGrid);
        var indexes = new Array();
        for(var i = 0; i < selected.length; i++){
            var record = store.findRecord( 'idSdpReason', selected[i].idSdpReason, 0, false, true, true);
//            var index = store.find('idSdpReason', selected[i].idSdpReason);                    
            if(Ext.isDefined(record) && record !== null) {
                indexes.push(record);
//                selectModel.select(index, true);
//                console.log(selectModel);
            }
        }
        selectModel.select(indexes);
    },
    getSdpReasonDetail:function(idSdp, form){
        var me = this;
        
        Ext.BaseAjax.request({
            url: 'rest/wellServices/listSdpReasonDetail.htm',
            method: 'POST',
            async:false,
            params: {idSdp: idSdp},
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    me.selectItems(responseData.data, form);
                }      
            }
        });
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
        var data = me.getGridForEntity().getSelectionModel().getSelection()[0].data;
        var window = Ext.create('sisprod.view.WellService.SdpFileWindow',{
            data: data
        });
        window.show();
    },
    onCostSdpCompanyeButton: function(button){
        var me = this;
        var grid = me.getGridForEntity();
        if(grid === undefined || grid === null) return;
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
        var data = me.getGridForEntity().getSelectionModel().getSelection()[0].data;
        var window = Ext.create('sisprod.view.SdpCompanyCost.ListSdpCompanyCost',{
            data: data
        });
        window.show();
    },
    onAddCostWellServiceButton: function(button){
        var me =this;
        var mainWindow = button.up('window');
        var data = mainWindow.data;
//        console.log(data);
        var controllerName = sisprod.getApplication().getControllerName("SdpCompanyCost");    
        var controller = sisprod.getApplication().getController(controllerName);
        var sdpGrid=Ext.getCmp('gridSdpCompanyCost'); 
        var window = Ext.create('sisprod.view.SdpCompanyCost.AddSdpCompanyCost',{
            idSdp: data.idSdp,
            storeRef:sdpGrid.getStore(),
            controller:controller,
            mainController: me
        });
        window.show();
    },
    onUpdateCostWellServiceButton: function(button){
        var me =this;
        var mainWindow = button.up('window');
//        var data = me.getGridForEntity().getSelectionModel().getSelection()[0].data;
        var data = mainWindow.data;
        var controllerName = sisprod.getApplication().getControllerName("SdpCompanyCost");    
        var controller = sisprod.getApplication().getController(controllerName);
        var sdpGrid=Ext.getCmp('gridSdpCompanyCost'); 
        var window = Ext.create('sisprod.view.SdpCompanyCost.UpdateSdpCompanyCost',{
            idSdp: data.idSdp,
            storeRef:sdpGrid.getStore(),
            controller:controller
        });
//        window.show();
        if(Ext.isDefined(controller.autoMappingFunction) && typeof(controller.autoMappingFunction)==='function'){
            controller.autoMappingFunction.apply(controller, [sdpGrid, window, sdpGrid.getSelectionModel().getSelection()[0]]);
        }
        if(window.isHidden) window.show();
    },
    onUploadFile: function(button){
        var me = this;
        var formPanel = button.up('form');
        var window = formPanel.up('window');
        var grid = window.down('#sdpFileGrid');
        var store = grid.getStore();
        if(formPanel.isValid()){
            formPanel.submit({
                url: 'rest/sdpFile/register.htm',
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
        var grid = button.up('#sdpFileGrid');
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
                        var idSdpFile = data['idSdpFile'];
                        Ext.BaseAjax.request({
                           url: 'rest/sdpFile/delete.htm',
                           params: {
                               idSdpFile: idSdpFile
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
    onRemoveCostWellServiceButton: function(button, window) {
        var me = this;
        //var grid = button.on('#gridSdpCompanyCost');
        var grid = Ext.getCmp('gridSdpCompanyCost');
        var record = grid.getSelectionModel().getSelection()[0];
        if(record) {
            var data = record.data;
            Ext.Msg.show({
                title: me.controllerMessages.alertMessage,
                msg: Ext.String.format(me.controllerMessages.deleteRecorConfirmationMessage, data['sdpCompany.company.companyName']),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(button) {
                    if(button==="yes"){
                        var idSdpCompanyCost = data['idSdpCompanyCost'];
                        Ext.BaseAjax.request({
                           url: 'rest/sdpCompanyCost/delete.htm',
                           params: {
                               idSdpCompanyCost: idSdpCompanyCost
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
    updateWellParamsAndFeaturesButton_click: function(grid, rowIndex, colIndex){
        var productionPeriodInput = Ext.getCmp('envProductionPeriodDate');
        var productionPeriodValue = Ext.util.Format.date(new Date(), 'd-m-Y');
        if(Ext.isDefined(productionPeriodInput) && productionPeriodInput !== null)
            productionPeriodValue = Ext.util.Format.date(productionPeriodInput.getValue(), 'Y-m-d');
        
        var items = new Array();
        items.push({idProductionPeriod: parseInt(Ext.util.Cookies.get('envProductionPeriodId')),productionPeriodDate:productionPeriodValue});
        
        var wellController=this.getController("Well");
        var wellServiceRecord=grid.getRecord(rowIndex, colIndex);
        var rawWellService=wellServiceRecord.raw;
        var form=wellController.showUpdateWellParamsAndFeaturesForm(
                wellController.featureEditionTypeEnum.FEATURE_EDITION_ON_WELLSERVICE,
        rawWellService.well, items[0]);
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
    },
    onSelectLot: function(combo, selectedRecords, eOpts) { 
        var cboWell = Ext.getCmp('idWell'); 
        cboWell.clearValue();
        cboWell.getStore().reload();
    }
});

