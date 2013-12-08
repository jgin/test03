Ext.define('sisprod.model.OilSaleModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idOilSale', type: 'int', visible: false},
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping:'productionPeriod.idProductionPeriod'},
        {name: 'productionPeriod.productionPeriodDate', type: 'date', visible: true, dateFormat: 'Y-m-d', mapping:'productionPeriod.productionPeriodDate'},
        {name: 'tank.idTank', type: 'int', visible: false, mapping:'tank.idTank'},
        {name: 'tank.tankName', type: 'string', visible: true, mapping:'tank.tankName'},
        {name: 'measureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'measureUnit.idMeasureUnit'},
        {name: 'measureUnit.measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'},
        {name: 'quantity', type: 'float', visible: true}
    ],
    idProperty: 'idOilSale'
});