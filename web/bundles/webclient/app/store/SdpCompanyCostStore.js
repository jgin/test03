Ext.define('sisprod.store.SdpCompanyCostStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpCompanyCostModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SdpCompanyCostModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/sdpCompanyCost/listByWellService.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSdpCompanyCost',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});