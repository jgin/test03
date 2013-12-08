Ext.define('sisprod.store.ToolTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ToolTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ToolTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/toolTypes/list.htm',
            destroy: 'rest/toolTypes/delete.htm',
            create: 'rest/toolTypes/register.htm',
            update: 'rest/toolTypes/update.htm',
            activate: 'rest/toolTypes/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idToolType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});