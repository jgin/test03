Ext.define('sisprod.model.BatteryProductionApprovedModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idBatteryProduction', type: 'int', visible: false}, 
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping:'productionPeriod.IdProductionPeriod'},
        {name: 'battery.idBattery', type: 'int', visible: false, mapping:'battery.idBattery'},
        {name: 'battery.batteryName', type: 'string', visible: true, mapping:'battery.batteryName'},
        {name: 'oil', type: 'int', visible: true}, 
        {name: 'water', type: 'int', visible: true}, 
        {name: 'gas', type: 'int', visible: true}, 
        {name: 'swab', type: 'int', visible: true}, 
        {name: 'oilMeasureUnit.measureUnitAcronym', type: 'string', visible: false, mapping: 'oilMeasureUnit.measureUnitAcronym'}, 
        {name: 'waterMeasureUnit.measureUnitAcronym', type: 'int', visible: false, mapping: 'waterMeasureUnit.measureUnitAcronym'}, 
        {name: 'gasMeasureUnit.measureUnitAcronym', type: 'int', visible: false, mapping: 'gasMeasureUnit.measureUnitAcronym'}, 
        {name: 'wellNumber', type: 'int', visible: true}, 
        {name: 'adjustmentFactor', type: 'float', visible: false}, 
        {name: 'netProduction', type: 'float', visible: false},
        {name: 'registerIdEmployee.idEmployee', type: 'int', visible: false, mapping:'registerIdEmployee.idEmployee'}, 
        {name: 'approveIdEmployee.idEmployee', type: 'int', visible: false, mapping:'approveIdEmployee.idEmployee'},
        {name: 'oilTransfer', type: 'int', visible: false},
        {name: 'oilPrevios', type: 'int', visible: false},
        {name: 'oilProduction', type: 'int', visible: false},
        {name: 'oilForecast', type: 'float', visible: true}
    ],

    idProperty: 'idBatteryProduction'
});