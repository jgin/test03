Ext.define('sisprod.store.WellOperativeByLotStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellModel',
    require: [
        'Ext.data.Store', 
        'sisprod.model.WellModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/well/listAllOperativeByLot.htm'
        },
        actionMethods: {
            read   : 'GET'
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