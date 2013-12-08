Ext.define('sisprod.store.UserTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.UserTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.UserTypeModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/userType/listAll.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idUserType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});