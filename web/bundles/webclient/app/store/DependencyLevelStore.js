Ext.define('sisprod.store.DependencyLevelStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DependencyLevelModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DependencyLevelModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/dependencyLevel/list.htm',
            destroy: 'rest/dependencyLevel/delete.htm',
            create: 'rest/dependencyLevel/register.htm',
            update: 'rest/dependencyLevel/update.htm',
            activate: 'rest/dependencyLevel/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idDependencyLevel',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});