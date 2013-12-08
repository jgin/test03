Ext.define('sisprod.model.FieldGeoFormationModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idFieldGeoFormation', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'fieldGeoFormationName', type: 'string', visible: true}
    ],

    idProperty: 'idFieldGeoFormation'
});