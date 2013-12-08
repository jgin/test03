/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.TestProgramStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.TestProgramModel',
//    autoLoad: true,
    requires: [
        'Ext.data.Store', 
        'sisprod.model.TestProgramModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/testProgram/list.htm',
            create : 'rest/testProgram/register.htm',
            update: 'rest/testProgram/update.htm',
            destroy: 'rest/testProgram/delete.htm',
            activate: 'rest/testProgram/activate.htm'
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
            idProperty: 'idTestProgram',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});