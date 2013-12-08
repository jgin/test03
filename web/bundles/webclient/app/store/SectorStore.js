Ext.define('sisprod.store.SectorStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SectorModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SectorModel'
    ],

    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        
        api: {
            read: 'rest/sector/list.htm',
            destroy: 'rest/sector/delete.htm',
            create: 'rest/sector/register.htm',
            update: 'rest/sector/update.htm',
            activate: 'rest/sector/activate.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idSector',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});