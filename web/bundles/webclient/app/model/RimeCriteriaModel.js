Ext.define('sisprod.model.RimeCriteriaModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idRimeCriteria', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'rimeCriteriaName', type: 'string', visible: true},
        {name: 'rimeCriteriaLevel', type: 'string', visible: true}
    ],

    idProperty: 'idRimeCriteria'
});