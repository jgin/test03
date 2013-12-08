Ext.define('sisprod.store.WellStateAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellStateModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellStateModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/wellState/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWellState',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});