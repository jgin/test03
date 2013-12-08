Ext.define('sisprod.store.SdpActivityAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpActivityModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SdpActivityModel'
    ],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/sdpActivity/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSdpActivity',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});