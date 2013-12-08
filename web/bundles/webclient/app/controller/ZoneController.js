/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ZoneController', {
   extend: 'sisprod.controller.Base',
   stores : ['ZoneStore'],
   models : ['ZoneModel'],
   entityName: 'Zone',
   refs: [{ref: 'listZone', selector: 'listZone'}],
   views : ['Zone.ListZone'],
   
   requires: [
       'sisprod.store.ZoneStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idZone'],
       caption: 'zoneName'
   },
   
   init : function(){
        this.control({
           'listZone button[action=activate]':{
               click: this.activate
           },
           'listZone button[action=add]':{
               click: this.showAdd
           },
           
           'listZone button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listZone dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listZone button[action=delete]': {
               click: this.destroy
           },
           
           'listZone button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addZone button[action=save]': {
               click: this.saveEntity
           },
           
           'updateZone button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
    
    autoMappingFunction: function(grid, form, record){ 
        var me = this; 
        var formPanel = form.down('form'); 
        formPanel.loadRecord(record); 
        var cmbLot = formPanel.query("[name=idLot]")[0]; 
        if(Ext.isDefined(cmbLot)){ 
            if(Ext.isDefined(record.raw.lot.idLot) && Ext.isDefined(record.raw.lot.idLot)) 
                cmbLot.select(record.raw.lot.idLot); 
        } 
    },
    getGridForEntity: function(){
        var tabGrid = this.getListZone();
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

