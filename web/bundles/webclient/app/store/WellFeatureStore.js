/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.WellFeatureStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellFeatureModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.WellFeatureModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/wellFeature/list.htm',
            create : 'rest/wellFeature/register.htm',
            update: 'rest/wellFeature/update.htm',
            destroy: 'rest/wellFeature/delete.htm',
            activate: 'rest/wellFeature/activate.htm'
        },
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWellFeature',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});