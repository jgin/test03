Ext.define('sisprod.store.LotAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.LotModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.LotModel'
    ],
    
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/lots/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idLot',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});