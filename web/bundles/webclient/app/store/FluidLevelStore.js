Ext.define('sisprod.store.FluidLevelStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FluidLevelModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.FluidLevelModel'
    ],
    remoteSort : true,
    proxy:{
        type: 'ajax',
        
        api: {
            read:'rest/fluidLevel/list.htm',
            destroy:'rest/fluidLevel/delete.htm',
            create:'rest/fluidLevel/register.htm',
            update:'rest/fluidLevel/update.htm',
            activate:'rest/fluidLevel/activate.htm'
        },
       reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idFluidLevel',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});