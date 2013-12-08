/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.WellTypeByStateStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellTypeByStateModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.WellTypeByStateModel'
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
            read: 'rest/wellTypeByState/list.htm',
            create : 'rest/wellTypeByState/register.htm',
            update: 'rest/wellTypeByState/update.htm',
            destroy: 'rest/wellTypeByState/delete.htm',
            activate: 'rest/wellTypeByState/activate.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWellTypeByState',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});