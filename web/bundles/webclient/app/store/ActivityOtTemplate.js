Ext.define('sisprod.store.ActivityOtTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ActivityOtModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ActivityOtModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/activityOt/listPaging.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idActivityOt',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});