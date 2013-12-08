Ext.define('sisprod.store.CompanyAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CompanyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CompanyModel'
    ],
    pageSize: 10,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/companies/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idCompany',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});