Ext.define('sisprod.model.GeoFormationModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idGeologicFormation', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'geoFormationName', type: 'string', visible: true}
    ],

    idProperty: 'idGeologicFormation'
});