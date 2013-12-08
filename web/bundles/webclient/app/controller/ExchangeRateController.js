/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ExchangeRateController', {
   extend: 'sisprod.controller.Base',
   stores : ['ExchangeRateStore'],
   models : ['ExchangeRateModel'],
   entityName: 'ExchangeRate',
   refs: [{ref: 'listExchangeRate', selector: 'listExchangeRate'}],
   views : ['ExchangeRate.ListExchangeRate'],
   
   requires: [
       'sisprod.store.ExchangeRateStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idExchangeRate'],
       caption: 'exchangeRate'
   },
   
   init : function(){
        this.control({
           'listExchangeRate button[action=add]':{
               click: this.showAdd
           },
           
           'listExchangeRate button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listExchangeRate button[action=activate]':{
               click: this.activate
           },
           
           'listExchangeRate dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listExchangeRate button[action=delete]': {
               click: this.destroy
           },
           
           'listExchangeRate button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addExchangeRate button[action=save]': {
               click: this.saveEntity
           },
           
           'updateExchangeRate button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListExchangeRate();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, form, record){
        var me = this;
        var formPanel = form.down('form');
        formPanel.loadRecord(record);
        var cmbMoney = formPanel.query("[name=idMoney]")[0];
        if(Ext.isDefined(cmbMoney)){
            if(Ext.isDefined(record.raw.money) && Ext.isDefined(record.raw.money.idMoney))
                cmbMoney.select(record.raw.money.idMoney);
        }
    }        
});

