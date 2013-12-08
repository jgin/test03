Ext.define('sisprod.store.EquipmentComponent', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/equipments/listNotAssigned.htm'
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