Ext.define('sisprod.store.AllConsequenceCriteriaLevelStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CriteriaLevelModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CriteriaLevelModel'
    ],

    remoteSort: true,

    async: false,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read   : 'POST'
        },
        
        api: {
            read: 'rest/criteriaLevel/listAllByConsequenceCriteriaGroup.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idCriteriaLevel',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});