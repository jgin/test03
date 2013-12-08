Ext.define('sisprod.store.EquipmentAllByTypeAndLot', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentTempModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentTempModel'
    ],

    pageSize: 10,

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/equipments/listPagingByEquipmentTypeAndLot.htm'
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