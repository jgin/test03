Ext.define('sisprod.store.ChemicalTreatmentStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ChemicalTreatmentModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ChemicalTreatmentModel'
    ],
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        api: {
            read: 'rest/chemicalTreatment/list.htm',
            destroy: 'rest/chemicalTreatment/delete.htm',
            create: 'rest/chemicalTreatment/register.htm',
            update: 'rest/chemicalTreatment/update.htm',
            activate: 'rest/chemicalTreatment/activate.htm'
        },
        url: 'rest/chemicalTreatment/list.htm',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idChemicalTreatment',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});