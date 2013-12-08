Ext.define('sisprod.store.CustomerStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CustomerModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CustomerModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/customers/list.htm',
            destroy: 'rest/customers/delete.htm',
            create: 'rest/customers/register.htm',
            update: 'rest/customers/update.htm',
            activate: 'rest/customers/activate.htm'
        },
//        url:'rest/entity/list.htm',

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idCustomer',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});