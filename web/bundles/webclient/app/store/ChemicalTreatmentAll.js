Ext.define('sisprod.store.ChemicalTreatmentAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ChemicalTreatmentModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ChemicalTreatmentModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/chemicalTreatment/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idChemicalTreatment',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});