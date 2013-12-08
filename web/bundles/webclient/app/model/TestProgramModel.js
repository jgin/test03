/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.TestProgramModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idTestProgram', type: 'int', visible: false}, 
        {name: 'idLot', type: 'int', visible: false, mapping: 'lot.idLot'}, 
        {name: 'lotName', type: 'string', visible: true, mapping: 'lot.lotName'}, 
        {name: 'idEmployee', type: 'int', visible: false, mapping: 'employee.idEmployee'}, 
        {name: 'employeeElaborationName', type: 'string', visible: true}, 
        {name: 'elaborationDate', type: 'string', visible: true},
        {name: 'effectiveStartDate', type: 'string', visible: true},
        {name: 'effectiveEndDate', type: 'string', visible: true},
        {name: 'comment', type: 'string', visible: false}
    ],

    idProperty: 'idTestProgram'
});