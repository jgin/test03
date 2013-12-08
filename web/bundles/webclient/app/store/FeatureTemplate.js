Ext.define('sisprod.store.FeatureTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FeatureModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.FeatureModel'
    ],
    
    pageSize: 10,
    
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/features/listPagingWithPattern.htm'
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