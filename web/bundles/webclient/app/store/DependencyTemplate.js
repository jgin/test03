Ext.define('sisprod.store.DependencyTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DependencyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DependencyModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/dependency/listPagingAll.htm'
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