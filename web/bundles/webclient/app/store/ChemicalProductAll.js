Ext.define('sisprod.store.ChemicalProductAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ChemicalProductModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ChemicalProductModel'
    ],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/chemicalProduct/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idChemicalProduct',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});