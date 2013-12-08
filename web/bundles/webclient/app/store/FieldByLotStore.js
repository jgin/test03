Ext.define('sisprod.store.FieldByLotStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FieldModel',
//    autoLoad: false,
    require: [
        'Ext.data.Store', 
        'sisprod.model.FielModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/fields/listByLot.htm'
        },
        
        extraParams: {
            idLot: '-1'
        },
        
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idField',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});