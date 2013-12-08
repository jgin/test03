Ext.define('sisprod.store.ChemicalTreatmentMonthsStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ChemicalTreatmentMonthModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ChemicalTreatmentMonthModel'
    ],
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'post'
        },
        api: {
            read: 'rest/chemicalTreatment/listMonths.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            messageProperty: 'message',
            idProperty: 'idChemicalTreatmentMonth'
        }
    }
});