Ext.define('sisprod.store.LocationByDiffTypeAllTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.LocationModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.LocationModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/locations/listPagingByDiffType.htm'
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