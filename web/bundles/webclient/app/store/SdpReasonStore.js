Ext.define('sisprod.store.SdpReasonStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpReasonModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SdpReasonModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/sdpReason/list.htm',
            destroy: 'rest/sdpReason/delete.htm',
            create: 'rest/sdpReason/register.htm',
            update: 'rest/sdpReason/update.htm',
            activate: 'rest/sdpReason/activate.htm'
            
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idSdpReason',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});