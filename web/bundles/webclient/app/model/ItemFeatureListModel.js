/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.ItemFeatureListModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idItemFeatureList', type: 'int', visible: false}, 
        {name: 'idFeature', type: 'int', visible: false, mapping: 'feature.idFeature'},
        {name: 'featureName', type: 'string', visible: true, mapping: 'feature.featureName'},
        {name: 'itemValue', type: 'string', visible: true}
    ],

    idProperty: 'idItemFeatureList'
});