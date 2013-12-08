Ext.define('sisprod.model.ChemicalTreatmentMonthModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idMonth', type: 'int', visible: false},
        {name: 'monthName', type: 'string'}
    ]
});