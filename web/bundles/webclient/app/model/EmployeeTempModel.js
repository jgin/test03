Ext.define('sisprod.model.EmployeeTempModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
        
    ],

    fields:[
        {name: 'idEmployee', type: 'int', visible: false},
        {name: 'idPerson', type: 'int', visible: false, mapping: 'person.idPerson'},
        {name: 'personFullName', type: 'string', visible: true, mapping: 'person.personFullName'},
        {name: 'fullDocumentNumber', type: 'string', visible: true, mapping: 'person.fullDocumentNumber'}
    ],

    idProperty: 'idEmployee'
});