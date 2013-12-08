Ext.define('sisprod.store.EvidenceFileByWorkOrderStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EvidenceFileModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EvidenceFileModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/evidenceFile/listByWorkOrder.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idEvidenceFile',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});