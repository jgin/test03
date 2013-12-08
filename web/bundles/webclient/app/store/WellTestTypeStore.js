/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.WellTestTypeStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellTestTypeModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.WellTestTypeModel'
    ],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/wellTestType/list.htm',
            create : 'rest/wellTestType/register.htm',
            update: 'rest/wellTestType/update.htm',
            destroy: 'rest/wellTestType/delete.htm',
            activate: 'rest/wellTestType/activate.htm'
        },
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST',
            activate: 'POST'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idWellTestType',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});