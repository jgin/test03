Ext.define('sisprod.store.EquipmentTypeForOt', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.EquipmentTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.EquipmentTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/equipmentTypes/listForOt.htm'
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