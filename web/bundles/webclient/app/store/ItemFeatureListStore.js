/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.ItemFeatureListStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ItemFeatureListModel',
//    autoLoad: false,
    requires: [
        'Ext.data.Store', 
        'sisprod.model.ItemFeatureListModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/itemFeatureList/listAll.htm',
            create : 'rest/itemFeatureList/register.htm',
            update: 'rest/itemFeatureList/update.htm',
            destroy: 'rest/itemFeatureList/delete.htm'
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
            idProperty: 'idItemFeatureList',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});