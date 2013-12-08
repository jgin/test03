/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.ItemWellFeatureListModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idItemWellFeatureList', type: 'int', visible: false}, 
        {name: 'idWellFeature', type: 'int', visible: false, mapping: 'wellFeature.idWellFeature'},
        {name: 'wellFeatureName', type: 'string', visible: true, mapping: 'wellFeature.wellFeatureName'},
        {name: 'itemValue', type: 'string', visible: true}
    ],

    idProperty: 'idItemWellFeatureList'
});