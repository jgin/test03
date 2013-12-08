Ext.define('sisprod.store.WorkShopAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkShopModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkShopModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workShop/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWorkShop',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});