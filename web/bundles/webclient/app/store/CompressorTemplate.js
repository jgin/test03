Ext.define('sisprod.store.CompressorTemplate', {
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
            read: 'rest/equipments/listCompressors.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idLocation',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});