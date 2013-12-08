/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.ProductionForecastWellModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idProductionForecastWell', type: 'int', visible: false}, 
        {name: 'idProductionForecast', type: 'int', visible: false, mapping: 'productionForecast.idProductionForecast'},
        {name: 'productionForecastName', type: 'string', visible: false, mapping: 'productionForecast.productionForecastName'},
        {name: 'idBattery', type: 'int', visible: false, mapping: 'productionForecast.idBattery'},
        {name: 'batteryName', type: 'string', visible: false, mapping: 'battery.batteryName'},
        {name: 'idWell', type: 'int', visible: false, mapping: 'well.idWell'},
        {name: 'wellName', type: 'string', visible: false, mapping: 'well.wellName'},
        {name: 'wellCode', type: 'string', visible: true, mapping: 'well.wellCode'},
        {name: 'idExtractionType', type: 'int', visible: false, mapping: 'extractionType.idExtractionType'},
        {name: 'extractionTypeName', type: 'string', visible: false, mapping: 'extractionType.extractionTypeName'},
        {name: 'extractionTypeAcronym', type: 'string', visible: true, mapping: 'extractionType.extractionTypeAcronym'},
        {name: 'oil', type: Ext.data.Types.FLOAT, visible: true},
        {name: 'water', type: Ext.data.Types.FLOAT, visible: true},
        {name: 'gas', type: Ext.data.Types.FLOAT, visible: true},
        {name: 'workingTime', type: Ext.data.Types.FLOAT, visible: true},
        {name: 'breakTime', type: Ext.data.Types.FLOAT, visible: true},
        {name: 'onHours', type: Ext.data.Types.FLOAT, visible: true},
        {name: 'offHours', type: Ext.data.Types.FLOAT, visible: true},
        {name: 'startupHour', type: 'string', visible: true},
        {name: 'endHour', type: 'string', visible: true}
    ],

    idProperty: 'idProductionForecastWell'
});