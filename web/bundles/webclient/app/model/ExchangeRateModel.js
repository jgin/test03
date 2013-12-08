Ext.define('sisprod.model.ExchangeRateModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'money.idMoney', type: 'int', visible: false, mapping: 'money.idMoney'},
        {name: 'money.moneyName', type: 'string', visible: true, mapping: 'money.moneyName'},
        {name: 'idExchangeRate', type: 'int', visible: false},
        {name: 'dateOfValidity', type: 'date', dateFormat: 'Y-m-d', visible: true},
        {name: 'exchangeRate', type: 'float', visible: true}
    ],

    idProperty: 'idExchangeRate'
});