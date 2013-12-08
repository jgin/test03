Ext.define('sisprod.store.TankStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.TankModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.TankModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/tanks/list.htm',
            destroy:'rest/tanks/delete.htm',
            create:'rest/tanks/register.htm',
            update:'rest/tanks/update.htm',
            activate: 'rest/tanks/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idTank',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});