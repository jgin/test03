Ext.define('sisprod.store.RimeCriteriaAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.RimeCriteriaModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.RimeCriteriaModel'
    ],

//    autoLoad: true,    
    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/rimeCriteria/listAll.htm'
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