Ext.define('sisprod.model.CriteriaLevelModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idCriteriaLevel', type: 'int', visible: false},
        {name: 'idCriteriaGroup', type: 'int', visible: false, mapping: 'criteriaGroup.idCriteriaGroup'},
        {name: 'criteriaLevelValue', type: 'int', visible: true},
        {name: 'criteriaLevelOrder', type: 'string', visible: true},
        {name: 'criteriaLevelName', type: 'string', visible: true}
    ],

    idProperty: 'idCriteriaLevel'
});