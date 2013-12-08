Ext.define('sisprod.store.SubstandardConditionActionAutocomplete', {
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
            read: 'rest/substandardConditionAction/listPagingWithPattern.htm'
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