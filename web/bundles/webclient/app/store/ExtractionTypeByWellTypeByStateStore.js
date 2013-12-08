Ext.define('sisprod.store.ExtractionTypeByWellTypeByStateStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ExtractionTypeModel',
//    autoLoad: false,
    require: [
        'Ext.data.Store', 
        'sisprod.model.ExtractionTypeModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/extractionType/listByWellTypeByState.htm'
        },
        
        actionMethods: {
            read   : 'POST'
        },
        
        extraParams: {
            idWellTypeByState: '-1'
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