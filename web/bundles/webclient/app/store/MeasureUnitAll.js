Ext.define('sisprod.store.MeasureUnitAll', {
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
            read:'rest/measureUnits/listAll.htm'
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