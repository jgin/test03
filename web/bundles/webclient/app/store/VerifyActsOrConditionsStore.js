Ext.define('sisprod.store.VerifyActsOrConditionsStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.VerifyActsOrConditionsModel',
    require: [
        'Ext.data.Store',
        'sisprod.model.VerifyActsOrConditionsModel'
    ],
    remoteSort: true,
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        api: {
            read: 'rest/workRequest/listAllForMonth.htm',
            destroy: 'rest/workRequest/delete.htm',
            create: 'rest/workRequest/register.htm',
            update: 'rest/workRequest/update.htm',
            activate: 'rest/workRequest/activate.htm'
        },
        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWorkRequest',
            totalProperty: 'total',
            messageProperty: 'message'
        },
        extraParams: {
            month: (new Date()).getMonth()
        }
    }
});