Ext.define('sisprod.store.OcurrenceProbabilityStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.OcurrenceProbabilityModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.OcurrenceProbabilityModel'
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
            read: 'rest/ocurrenceProbability/list.htm',
            destroy: 'rest/ocurrenceProbability/delete.htm',
            create: 'rest/ocurrenceProbability/register.htm',
            update: 'rest/ocurrenceProbability/update.htm',
            activate: 'rest/ocurrenceProbability/activate.htm'
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