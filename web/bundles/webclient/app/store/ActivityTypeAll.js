Ext.define('sisprod.store.ActivityTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ActivityTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ActivityTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/activityTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idActivityType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});