Ext.define('sisprod.store.RiskLevelStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.RiskLevelModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.RiskLevelModel'
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
            read: 'rest/riskLevel/list.htm',
            destroy: 'rest/riskLevel/delete.htm',
            create: 'rest/riskLevel/register.htm',
            update: 'rest/riskLevel/update.htm',
            activate: 'rest/riskLevel/activate.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idRiskLevel',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});