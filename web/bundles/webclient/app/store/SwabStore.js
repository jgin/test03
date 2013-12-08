Ext.define('sisprod.store.SwabStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SwabModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SwabModel'
    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/swab/list.htm',
            destroy: 'rest/swab/delete.htm',
            create: 'rest/swab/register.htm',
            update: 'rest/swab/update.htm',
            activate: 'rest/swab/activate.htm'
        },
        url: 'rest/swab/list.htm',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSwab',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});