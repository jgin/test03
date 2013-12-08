Ext.define('sisprod.store.MarkStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MarkModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MarkModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/marks/list.htm',
            destroy: 'rest/marks/delete.htm',
            create: 'rest/marks/register.htm',
            update: 'rest/marks/update.htm',
            activate: 'rest/marks/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idMark',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});