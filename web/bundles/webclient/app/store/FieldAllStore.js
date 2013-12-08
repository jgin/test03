Ext.define('sisprod.store.FieldAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FieldModel',
//    autoLoad: true,
    require: [
        'Ext.data.Store', 
        'sisprod.model.FieldModel'
    ],
  

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/fields/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idField',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});