Ext.define('sisprod.store.ChemicalTreatmentYearsAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ChemicalTreatmentYearModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ChemicalTreatmentYearModel'
    ],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'post'
        },
        api: {
            read: 'rest/chemicalTreatment/listYearsAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            messageProperty: 'message'
        }
    }
});