Ext.define('sisprod.model.AlternativeTankTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idAlternativeTankType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'alternativeTankTypeName', type: 'string', visible: true},
        {name: 'alternativeTankTypeAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idAlternativeTankType'
});