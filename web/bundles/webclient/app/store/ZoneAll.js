Ext.define('sisprod.store.ZoneAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ZoneModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ZoneModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/zones/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idZone',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});