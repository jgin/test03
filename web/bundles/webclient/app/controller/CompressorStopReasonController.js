
/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.CompressorStopReasonController', {
   extend: 'sisprod.controller.Base',
   stores : ['CompressorStopReasonStore'],
   models : ['CompressorStopReasonModel'],
   entityName: 'CompressorStopReason',
   refs: [{ref: 'listCompressorStopReason', selector: 'listCompressorStopReason'}],
   views : ['CompressorStopReason.ListCompressorStopReason'],
   
   requires: [
       'sisprod.store.CompressorStopReasonStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idCompressorStopReason'],
       caption: 'compressorStopReasonName'
   },
   
   init : function(){
        this.control({
           
           'listCompressorStopReason button[action=add]':{
               click: this.showAdd
           },
           
           'listCompressorStopReason button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listCompressorStopReason button[action=activate]':{
               click: this.activate
           },           
           'listCompressorStopReason dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listCompressorStopReason button[action=delete]': {
               click: this.destroy
           },
           
           'listCompressorStopReason button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addCompressorStopReason button[action=save]': {
               click: this.saveEntity
           },
           
           'updateCompressorStopReason button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListCompressorStopReason();
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
    beforeSaveEntity:function(win, form, values){
        if(!Ext.isDefined(values.discounted)){
            values.discounted=false;
        }else{
            values.discounted=true;
        }
        return true;
    }        
});

