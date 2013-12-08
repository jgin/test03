Ext.define('sisprod.store.ChemicalTreatmentGoalStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ChemicalTreatmentGoalModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ChemicalTreatmentGoalModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/chemicalTreatmentGoal/list.htm',
            destroy: 'rest/chemicalTreatmentGoal/delete.htm',
            create: 'rest/chemicalTreatmentGoal/register.htm',
            update: 'rest/chemicalTreatmentGoal/update.htm',
            activate: 'rest/chemicalTreatmentGoal/activate.htm'
        },
        url: 'rest/chemicalTreatmentGoal/list.htm',
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idChemicalTreatmentGoal',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});