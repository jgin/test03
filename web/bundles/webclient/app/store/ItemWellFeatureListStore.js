/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.ItemWellFeatureListStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ItemWellFeatureListModel',
//    autoLoad: false,
    requires: [
        'Ext.data.Store', 
        'sisprod.model.ItemWellFeatureListModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/itemWellFeatureList/listAll.htm',
            create : 'rest/itemWellFeatureList/register.htm',
            update: 'rest/itemWellFeatureList/update.htm',
            destroy: 'rest/itemWellFeatureList/delete.htm'
        },
        
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'POST',
            destroy: 'POST'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idItemWellFeatureList',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});