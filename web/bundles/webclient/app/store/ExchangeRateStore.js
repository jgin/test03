Ext.define('sisprod.store.ExchangeRateStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ExchangeRateModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.ExchangeRateModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/exchangeRates/list.htm',
            destroy: 'rest/exchangeRates/delete.htm',
            create: 'rest/exchangeRates/register.htm',
            update: 'rest/exchangeRates/update.htm',
            activate: 'rest/exchangeRates/activate.htm'
        },
        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idExchangeRate',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});