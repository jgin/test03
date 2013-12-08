Ext.define('sisprod.store.WellGroupAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellGroupModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellGroupModel'
    ],
  

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/wellGroup/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWellGroup',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});