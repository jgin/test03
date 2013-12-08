Ext.define('sisprod.store.AllocatedEquipmentStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.AllocatedEquipmentModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.AllocatedEquipmentModel'
    ],
    
    pageSize: 10,
    
    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read: 'POST'
        },
        
        api: {
            read:'rest/fluidLevel/listAllocatedEquipments.htm'
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