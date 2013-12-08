Ext.define('sisprod.store.CriteriaFactorByGroupStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CriteriaFactorModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CriteriaFactorModel'
    ],

    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read   : 'POST'
        },
        
        api: {
            read: 'rest/criteriaFactor/listAllByIdCriteriaGroup.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idCriteriaFactor',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});