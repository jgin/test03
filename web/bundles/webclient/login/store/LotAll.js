Ext.define('login.store.LotAll', {
    extend: 'Ext.data.Store',
    model: 'login.model.LotModel',
    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'login.model.LotModel'
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