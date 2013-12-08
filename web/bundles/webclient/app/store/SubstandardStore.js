Ext.define('sisprod.store.SubstandardStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SubstandardModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SubstandardModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/substandard/list.htm',
            destroy: 'rest/substandard/delete.htm',
            create: 'rest/substandard/register.htm',
            update: 'rest/substandard/update.htm',
            activate: 'rest/substandard/activate.htm'
        },
        url: 'rest/substandard/list.htm',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSubstandard',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});