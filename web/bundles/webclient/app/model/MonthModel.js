/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.MonthModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idMonth', type: 'int', visible: false}, 
        {name: 'monthName', type: 'string', visible: true}
    ],

    idProperty: 'idMonth'
});