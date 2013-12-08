Ext.define('sisprod.store.EquipmentTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentTypeModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/equipmentTypes/list.htm',
            destroy: 'rest/equipmentTypes/delete.htm',
            create: 'rest/equipmentTypes/register.htm',
            update: 'rest/equipmentTypes/update.htm',
            activate: 'rest/equipmentTypes/activate.htm'
        },
        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idEquipmentType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});