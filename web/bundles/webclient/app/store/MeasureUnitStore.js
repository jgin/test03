Ext.define('sisprod.store.MeasureUnitStore', {
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
            read:'rest/measureUnits/list.htm',
            destroy:'rest/measureUnits/delete.htm',
            create:'rest/measureUnits/register.htm',
            update:'rest/measureUnits/update.htm',
            activate:'rest/measureUnits/activate.htm'
        },
       reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idMeasureUnit',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});