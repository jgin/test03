Ext.define('sisprod.store.QuadrilleStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.QuadrilleModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.QuadrilleModel'
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
            read: 'rest/quadrille/list.htm',
            destroy: 'rest/quadrille/delete.htm',
            create: 'rest/quadrille/register.htm',
            update: 'rest/quadrille/update.htm',
            activate: 'rest/quadrille/activate.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idQuadrille',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});