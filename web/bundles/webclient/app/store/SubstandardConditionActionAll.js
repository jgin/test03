Ext.define('sisprod.store.SubstandardConditionActionAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SubstandardConditionActionModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SubstandardConditionActionModel'
    ],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/substandardConditionAction/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSubstandardConditionAction',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});