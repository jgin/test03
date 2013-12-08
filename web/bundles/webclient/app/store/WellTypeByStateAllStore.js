Ext.define('sisprod.store.WellTypeByStateAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellTypeByStateModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellTypeByStateModel'
    ],
  

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/wellTypeByState/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWellTypeByState',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});