/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WellGroupModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellGroup', type: 'int', visible: false}, 
        {name: 'wellGroupName', type: 'string', visible: true}
    ],

    idProperty: 'idWellGroup'
});