Ext.define('sisprod.model.ToolModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idTool', type: 'int', visible: false},
        {name: 'toolName', type: 'string', visible: true},
        {name: 'toolCode', type: 'string', visible: true},
        {name: 'stock', type: 'float', visible: true},        
        {name: 'toolType.idToolType', type: 'int', visible: false, mapping:'toolType.idToolType'},
        {name: 'toolType.toolTypeName', type: 'string', visible: true, mapping:'toolType.toolTypeName'},
        {name: 'measureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'measureUnit.idMeasureUnit'},
        {name: 'measureUnit.measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'}      
    ],

    idProperty: 'idTool'
});