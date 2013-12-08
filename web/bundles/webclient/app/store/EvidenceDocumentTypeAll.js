Ext.define('sisprod.store.EvidenceDocumentTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EvidenceDocumentTypeModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.EvidenceDocumentTypeModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/evidenceDocumentType/listAll.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idEvidenceDocumentType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});