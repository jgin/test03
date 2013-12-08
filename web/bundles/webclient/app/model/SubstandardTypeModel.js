Ext.define('sisprod.model.SubstandardTypeModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idSubstandardType', type: 'int', visible: false},
        {name: 'substandardTypeName', type: 'string', visible: true},
        {name: 'substandardTypeAcronym', type: 'string', visible: true}
    ],
    idProperty: 'idSubstandardType'
});