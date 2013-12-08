Ext.define('sisprod.store.SdpCompanyStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpCompanyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SdpCompanyModel'
    ],
//    remoteSort : true,
    proxy:{
        type: 'ajax',
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'POST',
            destroy: 'POST'
        },
        api: {
            read:'rest/sdpCompanies/list.htm',
            destroy:'rest/sdpCompanies/delete.htm',
            create:'rest/sdpCompanies/register.htm',
            update:'rest/sdpCompanies/update.htm',
            activate:'rest/sdpCompanies/activate.htm'
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