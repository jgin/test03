Ext.define('sisprod.store.WorkRequestStatusAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestStatusModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestStatusModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read   : 'GET'
        },
        
        api: {
            read: 'rest/workRequestStatus/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWorkRequestStatus',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});