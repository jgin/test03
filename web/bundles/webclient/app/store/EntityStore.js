Ext.define('sisprod.store.EntityStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EntityModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EntityModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/entity/list.htm',
            destroy: 'rest/entity/delete.htm',
            create: 'rest/entity/register.htm',
            update: 'rest/entity/update.htm'
        },
//        url:'rest/entity/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'entityId',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});