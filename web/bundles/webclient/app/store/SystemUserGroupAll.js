Ext.define('sisprod.store.SystemUserGroupAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SystemUserGroupModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SystemUserGroupModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/systemUserGroup/listAll.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'id',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});