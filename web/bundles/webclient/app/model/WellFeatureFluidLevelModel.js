Ext.define('sisprod.model.WellFeatureFluidLevelModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellFeature', type: 'int'},
        {name: 'wellFeatureName', type: 'string'},
        {name: 'wellFeatureType', type: 'string'},
        {name: 'measureUnit', type: 'string'},
        {name: 'checked', type: 'boolean'}
    ],

    idProperty: 'idBloodGroup'
});