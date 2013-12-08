Ext.define('sisprod.store.LocationAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.LocationModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.LocationModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/locations/listAll.htm'
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