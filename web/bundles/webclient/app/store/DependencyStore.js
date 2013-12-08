Ext.define('sisprod.store.DependencyStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DependencyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DependencyModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/dependency/list.htm',
            destroy: 'rest/dependency/delete.htm',
            create: 'rest/dependency/register.htm',
            update: 'rest/dependency/update.htm',
            activate: 'rest/dependency/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idDependency',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});