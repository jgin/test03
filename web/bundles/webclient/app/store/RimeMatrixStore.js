Ext.define('sisprod.store.RimeMatrixStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.RimeMatrixModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.RimeMatrixModel'
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
            read: 'rest/rimeMatrixDetail/list.htm',
            destroy: 'rest/rimeMatrixDetail/delete.htm',
            create: 'rest/rimeMatrix/register.htm',
            update: 'rest/rimeMatrix/update.htm',
            activate: 'rest/rimeMatrixDetail/activate.htm'
        },
//        url:'rest/workCategories/list.htm',

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idRimeMatrix',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});