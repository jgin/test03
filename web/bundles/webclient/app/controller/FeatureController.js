/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.FeatureController', {
   extend: 'sisprod.controller.Base',
   stores : ['FeatureStore'],
   models : ['FeatureModel'],
   entityName: 'Feature',
   refs: [{ref: 'listFeature', selector: 'listFeature'}],
   views : ['Feature.ListFeature'],
   
   requires: [
       'sisprod.store.FeatureStore'
   ],   
   deleteOptions: {
       deleteKeys: ['idFeature'],
       caption: 'featureName'
   },
   messages: {
        duplicateValueError: 'This value has already been added to the list',
        noValueToAddError: 'Type a Value',
        noValueSelectToRemoveError: 'select the value to remove',
        noValueOnListError: 'Add at least one value to the list'
    },
   init : function(){
        Ext.create('sisprod.store.ItemFeatureListStore', {
            storeId : 'itemFeatureListStore'
        });
        this.control({
           'listFeature button[action=activate]':{
               click: this.activate
           },
           'listFeature button[action=add]':{
               click: this.showAdd
           },
           
           'listFeature button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listFeature dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listFeature button[action=delete]': {
               click: this.destroy
           },
           
           'listFeature button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addFeature button[action=save]': {
               click: this.saveEntity
           },
           
           'updateFeature button[action=save]': {
               click: this.saveEntity
           },
           
           'addFeature': {
               beforeshow: this.beforeShow
           },
           
           'addFeature button[id=idMeasureUnitAddButton],updateFeature button[id=idMeasureUnitAddButton]':{
               click: this.onMeasureUnitAddButton
           },
           'addFeature combo[id=idFeatureType]':{
               change: this.showViewListItems
           },
           'updateFeature combo[id=idFeatureType]':{
               change: this.showViewListItems
           },
           
           'addFeature button[action=addItem]':{
               click: this.addItem
           },
           
           'updateFeature button[action=addItem]':{
               click: this.addItem
           },
           
           'addFeature button[action=removeItem]':{
               click: this.removeItem
           },
           
           'updateFeature button[action=removeItem]':{
               click: this.removeItem
           },
           
           'updateFeature':{
               beforeshow: this.beforeShow
           }
          
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListFeature();
        return tabGrid.getGridPanel();
    },
    onMeasureUnitAddButton: function(){
        this.showSingleAdditonWindow('MeasureUnit');
    },        
    beforeShow: function(){
        var store = Ext.StoreManager.lookup('itemFeatureListStore');
        store.removeAll();
    },
            
    loadItemFeatures: function(){
        var cboFeatureType = Ext.getCmp("idFeatureType");
        var featureType = cboFeatureType.findRecordByValue(cboFeatureType.getValue()).raw;
        var itemsFeatureGrid = Ext.getCmp('itemFeatureGrid');
        if(featureType.xtype === 'combobox'){
            itemsFeatureGrid.show();
            var varIdFeature = Ext.getCmp("idFeature").getValue();
            var store = Ext.StoreManager.lookup('itemFeatureListStore');
            store.load({params:{idFeature: varIdFeature}});
        }
        else{
            itemsFeatureGrid.hide();
        }
    },
            
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboFeatureType = varForm.query("[name=idFeatureType]")[0];
        var cboMeasureUnit = varForm.query("[name=idMeasureUnit]")[0];
        
        var idFeatureType = record.raw.featureType.idFeatureType;
        var idMeasureUnit;
        if(record.raw.measureUnit===null){
            idMeasureUnit=0;
        }else{
            idMeasureUnit=record.raw.measureUnit.idMeasureUnit;
        } 
        
        if(Ext.isDefined(cboFeatureType) && Ext.isDefined(cboMeasureUnit)){
            cboFeatureType.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboFeatureType.select(idFeatureType); 
                    this.loadItemFeatures();
                }
            });
            cboMeasureUnit.getStore().load({
                       scope: this,
                       callback: function(records, operation, success){
                           cboMeasureUnit.select(idMeasureUnit);
                       }
            }); 
        } 
    },
            
    showViewListItems: function(){
        var cboFeatureType = Ext.getCmp('idFeatureType');
        var featureType = cboFeatureType.findRecordByValue(cboFeatureType.getValue()).raw;
        var itemsFeatureGrid = Ext.getCmp('itemFeatureGrid');
        if(featureType === null){
            itemsFeatureGrid.hide();
            return;
        }      
        if(featureType.xtype === 'combobox'){
            itemsFeatureGrid.show();
        }
        else{
            var store = Ext.StoreManager.lookup('itemFeatureListStore');
            store.removeAll();
            itemsFeatureGrid.hide();
        }
    },
            
    addItem: function(){
        var txtItemValue = Ext.getCmp('itemValue');
        var value = txtItemValue.getValue();
        if(value.trim() !== ''){
            var store = Ext.StoreManager.lookup('itemFeatureListStore');
            var found = store.find('itemValue', value);
            if(found < 0){   
                store.add({
                    idItemFeatureList: '',
                    itemValue : value
                });
                txtItemValue.setValue('');
                txtItemValue.focus();
            }
            else{
                showAlertMessage(this.messages.duplicateValueError); 
            }
        }
        else{
            showAlertMessage(this.messages.noValueToAddError);
        }
    },
            
    removeItem: function(){
        var grid =Ext.getCmp('itemFeatureGrid');
        var record=grid.getSelectionModel().getSelection()[0];
        if(Ext.isDefined(record)){
            var store=Ext.StoreManager.lookup('itemFeatureListStore');
            store.remove(record);
        }else{
            showAlertMessage(this.messages.noValueSelectToRemoveError);
        }
    },
    
    beforeSaveEntity:function(win, form, values){
        var items = new Array();
        var success = false;
        if(values.idMeasureUnit===""){
            values.idMeasureUnit=-1;
        }
        if(this.extraValid()){
            var store = Ext.StoreManager.lookup('itemFeatureListStore');
            for(var i=0;i<store.getCount();i++){
                var record=store.getAt(i).raw;
                items.push({idItemFeatureList: record.idItemFeatureList, itemValue: record.itemValue});
            }
            values.items = JSON.stringify(items);
            success = true;
        }
        return success;
    },  
            
    extraValid: function(){
        var success = true;
        var store = Ext.StoreManager.lookup('itemFeatureListStore');
        var cboFeatureType = Ext.getCmp('idFeatureType');
        var featureType = cboFeatureType.findRecordByValue(cboFeatureType.getValue()).raw;
        if(featureType.xtype === 'combobox'){
            if(store.getCount() === 0){
                showAlertMessage(this.messages.noValueOnListError);
                success = false;
            }
        }
        return success;
    },
    afterSaveEntity: function(win, form, response, options){
        response=Ext.JSON.decode(response.responseText);
        if(Ext.isDefined(response.success)){
            if(response.success===false)
                Ext.Msg.alert(this.controllerMessages.alertMessage,response.message);
            else
                win.close();
        }
        else
            win.close();
    }    
});

