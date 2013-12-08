Ext.define('sisprod.store.LocationByDiffTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.LocationModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.LocationModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/locations/listByDiffType.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idLocation',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});