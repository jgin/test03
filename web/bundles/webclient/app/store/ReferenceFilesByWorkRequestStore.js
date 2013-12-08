Ext.define('sisprod.store.ReferenceFilesByWorkRequestStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestReferenceFileModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestReferenceFileModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read: 'POST'
        },
        
        api: {
            read: 'rest/workRequestReferenceFile/listByWorkRequest.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWorkRequestReferenceFile',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});