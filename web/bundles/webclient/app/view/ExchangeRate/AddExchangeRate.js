/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ExchangeRate.AddExchangeRate', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addExchangeRate',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        moneyNameLabel: 'Money',
        dateOfValidityLabel:'Date Of Validity',
        exchangeRateLabel:'Exchange Rate'
    },
    
    title: 'Add Exchange Rate',
    modal: true,
    width: 300,
//    height: 150,
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
            {
                xtype: 'combobox',
                anchor: '100%',
                fieldLabel: me.messages.moneyNameLabel,
                labelWidth:120,
                store:Ext.create('sisprod.store.MoneyAll').load(),
                displayField:'moneyName',
                valueField: 'idMoney',
                name:'money.idMoney',
                width:120,
                forceSelection: true,
                allowBlank: false,
                editable: false
            },
            {
                xtype: 'datefield',
                name: 'dateOfValidity',
                fieldLabel: me.messages.dateOfValidityLabel,
                labelWidth:120,
                anchor: '100%',
                allowBlank: false
            },
            {
                xtype: 'numberfield',
                name: 'exchangeRate',
                fieldLabel: me.messages.exchangeRateLabel,
                labelWidth:120,
                decimalSeparator:'.',
                anchor: '100%',
                allowBlank: false
            }
        ]
    },
    me.callParent(arguments);    
    }
});