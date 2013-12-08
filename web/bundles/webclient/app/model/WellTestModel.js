/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WellTestModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellTest', type: 'int', visible: false},
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping: 'productionPeriod.idProductionPeriod'},
        {name: 'well.idWell', type: 'int', visible: false, mapping: 'well.idWell'},
        {name: 'productionPeriod.productionPeriodDate', type: 'date', dateFormat: 'Y-m-d', visible: true, mapping: 'productionPeriod.productionPeriodDate'},
        {name: 'well.wellCode', type: 'string', visible: true, mapping : 'well.wellCode'},
        {name: 'battery.idBattery', type: 'int', visible: false, mapping : 'battery.idBattery'},
        {name: 'battery.batteryCode', type: 'string', visible: true, mapping : 'battery.batteryCode'},
        {name: 'testHours' , type : 'string', visible : true },
        {name: 'wellTestType.idWellTestType' , type : 'string', visible : false, mapping : 'wellTestType.idWellTestType' },
        {name: 'wellTestType.wellTestTypeName' , type : 'string', visible : true, mapping: 'wellTestType.wellTestTypeName' },
        {name: 'oilQuantity' , type : 'string', visible : true },
        {name: 'gasQuantity' , type : 'string', visible : true },
        {name: 'waterQuantity' , type : 'string', visible : true },
        {name: 'gor' , type : 'string', visible : true },
        {name: 'forProductionForecast' , type : 'boolean', visible : true },
        {name: 'comments' , type : 'string', visible : true },
        {name: 'updateWellParamsAndFeaturesButton' , type : 'string', visible : true }
    ],

    idProperty: 'idWellTest'
});