Ext.define('sisprod.store.WorkTemplateStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkTemplateModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkTemplateModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/workTemplate/list.htm',
            destroy: 'rest/workTemplate/delete.htm',
            create: 'rest/workTemplate/register.htm',
            update: 'rest/workTemplate/update.htm',    
            activate: 'rest/workTemplate/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkTemplate',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});