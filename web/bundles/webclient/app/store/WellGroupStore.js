/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.WellGroupStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellGroupModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.WellGroupModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/wellGroup/list.htm',
            create : 'rest/wellGroup/register.htm',
            update: 'rest/wellGroup/update.htm',
            destroy: 'rest/wellGroup/delete.htm',
            activate: 'rest/wellGroup/activate.htm'
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
            idProperty: 'idWellGroup',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});