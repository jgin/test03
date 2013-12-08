Ext.define('sisprod.store.EquipmentTypeAll', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/equipmentTypes/listAll.htm'
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