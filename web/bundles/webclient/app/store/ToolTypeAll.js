Ext.define('sisprod.store.ToolTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ToolTypeModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.ToolTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/toolTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idToolType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});