Ext.define('sisprod.store.FieldStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FieldModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.FieldModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/fields/list.htm',
            destroy: 'rest/fields/delete.htm',
            create: 'rest/fields/register.htm',
            update: 'rest/fields/update.htm',
            activate: 'rest/fields/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idField',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});