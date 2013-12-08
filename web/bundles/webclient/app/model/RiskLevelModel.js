Ext.define('sisprod.model.RiskLevelModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idRiskLevel', type: 'int', visible: false},
        {name: 'riskLevelName', type: 'string', visible: true},
        {name: 'riskLevelAcronym', type: 'string', visible: true},
        {name: 'minimumValue', type: 'int', visible: true},
        {name: 'maximumValue', type: 'int', visible: true}
    ],

    idProperty: 'idRiskLevel'
});