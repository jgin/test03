Ext.define('sisprod.store.DependencyByDiffLevelAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DependencyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DependencyModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/dependencys/listByDiffDependencyLevel.htm'
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