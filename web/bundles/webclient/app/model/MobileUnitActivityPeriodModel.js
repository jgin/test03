Ext.define('sisprod.model.MobileUnitActivityPeriodModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields:[
        {name: 'idMobileUnitActivityPeriod', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'idProductionPeriod', type: 'int', visible: false, mapping: 'productionPeriod.idProductionPeriod'},
        {name: 'productionPeriodDate', type: 'date', dateFormat: 'Y-m-d', visible: true, mapping: 'productionPeriod.productionPeriodDate'},
        {name: 'idMobileUnit', type: 'int', visible: false, mapping: 'mobileUnit.idMobileUnit'},
        {name: 'mobileUnitName', type: 'string', visible: true, mapping: 'mobileUnit.equipment.equipmentName'},
        {name: 'operativeHour', type: 'float', visible: true},
        {name: 'operativeEfficiency', type: 'float', visible: true}
    ],
    idProperty: 'idMobileUnitActivityPeriod'
});