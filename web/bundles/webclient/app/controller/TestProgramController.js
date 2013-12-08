/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.TestProgramController', {
   extend: 'sisprod.controller.Base',
   stores : ['TestProgramStore', 'LotAll', 'BatteryAllStore', 'MonthStore'],
   models : ['TestProgramModel'],
   entityName: 'TestProgram',
   refs: [{ref: 'listTestProgram', selector: 'listTestProgram'}, {ref: 'testProgramDetail', selector: 'testProgramDetail'}],
   views : ['TestProgram.ListTestProgram'],
   
   requires: [
       'sisprod.store.TestProgramStore',
       'sisprod.store.LotAll',
       'sisprod.store.BatteryAllStore',
       'sisprod.store.MonthStore'
   ],
   
   messages: {
       msgDelete: 'this program',
       msgAlertDuplicity: 'There is already a program for the lot and period specified!',
       msgAlertSelectBattery: 'Select Battery',
       msgHasenBattery: 'No batteries earrings set!',
       msgWellConstraint: 'For these wells are programming less than 24 hours per month test',
       msgDaysConstraint: 'For the following wells are programming less than 3 tests per month',
       msgBatteryConstraint: 'The battery has exceeded its testability ({0}) in the following days',
       msgTitleSaveConfirmation: 'Confirmation',
       msgQuestionSave: 'anyway to save?',
       msgTank: 'Tanks',
       msgHours: 'Hours',
       msgConfirmUndoBattery: 'Sure what you want to undo the programming of {0}?',
       msgSuccessUndo: 'got rid of {0} scheduling '
   },
   
   countTanks: '',
   
   deleteOptions: {
       deleteKeys: ['idTestProgram'],
       caption: function(data){
           return '';
       }
   },
   
   init : function(){
        var me = this;
        me.deleteOptions.caption = function(data){
            return me.messages.msgDelete;
        },
                
        this.control({
           'listTestProgram button[action=activate]':{
               click: this.activate
           },
           
           'listTestProgram button[action=add]':{
               click: this.showAdd
           },
           
           'listTestProgram button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listTestProgram button[action=test]':{
               click: this.showTest
           },
           
           'listTestProgram dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listTestProgram button[action=delete]': {
               click: this.destroy
           },
           
           'listTestProgram button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addTestProgram button[action=save]': {
               click: this.saveEntity
           },
           
           'updateTestProgram button[action=save]': {
               click: this.saveEntity
           },
           
           'addTestProgram button[action=registerHeadTestProgram]': {
               click: this.registerHeadTestProgram
           },

           'addTestProgram':{
               beforerender: function(){
                   var batteryStore = this.getStore("BatteryAllStore");
                   batteryStore.removeAll();
               }
           },
                   
           'updateTestProgram':{
                beforerender: this.verifyProgramIsEditable
           },        
                       
           'addTestProgram button[action=startTestProgram]':{
                click: this.registerHeadTestProgram
           },
                   
           'updateTestProgram button[action=startTestProgram]':{
                click: this.showListBattery
           },        
                   
           'updateTestProgram button[action=saveChanges]':{
                click: this.registerHeadTestProgram
           },   
                   
           'programBattery button[action=addBattery]':{
                click: this.showBatteryContextMenu
            },

           'batteryContextMenu button[action=programBattery]':{
                click: this.generateDinamicGridForAdd
            },
            
           'batteryContextMenu gridpanel[id=gridTestProgramContext]':{
                itemdblclick: this.generateDinamicGridForAdd
            },
                    
           'testProgramDetail button[action=save]':{
                click: this.saveChangesInDetail
            },
                    
           'programBattery grid[id=gridTestProgram]': {
                itemdblclick: this.updateTestProgramDetail
           },
                   
           'programBattery button[action=editBattery]':{
                click: this.updateTestProgramDetail
           },
                   
           'programBattery button[action=removeBattery]':{
                click: this.undoTestProgramBattery
           }            
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListTestProgram();
        return tabGrid.getGridPanel();
    },
            
    registerHeadTestProgram: function(button){
        var window = button.up('window');
        var form = window.down('form');
        var me = this;
        if(!form.isValid()) return;
        var values = form.getValues();
        var controlDate = Ext.getCmp('idMonth');
        if(!Ext.isDefined(controlDate)) return false;
        var month = controlDate.month;
        var year = controlDate.year;
        
        var idTestProgram = Ext.getCmp('idTestProgram').getValue();
        if (idTestProgram == null || idTestProgram == '' || !Ext.isDefined(idTestProgram)) idTestProgram = -1;
        
        var effectiveStartDate = getStartDateInMonth(month, year);
        var effectiveEndDate = getEndDateInMonth(month, year);
        values.effectiveStartDate = effectiveStartDate;
        values.effectiveEndDate = effectiveEndDate;
        values.idTestProgram = idTestProgram;
        Ext.BaseAjax.request({
            url: 'rest/testProgram/verifyDuplicity.htm',
            method: 'POST',
            params: values,
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.result == false){
                    me.saveEntity(button);
                }
                else{
                    showAlertMessage(me.messages.msgAlertDuplicity);
                }
            },
            failure: function(response, options){
            }
        });
    },
            
    listBatteryByLotPerAdd: function(){
        var idLot = Ext.getCmp('idLot').getValue();
        var button = Ext.getCmp('buttonAdd');
        var idTestProgram = Ext.getCmp('idTestProgram');
        if(Ext.isDefined(idLot) && idLot != ''){
            idTestProgram.setValue(null);
            button.enable();
            var batteryStore = this.getStore('BatteryAllStore');
            batteryStore.load({params: {idLot: idLot}});
        }
    },
            
    listBatteryByLotPerUpdate: function(){
        var idLot = Ext.getCmp('idLot').getValue(); 
        if(Ext.isDefined(idLot) && idLot != ''){
            var batteryStore = this.getStore('BatteryAllStore');
            batteryStore.load({params: {idLot: idLot}});
        }
    },
            
    showListBattery: function(button){
        var cboLot = Ext.getCmp('idLot'); 
        var cboMonth = Ext.getCmp('idMonth');
        var cboEmployee = Ext.getCmp('idEmployee');
        var idTestProgram = Ext.getCmp('idTestProgram').getValue();
       
        var elaborationDate = Ext.getCmp('elaborationDate').getValue();
        var idLot = cboLot.getValue();
        
        if(Ext.isDefined(idLot) && Ext.isDefined(cboMonth)){
            var thisForm = button.up('window');
            thisForm.close();
            var gridStore = Ext.create('sisprod.store.ProgramBatteryStore');
            gridStore.load({params:{idLot: idLot, idTestProgram: idTestProgram, showNoProgram : false}});
            var form = Ext.create('sisprod.view.TestProgram.ProgramBattery', {gridStore: gridStore});
            Ext.getCmp('idLot').setValue(idLot);
            Ext.getCmp('idMonth').setValue(cboMonth.getValue());
            Ext.getCmp('idMonth').month = cboMonth.month;
            Ext.getCmp('idMonth').year = cboMonth.year;
            Ext.getCmp('txtLot').rawValue = cboLot.rawValue;
            Ext.getCmp('txtMonth').rawValue = cboMonth.rawValue;
            Ext.getCmp('txtEmployeeElaboration').rawValue = cboEmployee.rawValue;
            Ext.getCmp('txtElaborationDate').setValue(elaborationDate);
            Ext.getCmp('idTestProgram').setValue(idTestProgram);
            form.show();
        }
    },
            
    beforeSaveEntity: function(window, form, values, jsonData){
        var controlDate = Ext.getCmp('idMonth');
        if(!Ext.isDefined(controlDate)) return false;
        var month = controlDate.month;
        var year = controlDate.year;
        
        var effectiveStartDate = getStartDateInMonth(month, year);
        var effectiveEndDate = getEndDateInMonth(month, year);
        values.effectiveStartDate = effectiveStartDate;
        values.effectiveEndDate = effectiveEndDate;
        return true;
    },
            
    afterSaveEntity: function(win, form, response, options){
        var objResponse = Ext.decode(response.responseText);
        var testProgram = objResponse.register;
        var idTestProgram = Ext.getCmp("idTestProgram");
        idTestProgram.setValue(testProgram.idTestProgram);
        this.showListBattery(Ext.getCmp('startTestProgram'));
    },
    
    saveChangesInDetail: function(button){
        
        var me = this;
        var message = this.buildMessageConstraint();
        if(message === null || message === '') me.anything(button);
        else{
            Ext.Msg.show({
                title: me.messages.msgTitleSaveConfirmation,
                msg: message,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(res){
                    if(res === 'yes'){
                        me.anything(button);
                    }
                }
            });
        }
    },
        
    anything: function(button){
        var gridDetail = Ext.getCmp('gridTestProgramDetail');
        var detailStore = gridDetail.getStore();
        var arrayWells = detailStore.data.items;
        var cboMonth = Ext.getCmp('idMonth');
        var numberDays = getDaysInMonthOfYear(cboMonth.month, cboMonth.year);
        var arrayRequest = new Array();
        
        for(var i = 0; i < arrayWells.length; i++){
            var wellData = arrayWells[i].data;
            var testProgramWell = {well:{idWell: wellData.idWell}};
            var lisDetail = new Array();
            for(var j = 1; j <= numberDays; j++){
                var testTime = wellData['' + getStringDate(j, cboMonth.month, cboMonth.year)];
                if(testTime > 0)
                    lisDetail.push({testDateString: getStringDate(j, cboMonth.month, cboMonth.year), testTime: testTime});
            }
            testProgramWell.listDetail = lisDetail;
            arrayRequest.push(testProgramWell);
        }
        
        values = {};
        values.idTestProgram = Ext.getCmp('idTestProgram').getValue();
        values.listWell = JSON.stringify(arrayRequest);
        Ext.Ajax.request({
            url: 'rest/testProgram/saveTestProgramDetail.htm',
            method: 'POST',
            params: values,
            async: false,
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success == true){
                    var gridProgramBattery = Ext.getCmp('gridTestProgram');
                    var store = gridProgramBattery.getStore();
                    store.reload();
                    var form = button.up('window');
                    form.close();
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){}
        });
    },
            
    autoMappingFunction: function(grid, window, record){
        window.down('form').loadRecord(record);
        
        var employeeElaboration = Ext.getCmp('idEmployee');
        var cboMonth = Ext.getCmp('idMonth');
        var data = record.raw;
        
        employeeElaboration.setValue(Ext.create(sisprod.getApplication().getModelName('EmployeeTemp'), {
            idEmployee: data.employee.idEmployee,
            personFullName: data.employee.person.personFullName,
            fullDocumentNumber: data.employee.person.fullDocumentNumber
        }));
        
        cboMonth.setValue(data.effectiveStartDate);
        cboMonth.month = parseInt(data.effectiveStartDate.substring(5, 7));
        cboMonth.year = parseInt(data.effectiveStartDate.substring(0, 4));
    },
            
    generateDinamicGridForAdd: function(){
        var cboMonth = Ext.getCmp('idMonth');
        var dinamicModel = this.generateDinamicModel();
        
        var wellStore= Ext.create('sisprod.store.WellByBatteryStore', {
            model: dinamicModel,
            async: false
        });
        
        var gridNoProgramBattery = Ext.getCmp('gridTestProgramContext');
        var batteryRecord = gridNoProgramBattery.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(batteryRecord)){
            showAlertMessage(this.messages.msgAlertSelectBattery);
            return;
        }
        wellStore.load({params:{idBattery: batteryRecord.raw.idBattery}});
        var formDetail = Ext.create('sisprod.view.TestProgram.TestProgramDetail', {month: cboMonth.month, year: cboMonth.year, textPeriod: cboMonth.rawValue, gridStore: wellStore, batteryRecord: batteryRecord});
        formDetail.show();
    },
            
    showBatteryContextMenu: function(button, event){
        var idLot = Ext.getCmp('idLot').getValue();
        var me = this;
        var idTestProgram = Ext.getCmp('idTestProgram').getValue();
        var store = Ext.create('sisprod.store.ProgramBatteryStore');
        store.load({params: {idLot: idLot, idTestProgram: idTestProgram, showNoProgram : true}, 
            callback: function(){
                if(store.getCount() == 0){
                    showAlertMessage(me.messages.msgHasenBattery);
                    return;
                }
                var contextMenu = Ext.create('sisprod.view.TestProgram.BatteryContextMenu', {gridStore: store});
                event.stopEvent();
                contextMenu.showAt(event.getXY());
            }
        });
    },
            
    updateTestProgramDetail: function(button){
        var gridBattery = Ext.getCmp('gridTestProgram');
        var idTestProgram = Ext.getCmp('idTestProgram').getValue();
        var batteryRecord = gridBattery.getSelectionModel().getSelection()[0];
        
        if(!Ext.isDefined(batteryRecord)) {
            showAlertMessage(this.messages.msgAlertSelectBattery);
            return;
        }
        var me = this;
        if(Ext.define(idTestProgram, batteryRecord)){
            var values = {
                idTestProgram : idTestProgram,
                idBattery: batteryRecord.raw.idBattery
            };
            Ext.Ajax.request({
                url: 'rest/testProgram/getTestProgramDetail.htm',
                method: 'POST',
                params: values,
                async: false,
                success: function(response, options){
                    var objResponse = Ext.decode(response.responseText);
                    if(objResponse.success == true){
                        var data = objResponse.detail;
                        me.generateDinamicGridForUpdate(data);
                    }
                    else{
                        showAlertMessage(objResponse.message);
                    }
                },
                failure: function(response, options){}
            });
        }
    },
            
    generateDinamicModel: function(){
        var cboMonth = Ext.getCmp('idMonth');
        var numberDays = getDaysInMonthOfYear(cboMonth.month, cboMonth.year);
        var fields = new Array();
        
        fields.push(
            {name: 'idWell', type: 'int', visible: false},
            {name: 'wellCode', type: 'string', visible: true},
            {name: 'wellGroupName', type: 'string', visible: true, mapping: 'wellGroup.wellGroupName'},
            {name: 'wellTypeByProductionAcronym', type: 'string', visible: true, mapping: 'wellTypeByProduction.acronym'}
        );
        
        for(var i = 1; i <= numberDays; i++){
            fields.push({name: '' + getStringDate(i, cboMonth.month, cboMonth.year), type: 'int', visible:true, defaultValue: null});
        }
        
        var dinamicModel = Ext.define('sisprod.model.dinamicWellModel',{
            extend: 'Ext.data.Model',
            fields: fields,
            idProperty: 'idWell'
        });
        
        return dinamicModel;
    },
            
    generateDinamicGridForUpdate: function(data){
        var cboMonth = Ext.getCmp('idMonth');
        var dinamicModel = this.generateDinamicModel();
        var wellStore= Ext.create('sisprod.store.WellByBatteryStore', {
            model: dinamicModel,
            async: false
        });
        
        for(var i = 0; i < data.length; i++){
            var acronym = null;
            if(Ext.isDefined(data[i].wellTypeByProduction) && data[i].wellTypeByProduction !== null)
                acronym = data[i].wellTypeByProduction.acronym;
            var record = {
                idWell : data[i].well.idWell,
                wellCode: data[i].well.wellCode,
                wellGroupName: data[i].wellGroup.wellGroupName,
                wellTypeByProductionAcronym: acronym
            };
            var listDetail = data[i].listDetail;
            for(var j = 0; j < listDetail.length; j++){
                record['' + listDetail[j].testDate] = listDetail[j].testTime;
            }
            wellStore.add(record);
        }
        
        var gridProgramBattery = Ext.getCmp('gridTestProgram');
        var store = gridProgramBattery.getStore();
        if(store.getCount() > 0){
            var batteryRecord = gridProgramBattery.getSelectionModel().getSelection()[0];
            var formDetail = Ext.create('sisprod.view.TestProgram.TestProgramDetail', {month: cboMonth.month, year: cboMonth.year, textPeriod: cboMonth.rawValue, gridStore: wellStore, batteryRecord: batteryRecord});
            formDetail.show();
        }
    },
            
    verifyProgramIsEditable: function(){
        var buttonEdit = Ext.getCmp('saveChanges');
        var idTestProgram = Ext.getCmp('idTestProgram').getValue();
        if(!Ext.isDefined(idTestProgram)) return;
        values = {
            idTestProgram: idTestProgram
        };
        Ext.Ajax.request({
            url: 'rest/testProgramWell/listByTestProgram.htm',
            method: 'POST',
            params: values,
            async: false,
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success == true){
                    var data = objResponse.data;
                    if(data.length > 0){
                        buttonEdit.setVisible(false);
                    }
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){}
        });
    },
    
    /**
     * verifica que pozos se planifican menos de 24 horas en el mes
     */
    wellConstraint: function(){
        var gridDetail = Ext.getCmp('gridTestProgramDetail');
        var detailStore = gridDetail.getStore();
        var arrayWells = detailStore.data.items;
        var cboMonth = Ext.getCmp('idMonth');
        var numberDays = getDaysInMonthOfYear(cboMonth.month, cboMonth.year);
        var errorMessage = '';
        
        for(var i = 0; i < arrayWells.length; i++){
            var wellData = arrayWells[i].data;
            var sumHours = 0;
            for(var j = 1; j <= numberDays; j++)
                sumHours += wellData['' + getStringDate(j, cboMonth.month, cboMonth.year)];
            if(sumHours < 24){
                errorMessage += wellData.wellCode + ', ';
            }
        }
        
        return errorMessage;
    },
            
    /**
     * verifica que pozos se planifican menos de 3 veces al mes
     */        
    daysConstraint: function(){
        var gridDetail = Ext.getCmp('gridTestProgramDetail');
        var detailStore = gridDetail.getStore();
        var arrayWells = detailStore.data.items;
        var cboMonth = Ext.getCmp('idMonth');
        var numberDays = getDaysInMonthOfYear(cboMonth.month, cboMonth.year);
        var errorMessage = '';
        
        for(var i = 0; i < arrayWells.length; i++){
            var wellData = arrayWells[i].data;
            var countDays = 0;
            for(var j = 1; j <= numberDays; j++){
                if(wellData['' + getStringDate(j, cboMonth.month, cboMonth.year)] > 0) countDays ++;
            }
            if(countDays < 3){
                errorMessage += wellData.wellCode + ', ';
            }
        }
        
        return errorMessage;
    },
            
    /**
     * verifica en que días la bateria excede su capacidad de prueba (N° de tanques  X 24 horas)
     */        
    batteryConstraint: function(){
        var gridDetail = Ext.getCmp('gridTestProgramDetail');
        var detailStore = gridDetail.getStore();
        var arrayWells = detailStore.data.items;
        var cboMonth = Ext.getCmp('idMonth');
        var numberDays = getDaysInMonthOfYear(cboMonth.month, cboMonth.year);
        var viewDetail = this.getTestProgramDetail();
        var errorMessage = '';
        var me = this;
        if(!Ext.isDefined(viewDetail)) return;
        values = {
            idBattery:  viewDetail.batteryRecord.raw.idBattery
        };
        Ext.Ajax.request({
            url: 'rest/batterys/listTankByBattery.htm',
            method: 'POST',
            params: values,
            async: false,
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success == true){
                    var data = objResponse.data;
                    var countTank = data.length;
                    me.countTanks = countTank;
                    var limitHours = countTank * 24;
                    for(var j = 1; j <= numberDays; j++){
                        var date = getStringDate(j, cboMonth.month, cboMonth.year);
                        var sumHours = 0;
                        for(var i = 0; i < arrayWells.length; i++){
                            var wellData = arrayWells[i].data;
                            sumHours += wellData['' + date];
                        }
                        if(sumHours > limitHours){
                            errorMessage += date + ', ';
                        }
                    }
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){}
        });
        return errorMessage;
    },
    
    buildMessageConstraint: function(){
        var messageR1 = this.wellConstraint();
        var messageR2 = this.daysConstraint();
        var messageR3 = this.batteryConstraint();
        var totalMessage = '';
        if(messageR1 != ''){
            messageR1 = messageR1.substring(0, messageR1.length - 2);
            messageR1 = '<ul><li>' + messageR1 + '</li></ul>';
            totalMessage = this.messages.msgWellConstraint + ':<br>' + messageR1 + '<br>';
        }
        
        if(messageR2 != ''){
            messageR2 = messageR2.substring(0, messageR2.length - 2);
            messageR2 = '<ul><li>' + messageR2 + '</li></ul>';
            totalMessage += this.messages.msgDaysConstraint+ ':<br>' + messageR2 + '<br>';
        }
        
        if(messageR3 != ''){
            messageR3 = messageR3.substring(0, messageR3.length - 2);
            messageR3 = '<ul><li>' + messageR3 + '</li></ul>';
            var msgTank = Ext.String.format('{0} {1} X 24 {2}', this.countTanks, this.messages.msgTank, this.messages.msgHours);
            totalMessage += Ext.String.format(this.messages.msgBatteryConstraint, msgTank) + ':<br>' + messageR3 + '<br>';
        }
        
        if(totalMessage != ''){
            totalMessage += this.messages.msgQuestionSave;
        }
        
        return totalMessage;
    },
            
    undoTestProgramBattery: function(){ 
        var gridProgramBattery = Ext.getCmp('gridTestProgram');
        var batteryRecord = gridProgramBattery.getSelectionModel().getSelection()[0];
        var me = this;
        if(!Ext.isDefined(batteryRecord) || batteryRecord === null) showAlertMessage(this.messages.msgAlertSelectBattery);
        Ext.Msg.show({
            title: me.messages.msgTitleSaveConfirmation,
            msg: Ext.String.format(this.messages.msgConfirmUndoBattery, batteryRecord.raw.batteryName),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(res){
                if(res === 'yes'){
                    var idTestProgram = Ext.getCmp('idTestProgram').getValue();
                    var values = {idTestProgram: idTestProgram, idBattery: batteryRecord.raw.idBattery};
                    Ext.Ajax.request({
                        url: 'rest/testProgram/undoTestProgramBattery.htm',
                        method: 'POST',
                        params: values,
                        async: false,
                        success: function(response, options){
                            var objResponse = Ext.decode(response.responseText);
                            if(objResponse.success == true){
                                showAlertMessage(Ext.String.format(me.messages.msgSuccessUndo, batteryRecord.raw.batteryName));
                                var store = gridProgramBattery.getStore();
                                store.reload();
                            }
                            else{
                                showAlertMessage(objResponse.message);
                            }
                        },
                        failure: function(response, options){}
                    });
                }
            }
        });
    }
});