/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WellTestTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellTestType', type: 'int', visible: false},
        {name: 'wellTestTypeCode', type: 'string', visible: true},
        {name: 'wellTestTypeName', type: 'string', visible: true}
    ],

    idProperty: 'idWellTestType'
});