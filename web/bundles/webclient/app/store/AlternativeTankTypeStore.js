Ext.define('sisprod.store.AlternativeTankTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.AlternativeTankTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.AlternativeTankTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/alternativeTankTypes/list.htm',
            destroy: 'rest/alternativeTankTypes/delete.htm',
            create: 'rest/alternativeTankTypes/register.htm',
            update: 'rest/alternativeTankTypes/update.htm',    
            activate: 'rest/alternativeTankTypes/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idAlternativeTankType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});