Ext.define('sisprod.store.EquipmentAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/equipments/listAll.htm'
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