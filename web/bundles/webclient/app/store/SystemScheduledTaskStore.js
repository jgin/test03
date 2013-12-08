/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.SystemScheduledTaskStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.SystemScheduledTaskModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.SystemScheduledTaskModel'
    ],
    
    remoteSort : true,
    
    sorters: [ {
       property: 'taskDescription',
       direction: 'ASC'
   }],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/systemScheduledTask/list.htm',
            update: 'rest/systemScheduledTask/update.htm'
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