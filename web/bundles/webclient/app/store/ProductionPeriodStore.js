/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.ProductionPeriodStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ProductionPeriodModel',
    requires: [
        'Ext.data.Store', 
        'sisprod.model.ProductionPeriodModel'
    ],
    
    remoteSort : true,
    
    sorters: [{
       property: 'productionPeriodDate',
       direction: 'DESC'
    }],

    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/productionPeriod/list.htm',
            create : 'rest/productionPeriod/register.htm',
            update: 'rest/productionPeriod/update.htm',
            destroy: 'rest/productionPeriod/delete.htm',
            activate: 'rest/productionPeriod/activate.htm'
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
            idProperty: 'idProductionPeriod',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});