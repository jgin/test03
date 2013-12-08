/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.OcurrenceProbabilityController', {
   extend: 'sisprod.controller.Base',
   stores : ['OcurrenceProbabilityStore'],
   models : ['OcurrenceProbabilityModel'],
   entityName: 'OcurrenceProbability',
   refs: [{ref: 'listOcurrenceProbability', selector: 'listOcurrenceProbability'}],
   views : ['OcurrenceProbability.ListOcurrenceProbability'],
   
   requires: [
       'sisprod.store.OcurrenceProbabilityStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idOcurrenceProbability'],
       caption: 'ocurrenceProbabilityName'
   },
   
   init : function(){
        this.control({
           'listOcurrenceProbability button[action=activate]':{
               click: this.activate
           }, 
           
           'listOcurrenceProbability button[action=add]':{
               click: this.showAdd
           },
           
           'listOcurrenceProbability button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listOcurrenceProbability dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listOcurrenceProbability button[action=delete]': {
               click: this.destroy
           },
           
           'listOcurrenceProbability button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addOcurrenceProbability button[action=save]': {
               click: this.saveEntity
           },
           
           'addv numberfield[name=minimumScore]': {
               change: this.onMinimumScoreChange
           },
           
           'updateOcurrenceProbability button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListOcurrenceProbability();
        return tabGrid.getGridPanel();
    }
});

