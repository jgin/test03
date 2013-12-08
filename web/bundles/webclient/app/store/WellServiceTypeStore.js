Ext.define('sisprod.store.WellServiceTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellServiceTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.WellServiceTypeModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/wellServiceType/list.htm',
            destroy: 'rest/wellServiceType/delete.htm',
            create: 'rest/wellServiceType/register.htm',
            update: 'rest/wellServiceType/update.htm',
            activate: 'rest/wellServiceType/activate.htm'
            
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWellServiceType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});