Ext.define('sisprod.model.MoneyModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idMoney', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'isLocalMoney', type: 'boolean', visible: true},
        {name: 'moneyName', type: 'string', visible: true},
        {name: 'moneyAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idMoney'
});