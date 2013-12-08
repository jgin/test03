Ext.define('sisprod.store.UserTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.UserTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.UserTypeModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/userType/list.htm',
            destroy: 'rest/userType/delete.htm',
            create: 'rest/userType/register.htm',
            update: 'rest/userType/update.htm',
            activate: 'rest/userType/activate.htm'
            
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idUserType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});