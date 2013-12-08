Ext.define('sisprod.store.AlternativeTankTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.AlternativeTankTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.AlternativeTankTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/alternativeTankTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idAlternativeTankType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
//        autoLoad:true
    }
});