Ext.define('sisprod.store.BloodGroupAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.BloodGroupModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.BloodGroupModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read:'rest/bloodGroups/listAll.htm'
        },
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idBloodGroup',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});