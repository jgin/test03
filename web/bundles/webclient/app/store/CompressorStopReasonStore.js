Ext.define('sisprod.store.CompressorStopReasonStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CompressorStopReasonModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CompressorStopReasonModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/compressorStopReason/list.htm',
            destroy: 'rest/compressorStopReason/delete.htm',
            create: 'rest/compressorStopReason/register.htm',
            update: 'rest/compressorStopReason/update.htm',    
            activate: 'rest/compressorStopReason/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idCompressorStopReason',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});