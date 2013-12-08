Ext.define('sisprod.store.PositionStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.PositionModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.PositionModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/position/list.htm',
            destroy: 'rest/position/delete.htm',
            create: 'rest/position/register.htm',
            update: 'rest/position/update.htm',
            activate : 'rest/position/activate.htm',
            importPosition: 'rest/position/importExternalPosition.htm'
        },

        reader: {
            type: 'json',
            //useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idPosition',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});