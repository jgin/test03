Ext.define('sisprod.store.PersonByDocumentNumberStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.PersonModel',
//    autoLoad: false,
    require: [
        'Ext.data.Store', 
        'sisprod.model.DocumentTypeModel'
    ],
    pageSize: 10,
    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/persons/listByDocumentType.htm'
        },
        
        extraParams: {
            idDocumentType: '-1'
        },
        
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idDocumentType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});