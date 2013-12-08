Ext.define('sisprod.store.WorkCategoryAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkCategoryModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkCategoryModel'
    ],

//    autoLoad: true,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workCategories/listAll.htm'
        },
//        url:'rest/workCategories/list.htm',

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