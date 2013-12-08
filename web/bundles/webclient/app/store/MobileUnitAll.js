Ext.define('sisprod.store.MobileUnitAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MobileUnitModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.MobileUnitModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/mobileUnit/listAll.htm'
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