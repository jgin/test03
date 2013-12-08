Ext.define('sisprod.store.FeatureAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FeatureModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.FeatureModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/features/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idFeature',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});