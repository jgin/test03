Ext.define('sisprod.controller.SubstandardTypeController', {
   extend: 'sisprod.controller.Base',
   stores : ['SubstandardTypeStore'],
   models : ['SubstandardTypeModel'],
   entityName: 'SubstandardType',
   refs: [{ref: 'listSubstandardType', selector: 'listSubstandardType'}],
   views : ['SubstandardType.ListSubstandardType'],
   
   requires: [
       'sisprod.store.SubstandardTypeStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idSubstandardType'],
       caption: 'substandardTypeName'
   },
   
   init : function(){
        this.control({
           'listSubstandardType button[action=activate]':{
               click: this.activate
           },
           'listSubstandardType button[action=add]':{
               click: this.showAdd
           },
           
           'listSubstandardType button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSubstandardType dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listSubstandardType button[action=delete]': {
               click: this.destroy
           },
           
           'listSubstandardType button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addSubstandardType button[action=save]': {
               click: this.saveEntity
           },
           
           'updateSubstandardType button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListSubstandardType();
        return tabGrid.getGridPanel();
    },
    afterSaveEntity: function(win, form, response, options){
        response=Ext.JSON.decode(response.responseText);
        if(Ext.isDefined(response.success)){
            if(response.success===false)
                Ext.Msg.alert(this.controllerMessages.alertMessage,response.message);
            else
                win.close();
        }
        else
            win.close();
    }            
});