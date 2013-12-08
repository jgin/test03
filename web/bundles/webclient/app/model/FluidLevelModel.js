Ext.define('sisprod.model.FluidLevelModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idFluidLevel', type: 'int', visible: false},
        {name: 'well.wellName', type: 'string', visible: true, mapping: 'well.wellName'},
        {name: 'well.battery.batteryName', type: 'string', visible: true, mapping: 'well.battery.batteryName'},
        {name: 'carrera', type: 'string', visible: true, mapping: 'carrera'},
        {name: 'spm', type: 'string', visible: true, mapping: 'spm'},
        {name: 'productionPeriod.productionPeriodDate', type: 'date', dateFormat: 'Y-m-d', visible: true, mapping: 'productionPeriod.productionPeriodDate'},
        {name: 'fluidLevelType.fluidLevelTypeName', type: 'string', visible: true, mapping: 'fluidLevelType.fluidLevelTypeName'},
        {name: 'company.companyName', type: 'string', visible: true, mapping: 'company.companyName'},
        {name: 'fluidLevelMeasure.level', type: 'float', visible: true, mapping: 'fluidLevelMeasure.level'},
        {name: 'fluidLevelMeasure.submergence', type: 'float', visible: true, mapping: 'fluidLevelMeasure.submergence'},
        {name: 'fluidLevelMeasure.freeGas', type: 'float', visible: true, mapping: 'fluidLevelMeasure.freeGas'},
        {name: 'fluidLevelMeasure.pressionCasing', type: 'float', visible: true, mapping: 'fluidLevelMeasure.pressionCasing'},
        {name: 'fluidLevelMeasure.pressionTubing', type: 'float', visible: true, mapping: 'fluidLevelMeasure.pressionTubing'},
        {name: 'fluidLevelMeasure.gearboxExisting', type: 'float', visible: true, mapping: 'fluidLevelMeasure.gearboxExisting'},
        {name: 'manometricTest.initialLevel', type: 'float', visible: true, mapping: 'manometricTest.initialLevel'},
        {name: 'manometricTest.finalLevel', type: 'float', visible: true, mapping: 'manometricTest.finalLevel'},
        {name: 'manometricTest.minutes', type: 'float', visible: true, mapping: 'manometricTest.minutes'},
        {name: 'manometricTest.seconds', type: 'float', visible: true, mapping: 'manometricTest.seconds'}
    ],

    idProperty: 'idFluidLevel'
});