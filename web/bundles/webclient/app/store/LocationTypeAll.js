Ext.define('sisprod.store.LocationTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.LocationTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.LocationTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/locationTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idLocationType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});