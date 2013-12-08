Ext.define('sisprod.store.CriteriaGroupStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CriteriaGroupModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CriteriaGroupModel'
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
            read: 'rest/criteriaGroup/list.htm',
            destroy: 'rest/criteriaGroup/delete.htm',
            create: 'rest/criteriaGroup/register.htm',
            update: 'rest/criteriaGroup/update.htm',
            activate: 'rest/criteriaGroup/activate.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idCriteriaGroup',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});