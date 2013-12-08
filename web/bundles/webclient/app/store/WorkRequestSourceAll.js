Ext.define('sisprod.store.WorkRequestSourceAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WorkRequestSourceModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WorkRequestSourceModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/workRequestSource/listAll.htm'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'id',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});