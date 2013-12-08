Ext.define('sisprod.model.GasTargetTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idGasTargetType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'gasTargetTypeName', type: 'string', visible: true}
    ],

    idProperty: 'idGasTargetType'
});