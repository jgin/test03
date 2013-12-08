Ext.define('sisprod.store.SystemEntityRoleAssignmentMenuStore', {
    extend: 'Ext.data.TreeStore',
    require: [
        'Ext.data.TreeStore'
    ],
    
//    autoLoad: true,
    
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/systemSecurityRole/getVerifiedMenuRoles.htm'
        },
        
        actionMethods: {
            read : 'GET'
        },

        reader: {
            type: 'json',
            root: 'menus',
            messageProperty: 'message'
        }
    },
    
    root : {}
});