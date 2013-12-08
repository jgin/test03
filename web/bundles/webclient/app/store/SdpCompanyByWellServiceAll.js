Ext.define('sisprod.store.SdpCompanyByWellServiceAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpCompanyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SdpCompanyModel'
    ],
//    pageSize: 10,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/sdpCompanyCost/listSdpCompanyBySdp.htm'
        },
        extraParams: {
            idSdp: '-1'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idSdpCompany',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});