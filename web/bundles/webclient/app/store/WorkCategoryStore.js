Ext.define('sisprod.store.WorkCategoryStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkCategoryModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkCategoryModel'
    ],

    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        
        api: {
            read: 'rest/workCategories/list.htm',
            destroy: 'rest/workCategories/delete.htm',
            create: 'rest/workCategories/register.htm',
            update: 'rest/workCategories/update.htm',
            activate: 'rest/workCategories/activate.htm'
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