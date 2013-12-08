Ext.define('sisprod.store.WorkRequestSourceStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestSourceModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestSourceModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workRequestSource/list.htm',
            destroy: 'rest/workRequestSource/delete.htm',
            create: 'rest/workRequestSource/register.htm',
            update: 'rest/workRequestSource/update.htm',
            activate: 'rest/workRequestSource/activate.htm'
        },
//        url:'rest/workCategories/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'id',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});