Ext.define('sisprod.model.LocationTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idLocationType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'locationTypeName', type: 'string', visible: true},
        {name: 'locationTypeAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idLocationType'
});