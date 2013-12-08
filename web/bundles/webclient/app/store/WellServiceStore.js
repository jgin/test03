Ext.define('sisprod.store.WellServiceStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellServiceModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WellServiceModel'
    ],

    proxy:{
        type: 'ajax',
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'POST',
            destroy: 'POST'
        },
        api: {
            read:'rest/wellServices/list.htm',
            destroy:'rest/wellServices/delete.htm',
            create:'rest/wellServices/register.htm',
            update:'rest/wellServices/update.htm',
            activate:'rest/wellServices/activate.htm'
        },
       reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWellService',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});