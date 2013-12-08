Ext.define('sisprod.store.BloodGroupStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BloodGroupModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.BloodGroupModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/bloodGroups/list.htm',
            destroy: 'rest/bloodGroups/delete.htm',
            create: 'rest/bloodGroups/register.htm',
            update: 'rest/bloodGroups/update.htm',
            activate: 'rest/bloodGroups/activate.htm'
        },
//        url:'rest/workCategories/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idBloodGroup',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});