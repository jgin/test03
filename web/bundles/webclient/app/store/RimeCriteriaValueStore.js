Ext.define('sisprod.store.RimeCriteriaValueStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.RimeCriteriaValueModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.RimeCriteriaValueModel'
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
            read: 'rest/rimeCriteriaValue/list.htm',
            destroy: 'rest/rimeCriteriaValue/delete.htm',
            create: 'rest/rimeCriteriaValue/register.htm',
            update: 'rest/rimeCriteriaValue/update.htm',
            activate: 'rest/rimeCriteriaValue/activate.htm'
        },

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idRimeCriteriaValue',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});