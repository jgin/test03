/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WellTypeByProductionModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellTypeByProduction', type: 'int', visible: false}, 
        {name: 'wellTypeByProductionName', type: 'string', visible: true},
        {name: 'acronym', type: 'string', visible: true},
        {name: 'minPercentage', type: Ext.data.Types.FLOAT, visible: true},
        {name: 'maxPercentage', type: Ext.data.Types.FLOAT, visible: true}
    ],

    idProperty: 'idWellTypeByProduction'
});