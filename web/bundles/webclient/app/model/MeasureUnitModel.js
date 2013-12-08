Ext.define('sisprod.model.MeasureUnitModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'measureUnitType.idMeasureUnitType', type: 'int', visible: false, mapping: 'measureUnitType.idMeasureUnitType'},
        {name: 'measureUnitType.measureUnitTypeName', type: 'string', visible: true, mapping: 'measureUnitType.measureUnitTypeName'},
        {name: 'idMeasureUnit', type: 'int', visible: false},
        {name: 'isBaseUnit', type: 'boolean', visible: true},
        {name: 'measureUnitName', type: 'string', visible: true},
        {name: 'measureUnitAcronym', type: 'string', visible: true},
        {name: 'baseConversion', type: 'float', visible: true}
    ],

    idProperty: 'idMeasureUnit'
});