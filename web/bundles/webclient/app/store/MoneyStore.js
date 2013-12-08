Ext.define('sisprod.store.MoneyStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MoneyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MoneyModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/money/list.htm',
            destroy: 'rest/money/delete.htm',
            create: 'rest/money/register.htm',
            update: 'rest/money/update.htm',
            activate: 'rest/money/activate.htm'
        },
//        url:'rest/money/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idMoney',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});