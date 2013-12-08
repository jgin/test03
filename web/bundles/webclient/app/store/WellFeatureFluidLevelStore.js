Ext.define('sisprod.store.WellFeatureFluidLevelStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellFeatureFluidLevelModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WellFeatureFluidLevelModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read: 'POST'
        },
        
        api: {
            read: 'rest/wellFeatureFluidLevel/listAll.htm'
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