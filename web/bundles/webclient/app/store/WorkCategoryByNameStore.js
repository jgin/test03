Ext.define('sisprod.store.WorkCategoryByNameStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkCategoryModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkCategoryModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workCategories/listPagingByName.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWorkCategory',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});