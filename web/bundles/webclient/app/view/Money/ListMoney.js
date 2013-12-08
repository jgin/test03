/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Money.ListMoney', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   alias: 'widget.listMoney',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
        idMoneyHeader:'Money ID',
        isLocalMoneyHeader: 'Is Local Money',
        moneyNameHeader:'Money', 
        moneyAcronymHeader:'Acronym'
    },
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Money List',
   
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
                    idMoney: {header:me.messages.idMoneyHeader},
                    isLocalMoney: {header:me.messages.isLocalMoneyHeader},
                    moneyName: {header:me.messages.moneyNameHeader},
                    moneyAcronym: {header:me.messages.moneyAcronymHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
       
       me.callParent(arguments);
   }   
});