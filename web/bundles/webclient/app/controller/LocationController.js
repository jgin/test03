
/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.LocationController', {
   extend: 'sisprod.controller.Base',
   stores : ['LocationStore'],
   models : ['LocationModel'],
   entityName: 'Location',
   refs: [{ref: 'listLocation', selector: 'listLocation'}],
   views : [
       'Location.ListLocation',
       'Location.AddLocation',
       'Location.UpdateLocation'
   ],
   messages:{
        locationTypeNoavailableError:"This Location Type Can not Be Registered since this module"
   },
   requires: [
       'sisprod.store.LocationStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idLocation'],
       caption: 'locationName'
   },
   
   init : function(){
        this.control({
           'listLocation button[action=activate]':{
               click: this.activate
           },
           'listLocation button[action=add]':{
               click: this.showAdd
           },
           
           'listLocation button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listLocation dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listLocation button[action=delete]': {
               click: this.destroy
           },
           
           'listLocation button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addLocation button[action=save]': {
               click: this.saveEntity
           },
           
           'updateLocation button[action=save]': {
               click: this.saveEntity
           },
           
           'addLocation combo[id=idLocationType]':{
               select: this.testAdd               
           },
           'addLocation button[id=idLocationTypeAddButton],updateLocation button[id=idLocationTypeAddButton]':{
               click: this.onLocationTypeAddButton        
           },
           'updateLocation combo[id=idLocationType]':{
               select: this.testUpdate
               //change : this.renderUpdate
           },
           'addLocation combo[id=cboLot]':{
               select: this.reloadLocationParent
               //change : this.renderUpdate
           },
           'updateLocation combo[id=cboLot]':{
               select : this.reloadLocationParent
           }
       });
       this.callParent(arguments);
    },
    
    reloadLocationParent: function() {
        var cboLocationParent = Ext.getCmp("cboLocation");
        cboLocationParent.clearValue();
        cboLocationParent.getStore().load();
    },            
   
    mensaje: function(){
    },
    onLocationTypeAddButton:function(){
        this.showSingleAdditonWindow('LocationType');
    },            
    renderUpdate: function(){
        var idLocation = Ext.getCmp("idLocation");
        var cboLocationType = Ext.getCmp("idLocationType");
        var cboLocationParent = Ext.getCmp("cboLocation");
//        var cboLot = Ext.getCmp("cboLot");
        var idLocationParent = cboLocationParent.getValue();
        //cboLocationParent.clearValue();
        cboLocationParent.store.load({params:{idLocationType:Ext.getCmp("idLocationType").getValue(),idLocation:idLocation.getValue()}});
        if(idLocationParent!==0){
            cboLocationParent.setValue(idLocationParent);
        }else
            cboLocationParent.clearValue(); 
        
         
    },        
            
    
    testAdd: function(){
            var combo=Ext.getCmp('cboLocation');
            var comboLocatonType=Ext.getCmp('idLocationType');
            var me=this;
            combo.clearValue();
            Ext.BaseAjax.request({
            url: 'rest/locations/isLocationTypeParam.htm',
            method:"POST",
            async:false,
            params: {idLocationType:comboLocatonType.getValue()},
            success: function(response){
                   var objResponse = Ext.decode(response.responseText);
                   if(objResponse.success===true){
                       Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.locationTypeNoavailableError);
//                       cboLocationParent.clearValue();
//                          comboLocatonType.clearValue();
//                          combo.disable();
                          comboLocatonType.clearValue();
                   }
//                   else{
//                        combo.enable();
//                        combo.clearValue();
//                        combo.store.load({params:{idLocationType:comboLocatonType.getValue(),idLocation:0}});
//                   }
            },
            failure: function(response){
            }
        }); 
        this.reloadLocationParent();
    },
    testUpdate: function(){
        var combo=Ext.getCmp('cboLocation');
        var comboLocatonType=Ext.getCmp('idLocationType');
        var idLocation=Ext.getCmp('idLocation');
        var me =this;
        combo.clearValue();
        Ext.BaseAjax.request({
            url: 'rest/locations/isLocationTypeParam.htm',
            method:"POST",
            async:false,
            params: {idLocationType:comboLocatonType.getValue()},
            success: function(response){
                   var objResponse = Ext.decode(response.responseText);
                   if(objResponse.success===true){
                       Ext.Msg.alert(me.controllerMessages.alertMessage,me.messages.locationTypeNoavailableError);
//                       cboLocationParent.clearValue();
                          comboLocatonType.clearValue();
//                          combo.disable();
//                          combo.clearValue();
                   }
//                   else{
//                        combo.enable();
//                        combo.clearValue();
//                        combo.store.load({params:{idLocationType:comboLocatonType.getValue(),idLocation:idLocation.getValue()}});
//                   }
            },
            failure: function(response){
            }
        }); 
    },
    getGridForEntity: function(){
        var tabGrid = this.getListLocation();
        return tabGrid.getGridPanel();
        
    },
    afterSaveEntity: function(win, form, response, options){
        response=Ext.JSON.decode(response.responseText);
        if(Ext.isDefined(response.messageParent)){
            Ext.Msg.alert(this.controllerMessages.alertMessage,response.messageParent);
        }
        if(Ext.isDefined(response.success)){
            if(response.success===false)
                Ext.Msg.alert(this.controllerMessages.alertMessage,response.message);
            else
                win.close();
        }
        else
            win.close();
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var txtLocationName = Ext.getCmp('locationName');
        var txtLocationAcronym = Ext.getCmp('locationAcronym');
        var cboLocationType = Ext.getCmp('idLocationType');
        var cboLocation = Ext.getCmp('cboLocation');
        var cboLot = Ext.getCmp('cboLot');
        varForm.loadRecord(record);
        Ext.BaseAjax.request({
            url: 'rest/locations/isLocationTypeParam.htm',
            method:"POST",
            async:false,
            params: {idLocationType:record.raw.locationType.idLocationType},
            success: function(response){
                   var objResponse = Ext.decode(response.responseText);
                   if(objResponse.success===true){
                       txtLocationName.setReadOnly(true);
                       txtLocationAcronym.setReadOnly(true);
                       cboLocationType.setReadOnly(true);
                       cboLot.setReadOnly(true);
                   }
            },
            failure: function(response){
            }
        });  
        if(record.raw.locationParent!==null){
            cboLocation.setValue(new Ext.create(sisprod.getApplication().getModelName('Location'),{
                idLocation: record.raw.locationParent.idLocation,
                locationName: record.raw.locationParent.locationName
            }));
        }
        if(record.raw.lot!==null){
            cboLot.setValue(new Ext.create(sisprod.getApplication().getModelName('Lot'),{
                idLot: record.raw.lot.idLot,
                lotName: record.raw.lot.lotName
            }));
        }
    }
});

