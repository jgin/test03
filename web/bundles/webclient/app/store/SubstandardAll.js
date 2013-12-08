Ext.define('sisprod.store.SubstandardAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SubstandardModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SubstandardModel'
    ],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/substandard/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSubstandard',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});