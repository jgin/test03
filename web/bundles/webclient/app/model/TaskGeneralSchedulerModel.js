Ext.define('sisprod.model.TaskGeneralSchedulerModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idTaskGeneralScheduler', type: 'int', visible: false},
        {name: 'employee.idEmployee', type: 'int', visible: false, mapping: 'employee.idEmployee'},
        {name: 'employee.person.personFullName', type: 'string', visible: true, mapping: 'employee.person.personFullName'},
        {name: 'employee.person.documentType.documentTypeAcronym', type: 'string', visible: true, mapping: 'employee.person.documentType.documentTypeAcronym'},
        {name: 'employee.person.documentNumber', type: 'string', visible: true, mapping: 'employee.person.documentNumber'},
        {name: 'employee.dependency.dependencyName', type: 'string', visible: true, mapping: 'employee.dependency.dependencyName'}
    ],

    idProperty: 'idTaskGeneralScheduler'
});