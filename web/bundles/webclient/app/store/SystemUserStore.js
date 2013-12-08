/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.SystemUserStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SystemUserModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.SystemUserModel'
    ],
    
    remoteSort : true,
    
    sorters: [ {
       property: 'username',
       direction: 'ASC'
   }],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/systemUser/list.htm',
            create : 'rest/systemUser/register.htm',
            update: 'rest/systemUser/update.htm',
            destroy: 'rest/systemUser/delete.htm',
            activate: 'rest/systemUser/activate.htm'
        },
        
//        actionMethods: {
//            create : 'POST',
//           read   : 'POST',
//            update : 'POST',
//            destroy: 'POST'
//        },

        reader: {
            type: 'json',
            useSimpleAccessors: false,
            root: 'data',
            idProperty: 'id',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});