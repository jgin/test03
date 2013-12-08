Ext.define('sisprod.store.MarkAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MarkModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MarkModel'
    ],
    
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/marks/listAll.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idMark',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});