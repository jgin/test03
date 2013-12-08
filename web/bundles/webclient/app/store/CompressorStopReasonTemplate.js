Ext.define('sisprod.store.CompressorStopReasonTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CompressorStopReasonModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CompressorStopReasonModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/compressorStopReason/listByPattern.htm'
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