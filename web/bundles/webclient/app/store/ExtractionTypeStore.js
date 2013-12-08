/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.ExtractionTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ExtractionTypeModel',
//    autoLoad: true,
    requires: [
        'Ext.data.Store', 
        'sisprod.model.ExtractionTypeModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        
        api: {
            read: 'rest/extractionType/list.htm',
            create : 'rest/extractionType/register.htm',
            update: 'rest/extractionType/update.htm',
            destroy: 'rest/extractionType/delete.htm',
            activate: 'rest/extractionType/activate.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idExtractionType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});