Ext.define('sisprod.model.FluidLevelTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idFluidLevelType', type: 'int', visible: false},
        {name: 'fluidLevelTypeName', type: 'string', visible: true},
        {name: 'fluidLevelTypeAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idFluidLevelType'
});