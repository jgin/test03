/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
    Ext.define('sisprod.controller.EquipmentTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['EquipmentTypeStore'],
   models : ['EquipmentTypeModel'],
   entityName: 'EquipmentType',
   refs: [{ref: 'listEquipmentType', selector: 'listEquipmentType'}],
   views : ['EquipmentType.ListEquipmentType'],
   
   requires: [
       'sisprod.store.EquipmentTypeStore'
   ],
   messages: {
        duplicateFeatureError: 'This Feature has already been added',
        noFeatureToAddError: 'Select a Feature',
        noFeatureSelectToRemoveError: 'Select the Feature to remove',
        noFeatureOnListError: 'Add at least one Feature'
    },
   deleteOptions: {
       deleteKeys: ['idEquipmentType'],
       caption: 'equipmentTypeName'
   },
   
   init : function(){
         Ext.create('Ext.data.Store',{
            storeId: 'featureStoreGrid',
            fields: ['idFeature','featureName'],
            idProperty:'idFeature',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    idProperty: 'idFeature',
                    root: 'data'
                }
            }
        });
        this.control({
           'listEquipmentType button[action=activate]':{
               click: this.activate
           },
           'listEquipmentType button[action=add]':{
               click: this.showAdd
           },
           
           'listEquipmentType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listEquipmentType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listEquipmentType button[action=delete]': {
               click: this.destroy               
           },
           
           'listEquipmentType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addEquipmentType': {
               beforeshow: this.beforeShow           
           },
           'addEquipmentType button[action=save]': {
               click: this.saveEntity               
           },
           'addEquipmentType button[id=savefeature]': {
               click: this.addFeature
           },
           'addEquipmentType button[id=removefeature]': {
               click: this.removeFeature
           },
           'updateEquipmentType button[id=savefeature]': {
               click: this.addFeature
           },
           'updateEquipmentType button[id=removefeature]': {
               click: this.removeFeature
           },
           'updateEquipmentType': {
               beforeshow: this.beforeShow, 
               afterrender: this.setFeaturesOnGrid
           },
           'updateEquipmentType button[action=save]': {
               click: this.saveEntity
           },
           'listEquipmentType button[action=importEquipmentType]': {
               click: this.importEquipmentType
           }
       });
       this.callParent(arguments);
    },
    
    setFeaturesOnGrid:function(){
        var keys=new Array();
        var varIdEquipmentType=Ext.getCmp("idEquipmentType").getValue();
        Ext.BaseAjax.request({
            url: 'rest/equipmentTypes/listFeatureByEquipmentType.htm',
            method: 'GET',
            params: {idEquipmentType: varIdEquipmentType},
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                if(Ext.isDefined(data) && data!==null){
                    data=data.data;
                    var store=Ext.StoreManager.lookup('featureStoreGrid');
                    for(var i=0;i<data.length;i++){
                        store.add({
                            idFeature:data[i].feature.idFeature,
                            featureName: data[i].feature.featureName
                        }); 
                    }
                    
                }               
            }
        });
    },     
    
    beforeSaveEntity:function(win, form, values){
        var idFeatures=new Array();
        var success=false;
        var store=Ext.StoreManager.lookup('featureStoreGrid');
        if(this.extraValid()){
            for(var i=0;i<store.getCount();i++){
                var record=store.getAt(i);
                idFeatures.push(record.raw.idFeature);
            }
            values.idFeatures=idFeatures;
            success=true;
        }
        return success;
    },        
    getGridForEntity: function(){
        var tabGrid = this.getListEquipmentType();
        return tabGrid.getGridPanel();
    },
    beforeShow:function(){
        var store=Ext.StoreManager.lookup('featureStoreGrid');
        store.removeAll();
    },    
    addFeature:function (){
            var combo=Ext.getCmp('cboFeature');
            var value=Ext.getCmp('cboFeature').getValue();
            var record = combo.findRecordByValue(value);            
            if(record){
                var store=Ext.StoreManager.lookup('featureStoreGrid');
                var pos=store.find('idFeature',value);
                if(pos<0){
                    store.add({
                        idFeature:value,
                        featureName: record.raw.featureName
                    });       
                }else{
                    Ext.Msg.alert("",this.messages.duplicateFeatureError);                    
                }
            }else{
                Ext.Msg.alert("",this.messages.noFeatureToAddError);
            }    
            combo.clearValue();
   },
    removeFeature: function(){
        var grid =Ext.getCmp('featureGrid');
        var record=grid.getSelectionModel().getSelection()[0];
        if(Ext.isDefined(record)){
            var store=Ext.StoreManager.lookup('featureStoreGrid');
            var pos=store.find('idFeature',record.raw.idFeature);            
            store.removeAt(pos);
        }else{
            Ext.Msg.alert("",this.messages.noFeatureSelectToRemoveError);
        }
    },
    extraValid: function(){
        var success = true;
        var store = Ext.StoreManager.lookup('featureStoreGrid');
        if(store.getCount() === 0){
            Ext.Msg.alert("",this.messages.noFeatureOnListError);
            success = false;
        }
        return success;
    },
    afterSaveEntity: function(win, form, response, options){
        response=Ext.JSON.decode(response.responseText);
        if(Ext.isDefined(response.success)){
            if(response.success==false)
                Ext.Msg.alert(this.controllerMessages.alertMessage,response.message);
            else
                win.close();
        }
        else
            win.close();
    },
    importEquipmentType : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/equipmentTypes/importEquipmentTypeFromSisman.htm',
            method: 'GET',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);                
                if(objResponse.success == true){
                    showAlertMessage(objResponse.message);
                    var grid =me.getGridForEntity();
                    var store = grid.getStore();
                    store.reload();
                } else {                    
                    showAlertMessage(objResponse.message);    
                }
            }
        });
    }
});

