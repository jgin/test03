Ext.define('sisprod.store.EvidenceDocumentTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EvidenceDocumentTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EvidenceDocumentTypeModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/evidenceDocumentType/list.htm',
            destroy: 'rest/evidenceDocumentType/delete.htm',
            create: 'rest/evidenceDocumentType/register.htm',
            update: 'rest/evidenceDocumentType/update.htm',
            activate: 'rest/evidenceDocumentType/activate.htm'
            
        },
//        url:'rest/userType/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idEvidenceDocumentType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});