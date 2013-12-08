Ext.define('sisprod.store.SdpFileByWellServiceStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpFileModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SdpFileModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/sdpFile/listByWellService.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSdpFile',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});