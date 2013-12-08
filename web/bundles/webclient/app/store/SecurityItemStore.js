Ext.define('sisprod.store.SecurityItemStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SecurityItemModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SecurityItemModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/systemSecurityRole/searchSecurityItem.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            useSimpleAccessors: false,
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});