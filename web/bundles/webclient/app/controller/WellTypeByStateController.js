/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellTypeByStateController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellTypeByStateStore', 'WellStateAllStore', 'WellFeatureAllStore'],
   models : ['WellTypeByStateModel'],
   entityName: 'WellTypeByState',
   refs: [{ref: 'listWellTypeByState', selector: 'listWellTypeByState'}, {ref: 'extractionTypeDetail', selector: 'extractionTypeDetail'},
           {ref: 'addWellTypeByState', selector: 'addWellTypeByState'}, {ref:'wellFeatureSelector', selector: 'wellFeatureSelector'}] ,
   views : ['WellTypeByState.ListWellTypeByState'],
   
   requires: [
       'sisprod.store.WellTypeByStateStore',
       'sisprod.store.WellStateAllStore',
       'sisprod.store.WellFeatureAllStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idWellTypeByState'],
       caption: function(data){
           return data['wellTypeByStateName'];
       }
   },
           
   messages: {
        msgAlertInputName: 'Input Well Type State Description',
        msgAlertInputAcronym: 'Input Well Type State Acronym',
        msgNoInputExtractionDetail: 'log at least one type of extraction!'
   },
   
   init : function(){    
        //this.createExtractionTypeStore('extractionTypeDetailStore');
        this.control({
           'listWellTypeByState button[action=activate]':{
               click: this.activate
           },
           
           'listWellTypeByState button[action=add]':{
               click: this.showAdd
           },
           
           'listWellTypeByState button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWellTypeByState dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWellTypeByState button[action=delete]': {
               click: this.destroy
           },
           
           'listWellTypeByState button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWellTypeByState button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWellTypeByState button[action=save]': {
               click: this.saveEntity
           },
           
           'addWellTypeByState button[action=addExtractionTypes]':{
               click: this.showGridExtractionTypeDetail
           },
           
           'addWellTypeByState, updateWellTypeByState': {
               close: this.onCloseWindow
           },
           
           'wellFeatureSelector button[action=save]':{
               click: this.assignWellFeatures
           },
           
           'wellFeatureSelector':{
               afterrender: this.mappingSelectWellFeatures
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWellTypeByState();
        return tabGrid.getGridPanel();
    },
            
    showFormExtractionTypeFeatures: function(grid, rowIndex){
        var me = this;
        var store = grid.getStore();
        var selRecord = store.getAt(rowIndex);
        //var wellFeatureStore = this.getStore('WellFeatureAllStore');
        var featureSelector = Ext.create('sisprod.view.WellFeature.WellFeatureSelector', {record: selRecord, controller: me});
        featureSelector.show();
    },
            
    showGridExtractionTypeDetail: function(button){
        var window = button.up('window');
        
        var store = this.getExtractionTypeDetail().getStore();
        //var store = Ext.StoreManager.lookup('extractionTypeDetailStore');
        var me = this;
        var wellTypeByStateName = Ext.getCmp('wellTypeByStateName').getValue().trim();
        var acronym = Ext.getCmp('wellTypeByStateAcronym').getValue().trim();
        if(wellTypeByStateName === null  || wellTypeByStateName === ''){
            showAlertMessage(me.messages.msgAlertInputName);
            return;
        }
        
        if(acronym === null || acronym === ''){
            showAlertMessage(me.messages.msgAlertInputAcronym);
            return;
        }
        
        var extractionTypeRecord = {
            extractionTypeName: wellTypeByStateName,
            extractionTypeAcronym: acronym
        };
        store.add(extractionTypeRecord);
        var gridExtractionTypeDetail = this.getExtractionTypeDetail();
        gridExtractionTypeDetail.show();
        window.center();
        button.enable();
    },
            
    onCloseWindow: function(){
        var store = this.getExtractionTypeDetail().getStore();
        //var store = Ext.StoreManager.lookup('extractionTypeDetailStore');
        if(Ext.isDefined(store) && store!==null){
            store.loadData([], false);
        }
    },
            
    beforeSaveEntity: function(window, form, values, jsonData){
        var store = this.getExtractionTypeDetail().getStore();
        //var store = Ext.StoreManager.lookup('extractionTypeDetailStore');
        if(store.getCount() === 0){
            showAlertMessage(this.messages.msgNoInputExtractionDetail);
            return false;
        }
        
        var listExtractionType = new Array();
        for(var i = 0; i < store.getCount(); i++){
            var etRecord = store.getAt(i);
            if(Ext.isDefined(etRecord.data.listFeatures) && etRecord.data.listFeatures !== ''){
                var lf = new Array();
                for(var j = 0; j < etRecord.data.listFeatures.length; j++){
                    var wf = {
                        idWellFeature: etRecord.data.listFeatures[j].idWellFeature
                    };
                    lf.push(wf);
                }
                etRecord.data.listFeatures = lf;
            }
            else etRecord.data.listFeatures = [];
            listExtractionType.push(etRecord.data);
        }
        values.listExtractionType = JSON.stringify(listExtractionType) ;
        return true;
    },
            
    assignWellFeatures: function(button){
        var window = button.up('window');
        var featureSelector = this.getWellFeatureSelector();
        var grid = Ext.getCmp('gridWellFeatureSelector');
        var selectorModel = grid.selModel;
        var record = featureSelector.getRecord();
        var listFeatures = new Array();
        for(var i = 0; i < selectorModel.selected.getCount(); i++){
            var wfRecord = selectorModel.selected.getAt(i);
            listFeatures.push(wfRecord.data);
        }
        record.data.listFeatures = listFeatures;
        window.close();
    },
            
    createExtractionTypeStore: function(id){
        var detailModel = Ext.define('modelExtractionTypeDeatil',{
            extend: 'Ext.data.Model',
                fields:[
                    {name: 'idExtractionType', type: 'int', visible: false},
                    {name: 'extractionTypeName', type: 'string', visible: true},
                    {name: 'extractionTypeAcronym', type: 'string', visible: true},
                    {name: 'listFeatures', visible: false}
                ],
                idProperty: 'idExtractionType'
        });
        
        var store = Ext.create('sisprod.store.ExtractionTypeStore', {
            model: detailModel,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
        
        return store;
    },
            
    mappingSelectWellFeatures: function(){
        var gridWellFeatureSelector = Ext.getCmp('gridWellFeatureSelector');
        var viewSelector = this.getWellFeatureSelector();
        if(Ext.isDefined(gridWellFeatureSelector)){
            var store = gridWellFeatureSelector.getStore();
            var selectModel = gridWellFeatureSelector.selModel;
            var record = viewSelector.getRecord();
            if(record !== null){
                var listFeature = record.data.listFeatures;
                if(Ext.isDefined(listFeature) && listFeature !== ''){
                    for(var i = 0; i < listFeature.length; i++){
                        var index = store.find('idWellFeature', listFeature[i].idWellFeature);
                        if(index >= 0){
                            selectModel.select(index, true);
                        }
                    }
                }
            }
        }
    },
            
    autoMappingFunction: function(grid, window, record){
        var me = this;
        Ext.BaseAjax.request({
            url:'rest/wellTypeByState/getById.htm',
            method: 'GET',
            params:{
                idWellTypeByState: record.raw.idWellTypeByState
            },
            success: function(response, options){
                var data = Ext.JSON.decode(response.responseText);
                me.setFormData(window, data);
            }
        });
    },
    
    setFormData: function(window, data){
        var me = this;
        var wtbs = data.wellTypeByState;
        var formPanel = window.down('form');
        if(formPanel!==null){
            me.setDataInForm(formPanel, wtbs);
            formPanel.query('[name=idWellState]')[0].setValue(wtbs.wellState.idWellState);
            var grid = formPanel.queryById('updateExtractionTypeDetail');
            if(grid!==null){
                var store = grid.store;
                store.loadData(data.listExtractionType, false);
            }
        }
    }
}); 

