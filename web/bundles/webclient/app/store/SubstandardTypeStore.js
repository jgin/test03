Ext.define('sisprod.store.SubstandardTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SubstandardTypeModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SubstandardTypeModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/substandardType/list.htm',
            destroy: 'rest/substandardType/delete.htm',
            create: 'rest/substandardType/register.htm',
            update: 'rest/substandardType/update.htm',
            activate: 'rest/substandardType/activate.htm'
        },
        url: 'rest/substandardType/list.htm',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSubstandardType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});