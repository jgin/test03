Ext.define('sisprod.model.RimeCriteriaValueModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idRimeCriteria', type: 'int', visible: false, mapping: 'rimeCriteria.idRimeCriteria'},
        {name: 'rimeCriteria.rimeCriteriaName', type: 'string', visible: true, mapping: 'rimeCriteria.rimeCriteriaName'},
        {name: 'idRimeCriteriaValue', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'effectiveStartDate', type: 'date', dateFormat: 'Y-m-d', visible: true},
        {name: 'minimumScore', type: 'int', visible: true},
        {name: 'maximumScore', type: 'int', visible: true},
        {name: 'maximumTimeAttention', type: 'int', visible: true}
    ],

    idProperty: 'idRimeCriteriaValue'
});