/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.GeoFormationController', {
   extend: 'sisprod.controller.Base',
   stores : ['GeoFormationStore'],
   models : ['GeoFormationModel'],
   entityName: 'GeoFormation',
   refs: [{ref: 'listGeoFormation', selector: 'listGeoFormation'}],
   views : ['GeoFormation.ListGeoFormation'],
   
   requires: [
       'sisprod.store.GeoFormationStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idGeologicFormation'],
       caption: 'geoFormationName'
   },
   
   init : function(){
        this.control({
           'listGeoFormation button[action=activate]':{
               click: this.activate
           },
           'listGeoFormation button[action=add]':{
               click: this.showAdd
           },
           
           'listGeoFormation button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listGeoFormation dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listGeoFormation button[action=delete]': {
               click: this.destroy
           },
           
           'listGeoFormation button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addGeoFormation button[action=save]': {
               click: this.saveEntity
           },
           
           'updateGeoFormation button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListGeoFormation();
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

