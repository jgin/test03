Ext.define('sisprod.store.WellTypeByProductionAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellTypeByProductionModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellTypeByProductionModel'
    ],
  

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/wellTypeByProduction/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWellTypeByProduction',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});