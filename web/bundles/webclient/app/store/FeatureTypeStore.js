Ext.define('sisprod.store.FeatureTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FeatureTypeModel',
    //autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.FeatureTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/featureTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idFeatureType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});