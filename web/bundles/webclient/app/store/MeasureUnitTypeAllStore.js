Ext.define('sisprod.store.MeasureUnitTypeAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MeasureUnitTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MeasureUnitTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/measureUnitTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'id',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});