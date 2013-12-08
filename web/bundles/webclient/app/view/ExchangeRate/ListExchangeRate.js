/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ExchangeRate.ListExchangeRate', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   alias: 'widget.listExchangeRate',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
        idExchangeRateHeader: 'Exchange Rate ID',
        idMoneyHeader:'Money ID',
        moneyNameHeader: 'Money',
        dateOfValidityHeader:'Date Of Validity',
        exchangeRateHeader:'Exchange Rate'
    },
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Exchange Rates List',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
        var me = this;
       
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idExchangeRate: {header:me.messages.idExchangeRateHeader},
                    'money.idMoney': {header:me.messages.idMoneyHeader},
                    'money.moneyName': {header:me.messages.moneyNameHeader},
                    dateOfValidity: {header:me.messages.dateOfValidityHeader},
                    exchangeRate: {header:me.messages.exchangeRateHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
       
       me.callParent(arguments);
   }
   
});