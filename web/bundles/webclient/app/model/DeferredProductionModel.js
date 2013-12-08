Ext.define('sisprod.model.DeferredProductionModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idDeferredProduction', type: 'int', visible: false},
        {name: 'well.idWell', type: 'int', visible: false, mapping:'well.idWell'},
        {name: 'well.wellCode', type: 'string', visible: true, mapping:'well.wellCode'},
        {name: 'well.wellName', type: 'string', visible: false, mapping:'well.wellName'},
        {name: 'battery.idBattery', type: 'int', visible: false, mapping:'battery.idBattery'},
        {name: 'battery.batteryCode', type: 'string', visible: true, mapping:'battery.batteryCode'},
        {name: 'battery.batteryName', type: 'string', visible: false, mapping:'battery.batteryName'},
        {name: 'deferredProductionReason.idDeferredProductionReason', type: 'int', visible: false, mapping:'deferredProductionReason.idDeferredProductionReason'},
        {name: 'deferredProductionReason.deferredProductionReasonName', type: 'string', visible: true, mapping:'deferredProductionReason.deferredProductionReasonName'},
        {name: 'totalHours', type: 'int', visible: true},        
        {name: 'totalMinute', type: 'int', visible: true},
        {name: 'forecastOil', type: 'int', visible: true,align:true},        
        {name: 'deferredNumber', type: 'float', visible: true},
        {name: 'offWell', type: 'boolean', visible: true},     
        {name: 'comment', type: 'string', visible: true},   
        {name: 'battery.lot.idLot', type: 'int', visible: false, mapping:'battery.lot.idLot'},
        {name: 'battery.lot.lotName', type: 'string', visible: false, mapping:'battery.lot.lotName'},
        {name: 'measureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'measureUnit.idMeasureUnit'},
        {name: 'measureUnit.measureUnitName', type: 'string', visible: false, mapping:'measureUnit.measureUnitName'},
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping:'productionPeriod.idProductionPeriod'},
        {name: 'productionPeriod.productionPeriodDate', type: 'date', dateFormat: 'Y-m-d', visible: false,mapping:'productionPeriod.productionPeriodDate'},
        {name: 'productionPeriodDate', type: 'string',visible: true,mapping:'productionPeriod.productionPeriodDate'}
    ],

    idProperty: 'idDeferredProduction'
});