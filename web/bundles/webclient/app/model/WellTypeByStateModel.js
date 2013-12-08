/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WellTypeByStateModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellTypeByState', type: 'int', visible: false}, 
        {name: 'idWellState', type: 'int', visible: false, mapping: 'wellState.idWellState'},
        {name: 'wellTypeByStateName', type: 'string', visible: true},
        {name: 'wellTypeByStateAcronym', type: 'string', visible: true},
        {name: 'wellStateName', type: 'string', visible: true, mapping: 'wellState.wellStateName'}
    ],

    idProperty: 'idWellTypeByState'
});