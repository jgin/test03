Ext.define('login.model.LotModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idLot', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'externalId', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'lotName', type: 'string', visible: true},
        {name: 'lotAcronym', type: 'string', visible: true},
        {name: 'area', type: 'float', visible: true},        
        {name: 'measureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'measureUnit.idMeasureUnit'},
        {name: 'measureUnit.measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'},
        {name: 'suscriptionDate', type: 'date', dateFormat: 'Y-m-d', visible: true}
    ],

    idProperty: 'idLot'
});