Ext.define('sisprod.model.FeatureTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idFeatureType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'featureTypeName', type: 'string', visible: true}
    ],

    idProperty: 'idFeatureType'
});