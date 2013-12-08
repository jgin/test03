Ext.define('sisprod.store.WorkShopStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkShopModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkShopModel'
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
            read: 'rest/workShop/list.htm',
            destroy: 'rest/workShop/delete.htm',
            create: 'rest/workShop/register.htm',
            update: 'rest/workShop/update.htm',
            activate: 'rest/workShop/activate.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkShop',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});