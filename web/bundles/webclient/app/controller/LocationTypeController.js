/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.LocationTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['LocationTypeStore'],
   models : ['LocationTypeModel'],
   entityName: 'LocationType',
   refs: [{ref: 'listLocationType', selector: 'listLocationType'}],
   views : ['LocationType.ListLocationType'],
   
   requires: [
       'sisprod.store.LocationTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idLocationType'],
       caption: 'locationTypeName'
   },
   
   init : function(){
        this.control({
           'listLocationType button[action=activate]':{
               click: this.activate
           },
           'listLocationType button[action=add]':{
               click: this.showAdd
           },
           
           'listLocationType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listLocationType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listLocationType button[action=delete]': {
               click: this.destroy
           },
           
           'listLocationType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addLocationType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateLocationType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListLocationType();
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

