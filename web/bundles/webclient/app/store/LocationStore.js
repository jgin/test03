Ext.define('sisprod.store.LocationStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.LocationModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.LocationModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/locations/list.htm',
            destroy: 'rest/locations/delete.htm',
            create: 'rest/locations/register.htm',
            update: 'rest/locations/update.htm',
            activate: 'rest/locations/activate.htm'
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