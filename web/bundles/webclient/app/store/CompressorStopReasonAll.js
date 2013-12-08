Ext.define('sisprod.store.CompressorStopReasonAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CompressorStopReasonModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.CompressorStopReasonModel'
    ],
    
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/compressorStopReason/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idCompressorStopReason',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});