Ext.define('sisprod.model.ToolTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idToolType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'toolTypeName', type: 'string', visible: true}
    ],

    idProperty: 'idToolType'
});