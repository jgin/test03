Ext.define('sisprod.store.WellTypeByStateByWellStateStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellTypeByStateModel',
//    autoLoad: false,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellTypeByStateModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/wellTypeByState/listByWellState.htm'
        },
        
        actionMethods: {
            read   : 'POST'
        },
        
        extraParams: {
            idWellState: '-1'
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