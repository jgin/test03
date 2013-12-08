Ext.define('sisprod.store.LocationTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.LocationTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.LocationTypeModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/locationTypes/list.htm',
            destroy: 'rest/locationTypes/delete.htm',
            create: 'rest/locationTypes/register.htm',
            update: 'rest/locationTypes/update.htm',
            activate: 'rest/locationTypes/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idLocationType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});