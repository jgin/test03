Ext.define('sisprod.store.CompressorStopStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CompressorStopModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CompressorStopModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/compressorStop/list.htm',
            destroy:'rest/compressorStop/delete.htm',
            create:'rest/compressorStop/register.htm',
            update:'rest/compressorStop/update.htm',
            activate:'rest/compressorStop/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idCompressorStop',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});