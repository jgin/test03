/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.ProductionForecastModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idProductionForecast', type: 'int', visible: false}, 
        {name: 'idLot', type: 'int', visible: false, mapping: 'lot.idLot'},
        {name: 'lotName', type: 'string', visible: true, mapping: 'lot.lotName'},
        {name: 'productionForecastName', type: 'string', visible: true},
        {name: 'effectiveStartDate', type: 'string', visible: true},
        {name: 'effectiveEndDate', type: 'string', visible: true}
    ],

    idProperty: 'idProductionForecast'
});