Ext.define('sisprod.store.CompanyStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CompanyModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CompanyModel'
    ],
    remoteSort : true,
    proxy:{
        type: 'ajax',
        
        api: {
            read:'rest/companies/list.htm',
            destroy:'rest/companies/delete.htm',
            create:'rest/companies/register.htm',
            update:'rest/companies/update.htm',
            activate:'rest/companies/activate.htm'
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