Ext.define('sisprod.store.SubstandardTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SubstandardTypeModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SubstandardTypeModel'
    ],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/substandardType/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSubstandardType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});