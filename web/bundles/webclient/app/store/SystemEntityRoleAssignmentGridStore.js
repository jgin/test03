Ext.define('sisprod.store.SystemEntityRoleAssignmentGridStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SystemEntityRoleAssignmentModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SystemEntityRoleAssignmentModel'
    ],
    
    sorters: [{
       property: 'entityName',
       direction: 'ASC'
    }],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/systemSecurityRole/getVerifiedEntityRoles.htm'
        },

        reader: {
            type: 'json',
            root: 'entities',
            useSimpleAccessors: false,
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});