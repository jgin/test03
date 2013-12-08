Ext.define('sisprod.store.Member', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.Member',

    require: [
        'Ext.data.Store', 
        'sisprod.model.Member'
    ],

    proxy:{
        type: 'ajax',
        url:'http://localhost:7070/sisprod-service-http/rest/members',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'members',
            idProperty: 'id',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});