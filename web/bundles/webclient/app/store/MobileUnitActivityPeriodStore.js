Ext.define('sisprod.store.MobileUnitActivityPeriodStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MobileUnitActivityPeriodModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MobileUnitActivityPeriodModel'
    ],
    remoteSort : true,
    proxy:{
        type: 'ajax',
        actionMethods: {
            create   : 'POST',
            update   : 'POST',
            read: 'GET'
        },
        
        api: {
            read:'rest/mobileUnitActivityPeriod/list.htm',
            destroy:'rest/mobileUnitActivityPeriod/delete.htm',
            create:'rest/mobileUnitActivityPeriod/register.htm',
            update:'rest/mobileUnitActivityPeriod/update.htm',
            activate:'rest/mobileUnitActivityPeriod/activate.htm'
        },
       reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idMobileUnitActivityPeriod',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});