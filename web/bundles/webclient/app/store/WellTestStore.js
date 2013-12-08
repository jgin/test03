/**
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.WellTestStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.WellTestModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.WellTestModel'
    ],
    
    remoteSort : true,
    
    sorters: [ {
       property: 'productionPeriod.productionPeriodDate',
       direction: 'DESC'
   }],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/wellTest/list.htm',
            create : 'rest/wellTest/register.htm',
            update: 'rest/wellTest/update.htm',
            destroy: 'rest/wellTest/delete.htm',
            activate: 'rest/wellTest/activate.htm'
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
            idProperty: 'idWellTest',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});