/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellFeatureController', {
   extend: 'sisprod.controller.Base',
   stores : ['WellFeatureStore', 'FeatureTypeStore', 'MeasureUnitAll'],
   models : ['WellFeatureModel'],
   entityName: 'WellFeature',
   refs: [{ref: 'listWellFeature', selector: 'listWellFeature'}],
   views : ['WellFeature.ListWellFeature'],
   
   requires: [
       'sisprod.store.WellFeatureStore',
       'sisprod.store.FeatureTypeStore',
       'sisprod.store.MeasureUnitAll'
   ],
   
   messages: {
       msgAlertValueDuplicate: 'This value has already been added to the dropdown list',
       msgAlertNoInputValues: 'Enter at least one value for the dropdown',
       msgEmpty: 'Enter Value',
       msgSelectForDelete: 'Select value to eliminate'
   },
   
   deleteOptions: {
       deleteKeys: ['idWellFeature'],
       caption: function(data){
           return data['wellFeatureName'];
       }
   },
   
   init : function(){
        Ext.create('sisprod.store.ItemWellFeatureListStore', {
            storeId : 'itemWellFeatureListStore'
        });
        this.control({
           'listWellFeature button[action=activate]':{
               click: this.activate
           },
           
           'listWellFeature button[action=add]':{
               click: this.showAdd
           },
           
           'listWellFeature button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listWellFeature dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listWellFeature button[action=delete]': {
               click: this.destroy
           },
           
           'listWellFeature button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addWellFeature button[action=save]': {
               click: this.saveEntity
           },
           
           'updateWellFeature button[action=save]': {
               click: this.saveEntity
           },
           
           'addWellFeature': {
               beforeshow: this.beforeShow
           },
           
           'addWellFeature combo[id=idFeatureType]':{
               select: this.showViewListItems
           },
           
           'updateWellFeature combo[id=idFeatureType]':{
               select: this.showViewListItems
           },
           
           'addWellFeature button[action=addItem]':{
               click: this.addItem
           },
           
           'updateWellFeature button[action=addItem]':{
               click: this.addItem
           },
           
           'addWellFeature button[action=removeItem]':{
               click: this.removeItem
           },
           
           'updateWellFeature button[action=removeItem]':{
               click: this.removeItem
           },
           
           'addWellFeature button[id=idMeasureUnitAddButton], updateWellFeature button[id=idMeasureUnitAddButton]':{
               click: this.onMeasureUnitAddButton
           },
           
           'updateWellFeature':{
               beforeshow: this.beforeShow
               //aftershow: this.loadItemWellFeatures
           }
          
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListWellFeature();
        return tabGrid.getGridPanel();
    },
            
    beforeShow: function(){
        var store = Ext.StoreManager.lookup('itemWellFeatureListStore');
        store.removeAll();
    },
            
    loadItemWellFeatures: function(){
        var cboFeatureType = Ext.getCmp("idFeatureType");
        var featureType = cboFeatureType.findRecordByValue(cboFeatureType.getValue()).raw;
        var itemsWellFeatureGrid = Ext.getCmp('itemWellFeatureGrid');
        if(featureType.xtype == 'combobox'){
            itemsWellFeatureGrid.show();
            var varIdWellFeature = Ext.getCmp("idWellFeature").getValue();
            var store = Ext.StoreManager.lookup('itemWellFeatureListStore');
            store.load({params:{idWellFeature: varIdWellFeature}});
        }
        else{
            itemsWellFeatureGrid.hide();
        }
    },
            
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        //this.loadItemWellFeatures();
    },
            
    showViewListItems: function(){
        var cboFeatureType = Ext.getCmp('idFeatureType');
        var featureType = cboFeatureType.findRecordByValue(cboFeatureType.getValue()).raw;
        var itemsWellFeatureGrid = Ext.getCmp('itemWellFeatureGrid');
        if(featureType === null){
            itemsWellFeatureGrid.hide();
            return;
        }      
        if(featureType.xtype == 'combobox'){
            itemsWellFeatureGrid.show();
        }
        else{
            var store = Ext.StoreManager.lookup('itemWellFeatureListStore');
            store.removeAll();
            itemsWellFeatureGrid.hide();
        }
    },
            
    addItem: function(){
        var txtItemValue = Ext.getCmp('itemValue');
        var value = txtItemValue.getValue();
        if(value.trim() !== ''){
            var store = Ext.StoreManager.lookup('itemWellFeatureListStore');
            var found = store.find('itemValue', value);
            if(found < 0){   
                store.add({
                    idItemWellFeatureList: '',
                    itemValue : value
                });
                txtItemValue.setValue('');
                txtItemValue.focus();
            }
            else{
                showAlertMessage(this.messages.msgAlertValueDuplicate); 
            }
        }
        else{
            showAlertMessage(this.messages.msgEmpty);
        }
    },
            
    removeItem: function(){
        var grid =Ext.getCmp('itemWellFeatureGrid');
        var record=grid.getSelectionModel().getSelection()[0];
        if(Ext.isDefined(record)){
            var store=Ext.StoreManager.lookup('itemWellFeatureListStore');
            store.remove(record);
        }else{
            showAlertMessage(this.messages.msgSelectForDelete);
        }
    },
    
    beforeSaveEntity:function(win, form, values){
        var items = new Array();
        var success = false;
        if(this.extraValid()){
            var store = Ext.StoreManager.lookup('itemWellFeatureListStore');
            for(var i=0;i<store.getCount();i++){
                var record=store.getAt(i).raw;
                items.push({idItemWellFeatureList: record.idItemWellFeatureList, itemValue: record.itemValue});
            }
            values.items = JSON.stringify(items);
            if (!Ext.isDefined(values.updateInWellTest)) values.updateInWellTest=false;
            if (!Ext.isDefined(values.updateInWellService)) values.updateInWellService=false;
            success = true;
        }
        return success;
    },  
            
    extraValid: function(){
        var success = true;
        var store = Ext.StoreManager.lookup('itemWellFeatureListStore');
        var cboFeatureType = Ext.getCmp('idFeatureType');
        var featureType = cboFeatureType.findRecordByValue(cboFeatureType.getValue()).raw;
        if(featureType.xtype == 'combobox'){
            if(store.getCount() === 0){
                showAlertMessage(this.messages.msgAlertNoInputValues);
                success = false;
            }
        }
        return success;
    },
            
    onMeasureUnitAddButton: function(){
        this.showSingleAdditonWindow('MeasureUnit');
    }        
});

