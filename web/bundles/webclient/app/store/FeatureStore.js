Ext.define('sisprod.store.FeatureStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FeatureModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.FeatureModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/features/list.htm',
            destroy: 'rest/features/delete.htm',
            create: 'rest/features/register.htm',
            update: 'rest/features/update.htm',
            activate: 'rest/features/activate.htm'
        },
//        actionMethods: {
//            create : 'POST',
//            read   : 'POST',
//            update : 'POST',
//            destroy: 'POST'
//        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idFeature',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});