/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.PPEquipmentController', {
   extend: 'sisprod.controller.Base',
   stores : ['PPEquipmentStore'],
   models : ['PPEquipmentModel'],
   entityName: 'PPEquipment',
   refs: [{ref: 'listPPEquipment', selector: 'listPPEquipment'}],
   views : ['PPEquipment.ListPPEquipment'],
   
   requires: [
       'sisprod.store.PPEquipmentStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idPPEquipment'],
       caption: 'description'
   },
   
   init : function(){
        this.control({
           'listPPEquipment button[action=add]':{
               click: this.showAdd
           },
           
           'listPPEquipment button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listPPEquipment button[action=activate]':{
               click: this.activate
           },
           
           'listPPEquipment dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listPPEquipment button[action=delete]': {
               click: this.destroy
           },
           
           'listPPEquipment button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addPPEquipment button[action=save]': {
               click: this.saveEntity
           },
           
           'updatePPEquipment button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListPPEquipment();
        return tabGrid.getGridPanel();
    },
    beforeSaveEntity:function(win, form, values){
        if(!Ext.isDefined(values.isTool)){
            values.isTool=false;
        }else{
            values.isTool=true;
        }
        return true;
    }
});

