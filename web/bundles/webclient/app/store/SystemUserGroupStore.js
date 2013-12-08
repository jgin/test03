Ext.define('sisprod.store.SystemUserGroupStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SystemUserGroupModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SystemUserGroupModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/systemUserGroup/list.htm',
            destroy: 'rest/systemUserGroup/delete.htm',
            create: 'rest/systemUserGroup/register.htm',
            update: 'rest/systemUserGroup/update.htm',
            activate: 'rest/systemUserGroup/activate.htm'
            
        },

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