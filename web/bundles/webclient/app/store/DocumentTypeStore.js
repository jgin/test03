Ext.define('sisprod.store.DocumentTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.DocumentTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.DocumentTypeModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/documentTypes/list.htm',
            destroy: 'rest/documentTypes/delete.htm',
            create: 'rest/documentTypes/register.htm',
            update: 'rest/documentTypes/update.htm',
            activate: 'rest/documentTypes/activate.htm'
        },
//        url:'rest/workCategories/list.htm',

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