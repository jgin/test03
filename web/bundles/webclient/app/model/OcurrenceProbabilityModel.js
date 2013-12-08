Ext.define('sisprod.model.OcurrenceProbabilityModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idOcurrenceProbability', type: 'int', visible: false},
        {name: 'ocurrenceProbabilityName', type: 'string', visible: true},
        {name: 'ocurrenceProbabilityValue', type: 'int', visible: true},
        {name: 'description', type: 'string', visible: true}
    ],

    idProperty: 'idOcurrenceProbability'
});