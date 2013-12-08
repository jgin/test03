Ext.define('sisprod.store.ActivityTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ActivityTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ActivityTypeModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/activityTypes/list.htm',
            destroy: 'rest/activityTypes/delete.htm',
            create: 'rest/activityTypes/register.htm',
            update: 'rest/activityTypes/update.htm',
            activate: 'rest/activityTypes/activate.htm'
        },
//        url:'rest/activityTypes/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idActivityType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});