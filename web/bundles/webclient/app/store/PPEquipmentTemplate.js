Ext.define('sisprod.store.PPEquipmentTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.PPEquipmentModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.PPEquipmentModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read: 'POST'
        },
        
        api: {
            read: 'rest/ppEquipment/listPaging.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idPPEquipment',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});