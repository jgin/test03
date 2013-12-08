Ext.define('sisprod.store.DependencyLevelAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DependencyLevelModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DependencyLevelModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/dependencyLevel/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idDependencyLevel',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});