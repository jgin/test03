/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WellFeatureModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellFeature', type: 'int', visible: false}, 
        {name: 'idMeasureUnit', type: 'int', visible: false, mapping: 'measureUnit.idMeasureUnit'},
        {name: 'idFeatureType', type: 'int', visible: false, mapping: 'featureType.idFeatureType'},
        {name: 'wellFeatureName', type: 'string', visible: true},
        {name: 'featureTypeName', type: 'string', visible: true, mapping: 'featureType.featureTypeName'},
        {name: 'measureUnitName', type: 'string', visible: true, mapping: 'measureUnit.measureUnitName'},
        {name: 'updateInWellTest', type: 'boolean', visible: true},
        {name: 'updateInWellService', type: 'boolean', visible: true}
    ],

    idProperty: 'idWellFeature'
});