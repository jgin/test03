Ext.define('sisprod.model.CriteriaFactorModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idCriteriaFactor', type: 'int', visible: false},
        {name: 'idCriteriaGroup', type: 'int', visible: false, mapping: 'criteriaGroup.idCriteriaGroup'},
        {name: 'criteriaFactorName', type: 'string', visible: true},
        {name: 'criteriaFactorAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idCriteriaFactor'
});