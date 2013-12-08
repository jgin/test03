Ext.define('sisprod.store.WellServiceBySdpProductionPeriodAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellServiceModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WellServiceModel'
    ],
    pageSize: 10,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/wellServices/listWellServiceBySDPNotCompleted.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            useSimpleAccessors: false,
            idProperty: 'idWellService',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});