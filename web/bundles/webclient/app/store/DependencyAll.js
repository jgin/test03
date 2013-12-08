Ext.define('sisprod.store.DependencyAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DependencyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DependencyModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/dependency/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idDependency',
            totalProperty: 'total',
            messageProperty: 'message'
        },
//        autoLoad:true
    }
});