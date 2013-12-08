Ext.define('sisprod.store.SdpActivityStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpActivityModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SdpActivityModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/sdpActivity/list.htm',
            destroy: 'rest/sdpActivity/delete.htm',
            create: 'rest/sdpActivity/register.htm',
            update: 'rest/sdpActivity/update.htm',
            activate: 'rest/sdpActivity/activate.htm'
            
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idSdpActivity',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});