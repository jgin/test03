Ext.define('sisprod.model.FieldModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idField', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'fieldName', type: 'string', visible: true},
        {name: 'lot.idLot', type: 'int', visible: false, mapping:'lot.idLot'},
        {name: 'lot.lotName', type: 'string', visible: true, mapping:'lot.lotName'}
    ],

    idProperty: 'idField'
});