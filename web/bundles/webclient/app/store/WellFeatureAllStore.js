Ext.define('sisprod.store.WellFeatureAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellFeatureModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellFeatureModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/wellFeature/listAll.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWellFeature',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});