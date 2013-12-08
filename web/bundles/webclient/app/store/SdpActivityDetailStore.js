Ext.define('sisprod.store.SdpActivityDetailStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SdpActivityDetailModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.SdpActivityDetailModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/sdpActivityDetail/list.htm',
            destroy: 'rest/sdpActivityDetail/delete.htm',
            create: 'rest/sdpActivityDetail/register.htm',
            update: 'rest/sdpActivityDetail/update.htm',
            activate: 'rest/sdpActivityDetail/activate.htm'
            
        },

        reader: {
            type: 'json',
//            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idSdpActivityDetail',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});