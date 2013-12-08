/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.PositionController', {
   extend: 'sisprod.controller.Base',
   stores : ['PositionStore'],
   models : ['PositionModel'],
   entityName: 'Position',
   refs: [{ref: 'listPosition', selector: 'listPosition'}],
   views : ['Position.ListPosition'],
   
   requires: [
       'sisprod.store.PositionStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idPosition'],
       caption: 'positionName'
   },
   
   init : function(){
        this.control({
           'listPosition button[action=activate]':{
               click: this.activate
           },
            
           'listPosition button[action=add]':{
               click: this.showAdd
           },
           
           'listPosition button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listPosition dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listPosition button[action=delete]': {
               click: this.destroy
           },
           
           'listPosition button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addPosition button[action=save]': {
               click: this.saveEntity
           },           
           'updatePosition button[action=save]': {
               click: this.saveEntity
           },
           
           'listPosition button[action=importPosition]': {
               click: this.importPosition
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListPosition();
        return tabGrid.getGridPanel();
    },
            
    importPosition : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/position/importExternalPosition.htm',
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

