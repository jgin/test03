Ext.define('sisprod.model.SubstandardModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idSubstandard', type: 'int', visible: false},
        {name: 'substandardName', type: 'string', visible: true},
        {name: 'substandardAcronym', type: 'string', visible: true},
        {name: 'idSubstandardType', type: 'int', visible: false, mapping: 'substandardType.idSubstandardType'},
        {name: 'substandardTypeName', type: 'string', visible: true, mapping: 'substandardType.substandardTypeName'}
    ],
    idProperty: 'idSubstandard'
});