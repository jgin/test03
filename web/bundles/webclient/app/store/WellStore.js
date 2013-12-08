/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.WellStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.WellModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/well/list.htm',
            create : 'rest/well/register.htm',
            update: 'rest/well/update.htm',
            destroy: 'rest/well/delete.htm',
            activate: 'rest/well/activate.htm'
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
            idProperty: 'idWell',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});