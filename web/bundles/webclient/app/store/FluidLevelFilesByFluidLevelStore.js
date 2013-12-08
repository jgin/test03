Ext.define('sisprod.store.FluidLevelFilesByFluidLevelStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FluidLevelFileModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.FluidLevelFileModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read: 'POST'
        },
        
        api: {
            read: 'rest/fluidLevelFile/listByFluidLevel.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idFluidLevelFile',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});