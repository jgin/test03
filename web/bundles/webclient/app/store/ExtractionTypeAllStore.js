Ext.define('sisprod.store.ExtractionTypeAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ExtractionTypeModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.ExtractionTypeModel'
    ],
  

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/extractionType/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idExtractionType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});