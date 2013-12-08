/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WellStateModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellState', type: 'int', visible: false}, 
        {name: 'wellStateName', type: 'string', visible: true},
        {name: 'acronym', type: 'string', visible: true}
    ],

    idProperty: 'idWellState'
});