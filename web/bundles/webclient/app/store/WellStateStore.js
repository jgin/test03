/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.WellStateStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellStateModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.WellStateModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/wellState/list.htm',
            create : 'rest/wellState/register.htm',
            update: 'rest/wellState/update.htm',
            destroy: 'rest/wellState/delete.htm',
            activate: 'rest/wellState/activate.htm'
        },
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },

        reader: {
            type: 'json',
            useSimpleAccessors: true,
            root: 'data',
            idProperty: 'idWellState',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});