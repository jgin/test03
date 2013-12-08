Ext.define('sisprod.store.SdpCompanyAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpCompanyModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.SdpCompanyModel'
    ],
//    pageSize: 10,
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'rest/sdpCompanies/listAll.htm'
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