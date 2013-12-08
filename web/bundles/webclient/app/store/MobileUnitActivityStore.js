Ext.define('sisprod.store.MobileUnitActivityStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MobileUnitActivityModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MobileUnitActivityModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/mobileUnitActivity/list.htm',
            destroy: 'rest/mobileUnitActivity/delete.htm',
            create: 'rest/mobileUnitActivity/register.htm',
            update: 'rest/mobileUnitActivity/update.htm',
            activate: 'rest/mobileUnitActivity/activate.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idMobileUnitActivity',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});