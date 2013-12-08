Ext.define('sisprod.store.WellByLotStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellModel',
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellModel'
    ],
    pageSize: 10,
    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/well/listAllByLot.htm'
        },
        actionMethods: {
            read   : 'POST'
        },
        extraParams: {
            idLot: '-1'
        },
        
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWell',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});