/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.WellTypeByProductionStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellTypeByProductionModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.WellTypeByProductionModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/wellTypeByProduction/list.htm',
            create : 'rest/wellTypeByProduction/register.htm',
            update: 'rest/wellTypeByProduction/update.htm',
            destroy: 'rest/wellTypeByProduction/delete.htm',
            activate: 'rest/wellTypeByProduction/activate.htm'
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
            idProperty: 'idWellTypeByProduction',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});