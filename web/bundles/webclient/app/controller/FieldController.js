/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.FieldController', {
   extend: 'sisprod.controller.Base',
   stores : ['FieldStore'],
   models : ['FieldModel'],
   entityName: 'Field',
   refs: [{ref: 'listField', selector: 'listField'}],
   views : ['Field.ListField'],
   
   requires: [
       'sisprod.store.FieldStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idField'],
       caption: 'fieldName'
   },
   
   init : function(){
        this.control({
           'listField button[action=activate]':{
               click: this.activate
           },
           'listField button[action=add]':{
               click: this.showAdd
           },
           
           'listField button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listField dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listField button[action=delete]': {
               click: this.destroy
           },
           
           'listField button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addField button[action=save]': {
               click: this.saveEntity
           },
           
           'addField button[id=geoFormationsAddButton],updateField button[id=geoFormationsAddButton]':{
               click: this.onGeoFormationAddButton        
           },
           
           'updateField button[action=save]': {
               click: this.saveEntity
           },
           'updateField hiddenfield[id=idField]': {
               change : this.setGeoFormationValues
           }
       });
       this.callParent(arguments);
    },
      
    onGeoFormationAddButton:function(){
        this.showSingleAdditonWindow('GeoFormation');
    },           
    setGeoFormationValues:function(){
        var keys=new Array();
        var cboGeoFormation = Ext.getCmp("geoFormations");
        var varIdField=Ext.getCmp("idField").getValue();
        Ext.BaseAjax.request({
            url: 'rest/fields/listGeoFormationByField.htm',
            method: 'GET',
            params: {idField: varIdField},
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                if(Ext.isDefined(data) && data!==null){
                    data=data.data;
                    for(var i=0;i<data.length;i++){
                        keys.push(data[i].geoFormation.idGeologicFormation)
                    }
                    
                }               
                cboGeoFormation.setValue(keys);
            }
        });
    },     
    getGridForEntity: function(){
        var tabGrid = this.getListField();
        return tabGrid.getGridPanel();
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

