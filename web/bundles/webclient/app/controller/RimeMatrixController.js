/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.RimeMatrixController', {
   extend: 'sisprod.controller.Base',
   stores : ['RimeMatrixStore'],
   models : ['RimeMatrixModel'],
   entityName: 'RimeMatrix',
   refs: [{ref: 'listRimeMatrix', selector: 'listRimeMatrix'}],
   views : ['RimeMatrix.ListRimeMatrix'],
   
   requires: [
       'sisprod.store.RimeMatrixStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idRimeMatrixDetail'],
       caption: function(data){
           var message = Ext.String.format("{0} - {1} - {2}", data["workCategoryDetail"]["workCategoryDetailName"], data["rimeCriteria"]["rimeCriteriaName"],
                data["rimeIndex"]);
           return message;
       }
   },
   
   init : function(){
        //
        Ext.create('Ext.data.Store',{
            storeId: 'workCategoryDetailsStoreGrid',
            fields: ['workCategoryDetailName'],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        //
        this.control({
           'listRimeMatrix button[action=activate]':{
               click: this.activate
           },
           
           'listRimeMatrix button[action=add]':{
               click: this.showAdd
           },
           
           'listRimeMatrix button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listRimeMatrix dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listRimeMatrix button[action=delete]': {
               click: this.destroy
           },
           
           'listRimeMatrix button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addRimeMatrix button[action=save]': {
               click: this.saveEntity
           },
           
           'addRimeMatrix combobox[id=idRimeCriteria]': {
               change: this.onSelectRimeCriteria
           },
           
           'addRimeMatrix, updateRimeMatrix': {
               close: this.onCloseWindow
           },
           
           'updateRimeMatrix button[action=save]': {
               click: this.saveEntity
           },
           
           'updateRimeMatrix combobox[id=idRimeCriteria]': {
               change: this.onSelectRimeCriteria
           },
           
           'addRimeMatrix combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategoy
           },
           'updateRimeMatrix combobox[id=idWorkCategory]': {
               select: this.onSelectWorkCategoy
           }
       });
       this.callParent(arguments);
    },
    
    onCloseWindow: function(){
        var store = Ext.StoreManager.lookup('workCategoryDetailsStoreGrid');
        if(Ext.isDefined(store) && store!==null){
            store.loadData([], false);
        }
    },
    
    showUpdate: function(grid, record){
        var chkInactive = Ext.getCmp('chk' + this.entityName);
        if(Ext.isDefined(chkInactive) && chkInactive.getValue()) return;
        var me = this;
        var window;
        if(Ext.isDefined(record)){
            Ext.BaseAjax.request({
                url: 'rest/rimeMatrixDetail/getCompleteById.htm',
                async: false,
                method: 'POST',
                params: { idRimeMatrixDetail: record.raw['idRimeMatrixDetail'] },
                success: function(response){
                    var data = Ext.JSON.decode(response.responseText);
                    if(data.success){
                        window = Ext.create('sisprod.view.'+ me.entityName + '.Update' + me.entityName, {
                            firstDisplay: true,
                            formData: {
                                rimeMatrixDetail: data['rimeMatrixDetail'],
                                consequenceCriterias: data['consequenceCriterias'],
                                criticalityCriterias: data['criticalityCriterias']
                            }
                        });
                    }
                    else{
                        Ext.MessageBox.show({
                            title: me.controllerMessages.alertMessage,
                            msg: data.message,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                }
            });
            if(Ext.isDefined(me.autoMappingFunction) && typeof(me.autoMappingFunction)==='function'){
                me.autoMappingFunction.apply(me, [grid, window, record]);
            }
            else{
                window.down('form').loadRecord(record);
            }
            if(window.isHidden()) window.show();
        }
        else Ext.Msg.alert(me.controllerMessages.updateText, me.controllerMessages.selectRecordMessage);
    },
    onSelectWorkCategoy: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var workCategoryDetail = formPanel.down('#idWorkCategoryDetail');
        workCategoryDetail.clearValue();
        workCategoryDetail.getStore().reload();
    },      
    getGridForEntity: function(){
        var tabGrid = this.getListRimeMatrix();
        return tabGrid.getGridPanel();
    },
    
    beforeSaveEntity: function(window, form, values, jsonData){
        var me = this;
        var criticalityGrid = form.down('#criticalityGrid');
        var consequenceGrid = form.down('#consequenceGrid');
        var criticalityStore = criticalityGrid.getStore();
        var consequenceStore = consequenceGrid.getStore();
        //
        if(!Ext.isDefined(criticalityStore) || criticalityStore===null) return false;
        if(criticalityStore.getCount() === 0) return false;
        if(!Ext.isDefined(consequenceStore) || consequenceStore===null) return false;
        if(consequenceStore.getCount() === 0) return false;
        //
        var criticalityFactorLevels = new Array();
        for(var i=0;i<criticalityStore.getCount();i++){
            criticalityFactorLevels.push(criticalityStore.getAt(i).data);
        }
        values.criticalityFactorLevels = Ext.JSON.encode(criticalityFactorLevels);
        //
        var consequenceFactorLevels = new Array();
        for(var i=0;i<consequenceStore.getCount();i++){
            consequenceFactorLevels.push(consequenceStore.getAt(i).data);
        }
        values.consequenceFactorLevels = Ext.JSON.encode(consequenceFactorLevels);
        return true;
    },
    
    autoMappingFunction: function(grid, window, record){
        var me = this;
        var formPanel = window.down('form');
        me.fillUpdateFormData(window, formPanel);
//        if(!Ext.isDefined(record.raw) && record.raw===null) return;
//        if(!Ext.isDefined(record.raw.idRimeMatrixDetail) && record.raw.idRimeMatrixDetail===null) return;        
//        var idRimeMatrixDetail = record.raw.idRimeMatrixDetail;
//        Ext.BaseAjax.request({
//            url: 'rest/rimeMatrixDetail/getCompleteById.htm',
//            async: false,
//            method: 'POST',
//            params: { idRimeMatrixDetail: idRimeMatrixDetail },
//            success: function(response){
//                var data = Ext.JSON.decode(response.responseText);
//                me.fillUpdateFormData(window, formPanel, data);
//            }
//        });
    },
    
    fillUpdateFormData: function(window, formPanel){
        var me = this;
        var data = window.formData;
        var rimeMatrixDetail = data['rimeMatrixDetail'];
        // Rime Matrix Detail Id
        formPanel.down('#idRimeMatrix').setValue(rimeMatrixDetail['rimeMatrix']['idRimeMatrix']);
        formPanel.down('#idRimeMatrixDetail').setValue(rimeMatrixDetail['idRimeMatrixDetail']);
        // Risk Level data
        var idRiskLevel = rimeMatrixDetail['riskLevel']['idRiskLevel'];
        var riskLevelName = rimeMatrixDetail['riskLevel']['riskLevelName'];
        var riskValue = rimeMatrixDetail['riskValue'];
        // Inputs
        formPanel.down('#idRiskLevel').setValue(idRiskLevel);
        formPanel.down('#riskName').setValue(riskLevelName);
        formPanel.down('#riskValue').setValue(riskValue);
        // Criticality Data
        var idCriteriaLevel = rimeMatrixDetail['criteriaLevel']['idCriteriaLevel'];
        var criteriaLevelName = rimeMatrixDetail['criteriaLevel']['criteriaLevelName'];
        var criticalityValue = rimeMatrixDetail['criticalityValue'];
        // Inputs
        formPanel.down('#idCriteriaLevel').setValue(idCriteriaLevel);
        formPanel.down('#criticalityName').setValue(criteriaLevelName);
        formPanel.down('#criticalityValue').setValue(criticalityValue);
        // RIME Criteria
        var idRimeCriteriaValue = rimeMatrixDetail['rimeCriteriaValue']['idRimeCriteriaValue'];
        var maximumTimeAttention = rimeMatrixDetail['rimeCriteriaValue']['maximumTimeAttention'];
        var rimeCriteriaName = rimeMatrixDetail['rimeCriteria']['rimeCriteriaName'];
        var rimeIndex = rimeMatrixDetail['rimeIndex'];
        // Inputs
        formPanel.down('#idRimeCriteriaValue').setValue(idRimeCriteriaValue);
        formPanel.down('#rimeCriteriaName').setValue(rimeCriteriaName);
        formPanel.down('#maximumTimeAttention').setValue(maximumTimeAttention);
        formPanel.down('#rimeIndex').setValue(rimeIndex);
        //Work Category
        var cboWorkCategory=formPanel.down('#idWorkCategory');
        cboWorkCategory.getStore().load({
            scope: this,
            callback: function(records, operation, success){
                cboWorkCategory.select(rimeMatrixDetail['workCategoryDetail']['workCategory']['idWorkCategory']);                     
            }
        });
        // Work Category Detail
        formPanel.down('#idWorkCategoryDetail').setValue(new Ext.create(sisprod.getApplication().getModelName('WorkCategoryDetail'),{
            workCategoryName: rimeMatrixDetail['workCategoryDetail']['workCategory']['workCategoryName'],
            idWorkCategoryDetail: rimeMatrixDetail['workCategoryDetail']['idWorkCategoryDetail'],
            workCategoryDetailName: rimeMatrixDetail['workCategoryDetail']['workCategoryDetailName']
        }));
        // Ocurrence Probability
//        formPanel.down('#idOcurrenceProbability').select(rimeMatrixDetail['ocurrenceProbability']['idOcurrenceProbability']);
        var cmbOcurrenceProbability = formPanel.down('#idOcurrenceProbability');
        cmbOcurrenceProbability.getStore().load({
            scope: this,
            callback: function(records, operation, success){
                cmbOcurrenceProbability.select(rimeMatrixDetail['ocurrenceProbability']['idOcurrenceProbability']);
                window.firstDisplay = false;
            }
        });
//        me.setDataInForm(window, rimeMatrixDetail);
//
//        var idRimeMatrix = data['rimeMatrix']['idRimeMatrix'];
//        var rimeIndex = data['rimeIndex'];
//        var idRimeCriteria = data['rimeCriteria']['idRimeCriteria'];
//        var idWorkCategoryDetail = data['workCategoryDetail']['idWorkCategoryDetail'];
//        
//        //
//        if(!Ext.isDefined(idRimeMatrix) || !Ext.isDefined(idWorkCategoryDetail) || !Ext.isDefined(idRimeCriteria) || !Ext.isDefined(rimeIndex)) return;
//        //
//        var idRimeMatrixInput = formPanel.query('[name=idRimeMatrix]')[0];
//        var rimeIndexInput = formPanel.query('[name=rimeIndex]')[0];
//        var workCategoryDetailInput = formPanel.query('[name=idWorkCategoryDetail]')[0];
//        var rimeCriteriaInput = formPanel.query('[name=idRimeCriteria]')[0];
//        if(!Ext.isDefined(idRimeMatrixInput) || !Ext.isDefined(rimeIndexInput) || !Ext.isDefined(workCategoryDetailInput) || !Ext.isDefined(rimeCriteriaInput)) return;
//        idRimeMatrixInput.setValue(idRimeMatrix);
//        rimeIndexInput.setValue(rimeIndex);
//        rimeCriteriaInput.getStore().load({
//            scope: this,
//            callback: function(records, operation, success){
//                rimeCriteriaInput.select(idRimeCriteria);
//                workCategoryDetailInput.getStore().load({
//                    scope: this,
//                    callback: function(records, operation, success){
//                        workCategoryDetailInput.select(idWorkCategoryDetail);
//                        window.show();
//                    }
//                });
//            }
//        });
    }
//    
//    onSelectWorkCategory: function(combobox, newValue, oldValue, options){
//        var idWorkCategory = newValue;
//        var store = Ext.StoreManager.lookup('workCategoryDetailsStoreGrid');
//        Ext.BaseAjax.request({
//            url: 'rest/workCategoryDetail/listByWorkCategoryId.htm',
//            method: "POST",
//            params: {idWorkCategory: idWorkCategory},
//            success: function(response){
//                var responseText = response.responseText;
//                var jsonData = Ext.JSON.decode(responseText);
//                if(jsonData!==null){
//                    if(Ext.isDefined(store) && store!==null) store.loadData(jsonData.data, false);
//                }
//            },
//            failure: function(response){
//            }
//        });
//    },
//    
//    onSelectRimeCriteria: function(combobox, newValue, oldValue, options){
//        var me = this;
//        var idRimeCriteria = newValue;
//        var form = combobox.up('form');
//        Ext.BaseAjax.request({
//            url: 'rest/rimeCriteriaValue/getLastByRimeCriteriaId.htm',
//            method: "POST",
//            params: {idRimeCriteria: idRimeCriteria},
//            success: function(response){
//                var responseText = response.responseText;
//                var jsonData = Ext.JSON.decode(responseText);
//                var value;
//                if(jsonData.success){
//                    var data = jsonData.data;
//                    if(Ext.isDefined(data) && data!==null){
//                        value = jsonData.data;
//                        me.validateNumberFields(form, value);
//                    } else me.validateNumberFields(form, value);
//                }
//                else me.validateNumberFields(form, value);
//            },
//            failure: function(response){
//            }
//        });
//    },
//    
//    validateNumberFields: function(form, data){
//        var minimumField, maximumField, maximumAttentionField, rimeIndex;
//        if(Ext.isDefined(form) && form!==null){
//            minimumField = form.queryById('minimumScore');
//            maximumField = form.queryById('maximumScore');
//            maximumAttentionField = form.queryById('maximumTimeAttention');
//            rimeIndex = form.queryById('rimeIndex');
//        }
//        if(Ext.isDefined(minimumField) && minimumField!==null)
//            minimumField.setValue(0);
//        if(Ext.isDefined(maximumField) && maximumField!==null)
//            maximumField.setValue(0);
//        if(Ext.isDefined(maximumAttentionField) && maximumAttentionField!==null)
//            maximumAttentionField.setValue(0);
//        //
//        if(data!==undefined){
//            //
//            if(Ext.isDefined(minimumField) && minimumField!==null)
//                minimumField.setValue(data.minimumScore);
//            if(Ext.isDefined(maximumField) && maximumField!==null)
//                maximumField.setValue(data.maximumScore);
//            if(Ext.isDefined(maximumAttentionField) && maximumAttentionField!==null)
//                maximumAttentionField.setValue(data.maximumTimeAttention);
//            //
//            var index = rimeIndex.getValue();
//            if(index<=data.minimumScore || index>=data.maximumScore) rimeIndex.setValue('');
//            rimeIndex.setEditable(true);rimeIndex.setSpinUpEnabled(true);rimeIndex.setSpinDownEnabled(true);
//            rimeIndex.setMinValue(data.minimumScore);rimeIndex.setMaxValue(data.maximumScore);
//        }
//        else {
//            Ext.Msg.alert("Matrix RIME", "Este criterio no tiene valores registrados. Seleccione otro por favor.");
//            rimeIndex.setValue('');
//            rimeIndex.setSpinDownEnabled(false);
//            rimeIndex.setMinValue(0);rimeIndex.setMaxValue(0);rimeIndex.setEditable(false);
//            rimeIndex.setSpinUpEnabled(false);
//        }
//    }
});

