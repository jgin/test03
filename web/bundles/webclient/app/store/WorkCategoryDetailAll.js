Ext.define('sisprod.store.WorkCategoryDetailAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkCategoryDetailModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkCategoryDetailModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workCategoryDetail/listAll.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkCategoryDetail',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});