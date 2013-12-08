/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.TankController', {
   extend: 'sisprod.controller.Base',
   stores : ['TankStore'],
   models : ['TankModel'],
   entityName: 'Tank',
   refs: [{ref: 'listTank', selector: 'listTank'}],
   views : ['Tank.ListTank'],
   
   requires: [
       'sisprod.store.TankStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idTank'],
       caption: 'tankName'
   },
   
   init : function(){
        this.control({
           'listTank button[action=activate]':{
               click: this.activate
           },
           'listTank button[action=add]':{
               click: this.showAdd
           },
           
           'listTank button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listTank dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listTank button[action=delete]': {
               click: this.destroy
           },
           
           'listTank button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addTank button[action=save]': {
               click: this.verifyConfigParam
           },
           'addTank button[id=idTankTypeAddButton],updateTank button[id=idTankTypeAddButton]':{
               click: this.onTankTypeAddButton
           },
           'addTank button[id=idAlternativeTankTypeAddButton],updateTank button[id=idAlternativeTankTypeAddButton]':{
               click: this.onAlternativeTankTypeAddButton
           },
           
           'updateTank button[action=save]': {
               click: this.verifyConfigParam
           },
           'addTank combo[id=idLot]':{
               select: this.reloadLocation
               //change : this.renderUpdate
           },
           'updateTank combo[id=idLot]':{
               select : this.reloadLocation
           }
       });
       this.callParent(arguments);
    },
    reloadLocation: function() {
        var cboLocation= Ext.getCmp("idLocation");
        cboLocation.clearValue();
        cboLocation.getStore().load();
    },   
    verifyConfigParam: function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/tanks/verifyConfigParam.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success == true){
                    me.saveEntity(button);
                }
                    else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    },         
    beforeSaveEntity:function(win, form, values){
        if(values.adjustmentFactor==""){
            values.adjustmentFactor="0";
        }
        if(values.maximumCapacity==""){
            values.maximumCapacity="0";
        }
        if(values.minimumCapacity==""){
            values.minimumCapacity="0";
        }
        if(values.heightInFeet==""){
            values.heightInFeet="0";
        }
        if(values.diameterInFeet==""){
            values.diameterInFeet="0";
        }
        if(values.idAlternativeTankType==""){
            values.idAlternativeTankType=-1;
        }
        if(values.idLocation==""){
            values.idLocation=-1;
        }
        return true;
    },         
    getGridForEntity: function(){
        var tabGrid = this.getListTank();
        return tabGrid.getGridPanel();
    },
    onTankTypeAddButton: function(){
//        var cbo= Ext.getCmp("idTankType");
//        cbo.clearValue();
        this.showSingleAdditonWindow('TankType');
    },         
    onAlternativeTankTypeAddButton: function(){
//        var cbo= Ext.getCmp("idAlternativeTankType");
//        cbo.clearValue();
        this.showSingleAdditonWindow('AlternativeTankType');
    },         
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboLocation= varForm.query("[name=idLocation]")[0];
        var cboTankType= varForm.query("[name=idTankType]")[0];
        var cboAlternativeTankType= varForm.query("[name=idAlternativeTankType]")[0];
        var dateField= varForm.query("[name=startupDateField]")[0];
        var cboLot= varForm.query("[name=idLot]")[0];
        if(record.raw.startupDate!=null){
            dateField.setValue(record.raw.startupDate);
        }
        var idTankType = record.raw.tankType.idTankType;
        var idLot=0;
        if(record.raw.lot!==null)
            idLot= record.raw.lot.idLot;
        var idAlternativeTankType;
        if(record.raw.alternativeTankType==null){
            idAlternativeTankType=0;
        }else{
            idAlternativeTankType=record.raw.alternativeTankType.idAlternativeTankType;
        } 
        var idLocation;
        if(record.raw.location==null){
            idLocation=0;
        }else{
            idLocation=record.raw.location.idLocation;
        }         
        if(Ext.isDefined(cboTankType) && Ext.isDefined(cboAlternativeTankType) && Ext.isDefined(cboLocation) ){
            cboLot.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboLot.select(idLot);
                }
            });
            cboTankType.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboTankType.select(idTankType);
                }
            });
            cboAlternativeTankType.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cboAlternativeTankType.select(idAlternativeTankType);
                }
            });
//            cboLocation.getStore().load({
//                scope: this,
//                callback: function(records, operation, success){
//                    cboLocation.select(idLocation);
//                }
//            });
            if(record.raw.location!==null){
            cboLocation.setValue(new Ext.create(sisprod.getApplication().getModelName('Location'),{
                idLocation: record.raw.location.idLocation,
                locationName: record.raw.location.locationName
            }));
            }
        }  
                
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
    } 
});

