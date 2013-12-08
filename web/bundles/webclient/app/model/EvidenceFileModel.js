Ext.define('sisprod.model.EvidenceFileModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idEvidenceFile', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'fileName', type: 'string', visible: true},
        {name: 'evidenceDocumentType.idEvidenceDocumentType', type: 'int', visible: false,mapping:'evidenceDocumentType.idEvidenceDocumentType'},
        {name: 'evidenceDocumentType.evidenceDocumentTypeName', type: 'string', visible: true,mapping:'evidenceDocumentType.evidenceDocumentTypeName'},
        {name: 'workOrder.idWorkOrder', type: 'int', visible: false,mapping:'workOrder.idWorkOrder'}        
    ],

    idProperty: 'idEvidenceFile'
});