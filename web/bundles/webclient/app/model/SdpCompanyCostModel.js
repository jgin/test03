Ext.define('sisprod.model.SdpCompanyCostModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idSdpCompanyCost', type: 'int', visible: false},
        {name: 'sdpCompany.idSdpCompany', type: 'string', visible: false},
        {name: 'sdpCompany.company.companyName', type: 'string', visible: true, mapping: 'sdpCompany.company.companyName'},
        {name: 'amount', type: 'int', visible: true},
        {name: 'money.idMoney', type: 'string', visible: false, mapping:'money.idMoney'},
        {name: 'money.moneyName', type: 'string', visible: true, mapping:'money.moneyName'},        
        {name: 'totalHour', type: 'float', visible: true},        
        {name: 'startupDate', type: 'date', dateFormat: 'Y-m-d', visible: true},        
        {name: 'finishDate', type: 'date', dateFormat: 'Y-m-d', visible: true},
        {name: 'valorizationFileName', type: 'string', visible: true}
    ],

    idProperty: 'idSdpCompanyCost'
});