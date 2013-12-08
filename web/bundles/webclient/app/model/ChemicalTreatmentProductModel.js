Ext.define('sisprod.model.ChemicalTreatmentProductModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idChemicalTreatmentProduct', type: 'int', visible: false, mapping: 'chemicalProduct.idChemicalTreatmentProduct'},
        {name: 'idChemicalProduct', type: 'int', visible: false, mapping: 'chemicalProduct.idChemicalProduct'},
        {name: 'chemicalProductName', type: 'string', visible: true, mapping: 'chemicalProduct.chemicalProductName'},
        {name: 'idChemicalTreatmentGoal', type: 'int', visible: false, mapping: 'chemicalTreatmentGoal.idChemicalTreatmentGoal'},
        {name: 'chemicalTreatmentGoalName', type: 'string', visible: true, mapping: 'chemicalTreatmentGoal.chemicalTreatmentGoalName'},
        {name: 'dosage', type: 'float', visible: true},
        {name: 'dosageIdMeasureUnit', type: 'int', visible: false, mapping: 'dosageMeasureUnit.idDosageMeasureUnit'},
        {name: 'dosageMeasureUnitName', type: 'string', visible: true, mapping: 'dosageMeasureUnit.measureUnitName'},
        {name: 'treatmentTime', type: 'float', visible: true},
        {name: 'treatmentTimeIdMeasureUnit', type: 'int', visible: false, mapping: 'timeMeasureUnit.idDosageMeasureUnit'},
        {name: 'timeMeasureUnitName', type: 'string', visible: true, mapping: 'timeMeasureUnit.measureUnitName'}
    ],
    idProperty: 'idChemicalTreatmentProduct'
});