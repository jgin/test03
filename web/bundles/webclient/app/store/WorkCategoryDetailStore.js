Ext.define('sisprod.store.WorkCategoryDetailStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkCategoryDetailModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkCategoryDetailModel'
    ],

//    groupField: 'idWorkCategory',

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        
        api: {
            read: 'rest/workCategoryDetail/list.htm',
            destroy: 'rest/workCategoryDetail/delete.htm',
            create: 'rest/workCategoryDetail/register.htm',
            update: 'rest/workCategoryDetail/update.htm'
        },

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWorkCategoryDetail',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});