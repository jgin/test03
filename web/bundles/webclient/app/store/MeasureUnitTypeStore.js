Ext.define('sisprod.store.MeasureUnitTypeStore',{
    extend: 'Ext.data.Store',
    model: 'sisprod.model.MeasureUnitTypeModel',
    
    require: [
        'Ext.data.Store',
        'sisprod.model.MeasureUnitTypeModel'
    ],
    
    proxy:{
        type: 'ajax',
        api:{
            read:'rest/measureUnitTypes/list.htm',
            destroy:'rest/measureUnitTypes/delete.htm',
            create: 'rest/measureUnitTypes/register.htm',
            update: 'rest/measureUnitTypes/update.htm',
            activate: 'rest/measureUnitTypes/activate.htm'
        },
        reader:{
            type:'json',
            useSimpleAccessors:true,
            root: 'data',
            idProperty: 'idMeasureUnitType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});

