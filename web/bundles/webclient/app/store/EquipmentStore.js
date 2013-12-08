Ext.define('sisprod.store.EquipmentStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/equipments/list.htm',
            destroy: 'rest/equipments/delete.htm',
            create: 'rest/equipments/register.htm',
            update: 'rest/equipments/update.htm',
            activate: 'rest/equipments/activate.htm'
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