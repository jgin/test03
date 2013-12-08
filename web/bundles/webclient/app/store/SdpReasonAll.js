Ext.define('sisprod.store.SdpReasonAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpReasonModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SdpReasonModel'
    ],
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/sdpReason/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSdpReason',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});