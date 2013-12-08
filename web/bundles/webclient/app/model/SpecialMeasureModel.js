Ext.define('sisprod.model.SpecialMeasureModel', {
    extend: 'Ext.data.Model',
    require:[
        'Ext.data.Model'
    ],
    fields:[
        {name: 'idSpecialMeasure', type: 'int', visible: false},
        {name: 'battery.idBattery', type: 'int', visible: false, mapping:'battery.idBattery'},
        {name: 'battery.batteryName', type: 'string', visible: true, mapping:'battery.batteryName'},
        {name: 'well.idWell', type: 'int', visible: false, mapping:'well.idWell'},
        {name: 'well.wellName', type: 'string', visible: true, mapping:'well.wellName'},
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping:'productionPeriod.idProductionPeriod'},
        {name: 'oil', type: 'double', visible: true},
        {name: 'oilMeasureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'oilMeasureUnit.idMeasureUnit'},
        {name: 'oilMeasureUnit.measureUnitName', type: 'string', visible: true, mapping:'oilMeasureUnit.measureUnitAcronym'},
        {name: 'water', type: 'double', visible: true},
        {name: 'waterMeasureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'waterMeasureUnit.idMeasureUnit'},
        {name: 'waterMeasureUnit.measureUnitName', type: 'string', visible: true, mapping:'waterMeasureUnit.measureUnitAcronym'},
        {name: 'totalHours', type: 'float', visible: true},
        {name: 'observation', type: 'string', visible: true}
    ],
    idProperty: 'idSpecialMeasure'
});