Ext.define('sisprod.model.FluidLevelFileModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idFluidLevelFile', type: 'int', visible: false},
        {name: 'fileName', type: 'string', visible: true},
        {name: 'fluidLevel.idFluidLevel', type: 'int', visible: false,mapping:'fluidLevel.idFluidLevel'}        
    ],

    idProperty: 'idFluidLevelFile'
});