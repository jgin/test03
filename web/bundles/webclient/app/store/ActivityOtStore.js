Ext.define('sisprod.store.ActivityOtStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ActivityOtModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ActivityOtModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/activityOt/list.htm',
            destroy: 'rest/activityOt/delete.htm',
            create: 'rest/activityOt/register.htm',
            update: 'rest/activityOt/update.htm',
            activate: 'rest/activityOt/activate.htm'
        },
//        url:'rest/activityOts/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idActivityOt',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});