Ext.define('sisprod.model.ChemicalTreatmentGoalModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idChemicalTreatmentGoal', type: 'int', visible: false},
        {name: 'chemicalTreatmentGoalAcronym', type: 'string', visible: true},
        {name: 'chemicalTreatmentGoalName', type: 'string', visible: true}
    ],
    idProperty: 'idChemicalTreatmentGoal'
});