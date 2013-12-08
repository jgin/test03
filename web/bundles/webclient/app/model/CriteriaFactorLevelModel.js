Ext.define('sisprod.model.CriteriaFactorLevelModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idCriteriaFactorLevel', type: 'int'},
        {name: 'idCriteriaFactor', type: 'int', mapping: 'criteriaFactor.idCriteriaFactor'},
        {name: 'idCriteriaLevel', type: 'int', mapping: 'criteriaLevel.idCriteriaLevel'},
//        {name: 'idCriteriaGroup', type: 'int', visible: false, mapping: 'criteriaGroup.idCriteriaGroup'},
        {name: 'criteriaFactorName', type: 'string', mapping: 'criteriaFactor.criteriaFactorName'},
        {name: 'criteriaLevelName', type: 'string', mapping: 'criteriaLevel.criteriaLevelName'},
        {name: 'criteriaLevelValue', type: 'int', mapping: 'criteriaLevel.criteriaLevelValue'},
        {name: 'description', type: 'string'}
    ],

    idProperty: 'idCriteriaFactorLevel'
});