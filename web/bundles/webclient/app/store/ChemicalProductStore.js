Ext.define('sisprod.store.ChemicalProductStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ChemicalProductModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ChemicalProductModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/chemicalProduct/list.htm',
            destroy: 'rest/chemicalProduct/delete.htm',
            create: 'rest/chemicalProduct/register.htm',
            update: 'rest/chemicalProduct/update.htm',
            activate: 'rest/chemicalProduct/activate.htm'
        },
        url: 'rest/chemicalProduct/list.htm',
        reader: {
            type: 'json',
            //useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idChemicalProduct',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});