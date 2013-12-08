Ext.define('sisprod.model.ChemicalProductModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idChemicalProduct', type: 'int', visible: false},
        {name: 'chemicalProductAcronym', type: 'string', visible: true},
        {name: 'chemicalProductName', type: 'string', visible: true},
        {name: 'measureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'measureUnit.idMeasureUnit'},
        {name: 'measureUnit.measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'}
    ],
    idProperty: 'idChemicalProduct'
});