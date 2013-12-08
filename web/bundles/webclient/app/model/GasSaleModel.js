Ext.define('sisprod.model.GasSaleModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idGasSale', type: 'int', visible: false},
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping:'productionPeriod.idProductionPeriod'},
        {name: 'productionPeriod.productionPeriodDate', type: 'date', visible: true, dateFormat: 'Y-m-d', mapping:'productionPeriod.productionPeriodDate'},
        {name: 'saleHours', type: 'float', visible: true},
        {name: 'quantity', type: 'float', visible: true},
        {name: 'measureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'measureUnit.idMeasureUnit'},
        {name: 'measureUnit.measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'},
        {name: 'auditedSale', type: 'boolean', visible: true}
    ],
    idProperty: 'idGasSale'
});