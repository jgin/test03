/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.MarkController', {
   extend: 'sisprod.controller.Base',
   stores : ['MarkStore'],
   models : ['MarkModel'],
   entityName: 'Mark',
   refs: [{ref: 'listMark', selector: 'listMark'}],
   views : ['Mark.ListMark'],
   
   requires: [
       'sisprod.store.MarkStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idMark'],
       caption: 'markName'
   },
   
   init : function(){
        this.control({
           'listMark button[action=activate]':{
               click: this.activate
           },
           'listMark button[action=add]':{
               click: this.showAdd
           },
           
           'listMark button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listMark dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listMark button[action=delete]': {
               click: this.destroy
           },
           
           'listMark button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addMark button[action=save]': {
               click: this.saveEntity
           },
           
           'updateMark button[action=save]': {
               click: this.saveEntity
           },
           'listMark button[action=importMark]': {
               click: this.importMark
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListMark();
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
    },
    importMark : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/marks/importMarkFromSisman.htm',
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

