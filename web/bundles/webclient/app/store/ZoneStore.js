Ext.define('sisprod.store.ZoneStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ZoneModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ZoneModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/zones/list.htm',
            destroy: 'rest/zones/delete.htm',
            create: 'rest/zones/register.htm',
            update: 'rest/zones/update.htm',
            activate: 'rest/zones/activate.htm'
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