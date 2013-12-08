Ext.define('sisprod.store.EquipmentNotAsignedTemplate', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/equipments/listPagingNotAssigned.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idEquipment',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});