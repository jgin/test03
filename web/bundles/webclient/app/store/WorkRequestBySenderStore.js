Ext.define('sisprod.store.WorkRequestBySenderStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestModel',
//    autoLoad: false,
    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workRequest/findByUserPerApproved.htm'
        },
         actionMethods: {
            read: 'POST'
        },        
        reader: {
            type: 'json',
            useSimpleAccessors: false,
            root: 'data',
            idProperty: 'idWorkRequest',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});