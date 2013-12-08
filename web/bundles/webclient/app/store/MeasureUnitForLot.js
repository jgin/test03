Ext.define('sisprod.store.MeasureUnitForLot', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MeasureUnitModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MeasureUnitModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read:'rest/lots/listMesuareUnitForLot.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idMeasureUnitType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});