Ext.define('sisprod.store.PositionAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.PositionModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.PositionModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/position/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idPosition',
            totalProperty: 'total',
            messageProperty: 'message'
        },
//        autoLoad:true
    }
});