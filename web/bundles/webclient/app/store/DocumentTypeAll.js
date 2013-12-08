Ext.define('sisprod.store.DocumentTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DocumentTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DocumentTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/documentTypes/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idDocumentType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});