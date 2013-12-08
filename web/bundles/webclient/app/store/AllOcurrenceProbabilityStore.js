Ext.define('sisprod.store.AllOcurrenceProbabilityStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.OcurrenceProbabilityModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.OcurrenceProbabilityModel'
    ],

//    autoLoad: true,

    proxy:{
        type: 'ajax',
        
       api: {
            read: 'rest/ocurrenceProbability/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idOcurrenceProbability',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});