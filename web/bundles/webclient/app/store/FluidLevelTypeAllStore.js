Ext.define('sisprod.store.FluidLevelTypeAllStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FluidLevelTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.FluidLevelTypeModel'
    ],
    
    proxy:{
        type: 'ajax',
        
        api: {
            read:'rest/fluidLevelType/listAll.htm'
        },
       reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idFluidLevelType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});