/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.RiskLevelController', {
   extend: 'sisprod.controller.Base',
   stores : ['RiskLevelStore'],
   models : ['RiskLevelModel'],
   entityName: 'RiskLevel',
   refs: [{ref: 'listRiskLevel', selector: 'listRiskLevel'}],
   views : ['RiskLevel.ListRiskLevel'],
   
   requires: [
       'sisprod.store.RiskLevelStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idRiskLevel'],
       caption: 'riskLevelName'
   },
   
   init : function(){
        this.control({
           'listRiskLevel button[action=activate]':{
               click: this.activate
           },
            
           'listRiskLevel button[action=add]':{
               click: this.showAdd
           },
           
           'listRiskLevel button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listRiskLevel dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listRiskLevel button[action=delete]': {
               click: this.destroy
           },
           
           'listRiskLevel button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addRiskLevel button[action=save]': {
               click: this.saveEntity
           },
           
           'addv numberfield[name=minimumScore]': {
               change: this.onMinimumScoreChange
           },
           
           'updateRiskLevel button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListRiskLevel();
        return tabGrid.getGridPanel();
    }
});

