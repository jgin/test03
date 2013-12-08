Ext.define('sisprod.model.PersonModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
        
    ],

    fields:[
        {name: 'idPerson', type: 'int', visible: false},
        {name: 'entityId', type: 'int', visible: false},
        {name: 'entityId', type: 'int', visible: false},
        {name: 'idBloodGroup', type: 'int', visible: false},
        {name: 'idDocumentType', type: 'string', visible: false},
        {name: 'documentNumber', type: 'string', visible: true},
        {name: 'paternalSurname', type: 'string', visible: true},
        {name: 'maternalSurname', type: 'string', visible: true},
        {name: 'personName', type: 'string', visible: true},
        {name: 'digitalSignature', type: 'string', visible: false}
//        {name: 'address', type: 'string', visible: false, mapping:'measureUnit.idMeasureUnit'},
//        {name: 'email', type: 'string', visible: false},
//        {name: 'phone', type: 'string', visible: false}
    ],

    idProperty: 'idPerson'
});