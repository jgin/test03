Ext.define('sisprod.model.EmployeeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
        
    ],

    fields:[
        {name: 'idEmployee', type: 'int', visible: false},
        {name: 'idPerson', type: 'int', visible: false, mapping: 'person.idPerson'},
        {name: 'person.paternalSurname', type: 'string', visible: true, mapping: 'person.paternalSurname'},
        {name: 'person.maternalSurname', type: 'string', visible: true, mapping: 'person.maternalSurname'},
        {name: 'person.personName', type: 'string', visible: true, mapping: 'person.personName'},        
        {name: 'person.documentType.documentTypeAcronym', type: 'string', visible: true, mapping: 'person.documentType.documentTypeAcronym'},
        {name: 'person.documentType.documentTypeName', type: 'string', visible: false, mapping: 'person.documentType.documentTypeName'},
        {name: 'person.documentType.idDocumentType', type: 'string', visible: false, mapping: 'person.documentType.documentTypeName'},
        {name: 'person.documentNumber', type: 'string', visible: true, mapping: 'person.documentNumber'},
        {name: 'person.bloodGroup.bloodGroupName', type: 'string', visible: true, mapping: 'person.bloodGroup.bloodGroupName'},
        {name: 'defEntity.entityName', type: 'string', visible: true, mapping: 'defEntity.entityName'},
        {name: 'address', type: 'string', visible: false, mapping: 'person.defEntity.address'},
        {name: 'phone', type: 'string', visible: false, mapping: 'person.defEntity.phone'},
        {name: 'dependency.idDependency', type: 'int', visible: false, mapping: 'dependency.idDependency'},
        {name: 'dependency.dependencyName', type: 'string', visible: false, mapping: 'dependency.dependencyName'},
        {name: 'position.idPosition', type: 'int', visible: false, mapping: 'position.idPosition'},
        {name: 'position.positionName', type: 'string', visible: true, mapping: 'position.positionName'},
        {name: 'defEntity.email', type: 'string', visible: true, mapping: 'person.defEntity.email'},
        {name: 'person.digitalSignature', type: 'string', visible: false, mapping: 'person.digitalSignature'}
    ],

    idProperty: 'idEmployee'
});