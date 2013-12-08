Ext.define('sisprod.store.LocationTemplate', {
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
            read: 'rest/locations/listPagingAll.htm'
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