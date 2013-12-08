Ext.define('sisprod.store.MobileUnitStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MobileUnitModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MobileUnitModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/mobileUnit/list.htm',
            destroy: 'rest/mobileUnit/delete.htm',
            create: 'rest/mobileUnit/register.htm',
            update: 'rest/mobileUnit/update.htm',
            activate: 'rest/mobileUnit/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idMobileUnit',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});