Ext.define('sisprod.store.PPEquipmentStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.PPEquipmentModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.PPEquipmentModel'
    ],

    proxy:{
        type: 'ajax',
        
        api: {
            read: 'rest/ppEquipment/list.htm',
            destroy: 'rest/ppEquipment/delete.htm',
            create: 'rest/ppEquipment/register.htm',
            update: 'rest/ppEquipment/update.htm',
            activate: 'rest/ppEquipment/activate.htm'
        },
//        url:'rest/pPEquipments/list.htm',

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idPPEquipment',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});