Ext.define('sisprod.store.LotStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.LotModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.LotModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/lots/list.htm',
            destroy:'rest/lots/delete.htm',
            create: 'rest/lots/register.htm',
            update:'rest/lots/update.htm',
            activate: 'rest/lots/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idLot',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});