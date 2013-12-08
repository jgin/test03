Ext.define('sisprod.model.EvidenceDocumentTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idEvidenceDocumentType', type: 'int', visible: false}, 
        {name: 'evidenceDocumentTypeName', type: 'string', visible: true},
        {name: 'evidenceDocumentTypeCode', type: 'string', visible: true},
        {name: 'directoryName', type: 'string', visible: false},
        {name: 'required', type: 'boolean', visible: false}
    ],

    idProperty: 'idEvidenceDocumentType'
});