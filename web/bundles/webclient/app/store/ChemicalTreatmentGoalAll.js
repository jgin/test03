Ext.define('sisprod.store.ChemicalTreatmentGoalAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ChemicalTreatmentGoalModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ChemicalTreatmentGoalModel'
    ],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/chemicalTreatmentGoal/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idChemicalTreatmentGoal',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});