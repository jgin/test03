/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WellModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWell', type: 'int', visible: false}, 
        {name: 'wellName', type: 'string', visible: true},
        {name: 'wellCode', type: 'string', visible: true},
        {name: 'externalId', type: 'string', visible: false},
        {name: 'lot.idLot', type: 'int', visible: false, mapping: 'lot.idLot'},
        {name: 'lot.lotName', type: 'string', visible: true, mapping: 'lot.lotName'},
        {name: 'location.idLocation', type: 'int', visible: false, mapping: 'location.idLocation'},
        {name: 'location.locationName', type: 'string', visible: true, mapping: 'location.locationName'},
        {name: 'wellState.idWellState', type: 'int', visible: false, mapping: 'wellState.idWellState'},
        {name: 'wellState.wellStateName', type: 'string', visible: true, mapping: 'wellState.wellStateName'},
        {name: 'wellGroup.idWellGroup', type: 'int', visible: false, mapping: 'wellGroup.idWellGroup'},
        {name: 'wellGroup.wellGroupName', type: 'string', visible: true, mapping: 'wellGroup.wellGroupName'},
        {name: 'field.idField', type: 'int', visible: false, mapping: 'field.idField'},
        {name: 'field.fieldName', type: 'string', visible: true, mapping: 'field.fieldName'},
        {name: 'battery.idBattery', type: 'int', visible: false, mapping: 'battery.idBattery'},
        {name: 'battery.batteryName', type: 'string', visible: true, mapping: 'battery.batteryName'},
        {name: 'wellTypeByProduction.idWellTypeByProduction', type: 'int', visible: false, mapping: 'wellTypeByProduction.idWellTypeByProduction'},
        {name: 'wellTypeByProduction.wellTypeByProductionName', type: 'string', visible: true, mapping: 'wellTypeByProduction.wellTypeByProductionName'},
        {name: 'wellTypeByProduction.wellTypeByProductionAcronym', type: 'string', visible: false, mapping: 'wellTypeByProduction.acronym'},
        {name: 'wellTypeByState.idWellTypeByState', type: 'int', visible: false, mapping: 'wellTypeByState.idWellTypeByState'},
        {name: 'wellTypeByState.wellTypeByStateName', type: 'string', visible: true, mapping: 'wellTypeByState.wellTypeByStateName'},
        {name: 'extractionType.idExtractionType', type: 'int', visible: false, mapping: 'extractionType.idExtractionType'},
        {name: 'extractionType.extractionTypeName', type: 'string', visible: true, mapping: 'extractionType.extractionTypeName'},
        {name: 'oilMeasureUnit.oilIdMesureUnit', type: 'int', visible: false, mapping: 'oilMeasureUnit.idMeasureUnit'},
        {name: 'oilMeasureUnit.oilMeasureUnitName', type: 'string', visible: false, mapping: 'oilMeasureUnit.measureUnitName'},
        {name: 'waterMeasureUnit.waterIdMeasureUnit', type: 'int', visible: false, mapping: 'waterMeasureUnit.idMeasureUnit'},
        {name: 'waterMeasureUnit.waterMeasureUnitName', type: 'string', visible: false, mapping: 'waterMeasureUnit.measureUnitName'},
        {name: 'gasMeasureUnit.gasIdMeasureUnit', type: 'int', visible: false, mapping: 'gasMeasureUnit.idMeasureUnit'},
        {name: 'gasMeasureUnit.gasMeasureUnitName', type: 'string', visible: false, mapping: 'gasMeasureUnit.measureUnitName'},
        {name: 'workingTime', type: 'string', visible: false},
        {name: 'breakTime', type: 'string', visible: false},
        {name: 'oil', type: 'string', visible: false},
        {name: 'water', type: 'string', visible: false},
        {name: 'gas', type: 'string', visible: false},
        {name: 'startupHour', type: 'string', visible: false},
        {name: 'endHour', type: 'string', visible: false},
        {name: 'carreraMeasureUnit.carreraIdMeasureUnit', type: 'int', visible: false, mapping: 'carreraMeasureUnit.idMeasureUnit'},
        {name: 'carreraMeasureUnit.carreraMeasureUnitName', type: 'string', visible: false, mapping: 'carreraMeasureUnit.measureUnitName'},
        {name: 'carrera', type: 'string', visible: false},
        {name: 'spm', type: 'string', visible: false},
        {name: 'onHours', type: 'string', visible: false},
        {name: 'offHours', type: 'string', visible: false}        
    ],

    idProperty: 'idWell'
});