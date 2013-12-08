/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.ExtractionTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idExtractionType', type: 'int', visible: false}, 
        {name: 'idWellTypeByState', type: 'int', visible: false, mapping: 'wellTypeByState.idWellTypeByState'},
        {name: 'extractionTypeName', type: 'string', visible: true},
        {name: 'extractionTypeAcronym', type: 'string', visible: true},
        {name: 'wellTypeByStateName', type: 'string', visible: true, mapping: 'wellTypeByState.wellTypeByStateName'}
    ],

    idProperty: 'idExtractionType'
});