/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.CriteriaGroupController', {
   extend: 'sisprod.controller.Base',
   stores : ['CriteriaGroupStore'],
   models : ['CriteriaGroupModel', 'CriteriaFactorModel', 'CriteriaLevelModel', 'CriteriaFactorLevelModel'],
   entityName: 'CriteriaGroup',
   refs: [{ref: 'listCriteriaGroup', selector: 'listCriteriaGroup'}],
   views : ['CriteriaGroup.ListCriteriaGroup'],
   
   requires: [
       'sisprod.controller.Base',
       'sisprod.model.CriteriaGroupModel',
       'sisprod.store.CriteriaGroupStore',
       'sisprod.model.CriteriaFactorModel',
       'sisprod.model.CriteriaLevelModel',
       'sisprod.model.CriteriaFactorLevelModel',
       'sisprod.view.CriteriaGroup.ListCriteriaGroup'
   ],
   
   deleteOptions: {
       deleteKeys: ['idCriteriaGroup'],
       caption: 'criteriaGroupName'
   },
   
   messages: {
       alertCaption: 'Message',
       emptyFactors: 'Add one factor at least!',
       emptyLevels: 'Add one level at least!',
       savedSuccessfuly: 'Data saved successfuly!',
       savedFailed: 'an error occurred during saving data. {0}'
   },
   
   init : function(){
//        Ext.create('Ext.data.Store',{
//            storeId: 'criteriaFactorsGridStore',
//            model: 'sisprod.model.CriteriaFactorModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        }); 
//        Ext.create('Ext.data.Store',{
//            storeId: 'criteriaLevelsGridStore',
//            model: 'sisprod.model.CriteriaLevelModel',
//            proxy: {
//                type: 'memory',
//                reader: {
//                    type: 'json'
//                }
//            }
//        });  
       
        this.control({
           'listCriteriaGroup button[action=activate]':{
               click: this.activate
           },
            
           'listCriteriaGroup button[action=add]':{
               click: this.showAdd
           },
           
           'listCriteriaGroup button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listCriteriaGroup dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listCriteriaGroup button[action=delete]': {
               click: this.destroy
           },
           
           'listCriteriaGroup button[action=print]': {
               click: this.showPrint
           },
           
           'listCriteriaGroup button[action=showFactorDescriptions]': {
               click: this.showFactorDescriptions
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addCriteriaGroup': {
               close: this.onCloseWindow
           },
           
           'updateCriteriaGroup': {
               close: this.onCloseWindow
           },
           
           'addCriteriaGroup button[action=save]': {
               click: this.saveEntity
           },
           
           'updateCriteriaGroup button[action=save]': {
               click: this.saveEntity
           },
           
           'criteriaFactorLevel combobox[id=idCriteriaFactor]': {
               change: this.onSelectCriteriaFactor
           },
           
           'criteriaFactorLevel button[action=save]': {
               click: this.saveFactorDescriptions
           },
           
           'criteriaFactorLevel': {
               close: this.onCloseDescriptionWindow
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListCriteriaGroup();
        return tabGrid.getGridPanel();
    },
            
    onCloseWindow: function(panel, eventOptions){
//        var factorsStore;
//        var factorsStore = panel.down('#criteriaFactorsGrid').getStore();
//        var factorsStore = Ext.StoreManager.lookup('criteriaFactorsGridStore');
//        var levelsStore = Ext.StoreManager.lookup('criteriaLevelsGridStore');
//        if(Ext.isDefined(factorsStore) && factorsStore!==null) factorsStore.loadData([], false);
//        if(Ext.isDefined(levelsStore) && levelsStore!==null) levelsStore.loadData([], false);
    },
    
    onCloseDescriptionWindow: function(){
        var store = Ext.StoreManager.lookup('criteriaFactorLevelStore');
        if(Ext.isDefined(store) && store!==null) store.loadData([], false);
    },
            
    beforeSaveEntity: function(window, form, values, jsonData){
        var me = this;
        var factorsGrid, levelsGrid;
        factorsGrid = form.down('#addCriteriaFactorsGrid');
        levelsGrid = form.down('#addCriteriaLevelsGrid');
        if(!Ext.isDefined(factorsGrid) || factorsGrid===null) factorsGrid = form.down('#updateCriteriaFactorsGrid');
        if(!Ext.isDefined(levelsGrid) || levelsGrid===null) levelsGrid = form.down('#updateCriteriaLevelsGrid');
        var factorsStore = factorsGrid.store;
        var levelsStore = levelsGrid.store;
        if(factorsStore.getCount()===0){
            Ext.Msg.alert(me.messages.alertCaption, me.messages.emptyFactors);
            return false;
        }
        if(levelsStore.getCount()===0){
            Ext.Msg.alert(me.messages.alertCaption, me.messages.emptyLevels);
            return false;
        }

        var factorsDetails = new Array(), levelsDetails = new Array();
        for(var i=0;i<factorsStore.getCount();i++)
            factorsDetails.push(factorsStore.getAt(i).data);
        for(var i=0;i<levelsStore.getCount();i++)
            levelsDetails.push(levelsStore.getAt(i).data);
        values.factors = Ext.JSON.encode(factorsDetails);
        values.levels = Ext.JSON.encode(levelsDetails);
        return true;
    },
            
    autoMappingFunction: function(grid, window, record){
        var me = this;
        Ext.BaseAjax.request({
            url:'rest/criteriaGroup/getCompleteById.htm',
            params:{
                idCriteriaGroup: record.raw.idCriteriaGroup
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                me.setFormData(window, data);
            }
        });
    },
    
    setFormData: function(window, data){
        var me = this;
        var criteriaGroup = data.criteriaGroup;
        var formPanel = window.down('form');
        if(formPanel!==null){
            me.setDataInForm(formPanel, criteriaGroup);
            var factorsGrid = formPanel.queryById('updateCriteriaFactorsGrid');
            var levelsGrid = formPanel.queryById('updateCriteriaLevelsGrid');
            if(factorsGrid !== null){
                var store = factorsGrid.getStore();
//                store.loadData(data.criteriaGroupFactors, false);
                //
                store.removeAll();
                Ext.Array.each(data.criteriaGroupFactors, function(value, index, itself){
                    var model = Ext.create('sisprod.model.CriteriaFactorModel',
                    {
                        idCriteriaFactor: value['idCriteriaFactor'],
                        criteriaFactorName: value['criteriaFactorName'],
                        criteriaFactorAcronym: value['criteriaFactorAcronym']
                    });
                    store.insert(store.getCount(), model);
                });
            }
            if(levelsGrid !== null){
                var store = levelsGrid.getStore();
//                store.loadData(data.criteriaGroupLevels, false);
                store.removeAll();
                Ext.Array.each(data.criteriaGroupLevels, function(value, index, itself){
                    var model = Ext.create('sisprod.model.CriteriaLevelModel',
                    {
                        idCriteriaLevel: value['idCriteriaLevel'],
                        idCriteriaGroup: value['idCriteriaGroup'],
                        criteriaLevelName: value['criteriaLevelName'],
                        criteriaLevelValue: value['criteriaLevelValue'],
                        criteriaLevelOrder: value['criteriaLevelOrder']
                    });
                    store.insert(store.getCount(), model);
                });
            }
        }
    },
    
    showFactorDescriptions: function(button, event){
        var me = this;
        var grid = this.getGridForEntity();
        if(grid === undefined || grid === null){
            Ext.Error.raise('There´s no grid for this view. Redefined getGridForEntity for ' + this.$className +'!');
            return;
        }
    	var record = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(record)){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
        var data = record.raw;
        var window = Ext.create('sisprod.view.CriteriaFactorLevel.CriteriaFactorLevel',{
            idCriteriaGroup: data['idCriteriaGroup']
        });
        window.show();
    },
            
    onSelectCriteriaFactor: function(combobox, newValue, oldValue, options){
        var me = this;
        if(newValue == null) return;
        var form = combobox.up("form");
        var criteriaGroupInput = form.queryById("idCriteriaGroup");
        var grid = form.queryById("cflDescriptionGrid");
        var idCriteriaGroup = criteriaGroupInput.getValue();
        Ext.BaseAjax.request({
            url:'rest/criteriaFactorLevel/getAllByCriteriaGroupAndFactor.htm',
            params:{
                idCriteriaGroup: idCriteriaGroup,
                idCriteriaFactor: newValue
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                var store = grid.getStore();
//                store.loadData(data, false);
                me.loadData(store, data);
            }
        });
    },
    
    loadData: function(store, data){
        var modelArray = new Array();
        Ext.Object.each(data, function(key, data, myself){
            var row = Ext.create('sisprod.model.CriteriaFactorLevelModel',
            {
                idCriteriaFactorLevel: data['idCriteriaFactorLevel'],
                idCriteriaFactor: data['criteriaFactor']['idCriteriaFactor'],
                criteriaFactorName: data['criteriaFactor']['criteriaFactorName'],
                idCriteriaLevel: data['criteriaLevel']['idCriteriaLevel'],
                criteriaLevelName: data['criteriaLevel']['criteriaLevelName'],
                description: data['description']
            });
            modelArray.push(row);
        });
        store.loadData(modelArray, false);
    },
            
    saveFactorDescriptions: function(button, event, options){
        var me = this;
        var form = button.up("form");
        var formPanel = form.getForm();
        if(formPanel.isValid()){
            var values = formPanel.getValues();
            var grid = form.queryById('cflDescriptionGrid');
            var store = grid.store;
            if(store.getCount()===0){
                Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.addDetailAlert);
                return;
            }
            else{
                var descriptions = new Array();
                for(var i=0;i<store.getCount();i++)
                    descriptions.push(store.getAt(i).data);
                values.descriptions = Ext.JSON.encode(descriptions);
            }
            Ext.BaseAjax.request({
                url: 'rest/criteriaFactorLevel/updateCriteriaFactorLevels.htm',
                method: "POST",
                params: values,
                success: function(response, options){
                    var responseData = Ext.decode(response.responseText);
                    if(responseData.success)
                        Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.savedSuccessfuly);
                    else{
                        var message = (Ext.isDefined(responseData.message) && responseData.message !== null)?responseData.message:"";
                        Ext.Msg.alert(me.controllerMessages.alertMessage, Ext.String.format(me.messages.savedFailed, message));
                    }
                }
            });
        } else return;
    }
});

