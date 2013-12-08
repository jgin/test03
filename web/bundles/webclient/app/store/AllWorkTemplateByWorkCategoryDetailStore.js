Ext.define('sisprod.store.AllWorkTemplateByWorkCategoryDetailStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkTemplateModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkTemplateModel'
    ],

    proxy:{
        type: 'ajax',
        actionMethods: {
            read: 'POST'
        },
        api: {
            read: 'rest/workTemplate/listAllByWorkCategoryDetail.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkTemplate',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});