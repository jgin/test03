Ext.define('sisprod.store.FluidLevelTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.FluidLevelTypeModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.FluidLevelTypeModel'
    ],
    remoteSort : true,
    proxy:{
        type: 'ajax',
        
        api: {
            read:'rest/fluidLevelType/list.htm',
            destroy:'rest/fluidLevelType/delete.htm',
            create:'rest/fluidLevelType/register.htm',
            update:'rest/fluidLevelType/update.htm',
            activate:'rest/fluidLevelType/activate.htm'
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