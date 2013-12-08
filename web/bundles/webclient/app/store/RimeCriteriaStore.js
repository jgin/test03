Ext.define('sisprod.store.RimeCriteriaStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.RimeCriteriaModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.RimeCriteriaModel'
    ],

    remoteSort: true,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/rimeCriteria/list.htm',
            destroy: 'rest/rimeCriteria/delete.htm',
            create: 'rest/rimeCriteria/register.htm',
            update: 'rest/rimeCriteria/update.htm',
            activate: 'rest/rimeCriteria/activate.htm'
        },
//        url:'rest/workCategories/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idRimeCriteria',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});