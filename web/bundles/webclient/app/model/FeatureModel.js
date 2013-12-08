Ext.define('sisprod.model.FeatureModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idFeature', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'featureName', type: 'string', visible: true},
        {name: 'featureType.idFeatureType', type: 'int', visible: false, mapping:'featureType.idFeatureType'},
        {name: 'featureType.featureTypeName', type: 'string', visible: true, mapping:'featureType.featureTypeName'},
        {name: 'measureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'measureUnit.idMeasureUnit'},
        {name: 'measureUnit.measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'}
    ],
    idProperty: 'idFeature'
});