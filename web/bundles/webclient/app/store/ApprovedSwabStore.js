Ext.define('sisprod.store.ApprovedSwabStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ApprovedSwabModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.ApprovedSwabModel'
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