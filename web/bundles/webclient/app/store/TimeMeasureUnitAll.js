Ext.define('sisprod.store.TimeMeasureUnitAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MeasureUnitModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.MeasureUnitModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/measureUnits/listAllTime.htm'
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