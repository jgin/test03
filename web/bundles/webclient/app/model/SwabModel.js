Ext.define('sisprod.model.SwabModel', {
    extend: 'Ext.data.Model',
    require:[
        'Ext.data.Model'
    ],
    fields:[
        {name: 'idSwab', type: 'int', visible: false},
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping:'productionPeriod.idProductionPeriod'},
        {name: 'registerEmployee.IdEmployee', type: 'int', visible: false, mapping:'registerEmployee.IdEmployee'},
        {name: 'registerEmployee.person.personFullName', type: 'string', visible: true, mapping:'registerEmployee.person.personFullName'},
        {name: 'approvedEmployee.IdEmployee', type: 'int', visible: false, mapping:'approvedEmployee.IdEmployee'},
        {name: 'approvedEmployee.person.personFullName', type: 'string', visible: false, mapping:'approvedEmployee.person.personFullName'},
        {name: 'approved', type: 'boolean', visible: false},
        {name: 'well.idWell', type: 'int', visible: false, mapping:'well.idWell'},
        {name: 'well.wellName', type: 'string', visible: true, mapping:'well.wellName'},
        {name: 'entity.entityId', type: 'int', visible: false, mapping:'entity.entityId'},
        {name: 'entity.entityName', type: 'string', visible: true, mapping:'entity.entityName'},
        {name: 'oil', type: 'double', visible: true},
        {name: 'oilMeasureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'oilMeasureUnit.idMeasureUnit'},
        {name: 'oilMeasureUnit.measureUnitName', type: 'string', visible: true, mapping:'oilMeasureUnit.measureUnitAcronym'},
        {name: 'water', type: 'double', visible: true},
        {name: 'waterMeasureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'waterMeasureUnit.idMeasureUnit'},
        {name: 'waterMeasureUnit.measureUnitName', type: 'string', visible: true, mapping:'waterMeasureUnit.measureUnitAcronym'},
        {name: 'battery.idBattery', type: 'int', visible: false, mapping:'battery.idBattery'},
        {name: 'battery.batteryName', type: 'string', visible: true, mapping:'battery.batteryName'},
        {name: 'runNumber', type: 'int', visible: true},
        {name: 'pistonDepth', type: 'double', visible: true},
        {name: 'stayTime', type: 'double', visible: true},
        {name: 'initialLevel', type: 'double', visible: true},
        {name: 'finalLevel', type: 'double', visible: true}
    ],
    idProperty: 'idSwab'
});