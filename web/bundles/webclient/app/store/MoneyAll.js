Ext.define('sisprod.store.MoneyAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MoneyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MoneyModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/money/listAll.htm'
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