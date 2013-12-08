Ext.define('sisprod.store.ToolStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ToolModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ToolModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/tools/list.htm',
            destroy:'rest/tools/delete.htm',
            create: 'rest/tools/register.htm',
            update:'rest/tools/update.htm',
            activate: 'rest/tools/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idTool',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});