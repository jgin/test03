/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.store.ProductionForecastStore', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.ProductionForecastModel',
//    autoLoad: true,
    requires: [
        'Ext.data.Store', 
        'sisprod.model.ProductionForecastModel'
    ],
    remoteSort: true,
    proxy:{
        type: 'ajax',
        api: {
            read: 'rest/productionForecast/list.htm',
            create : 'rest/productionForecast/register.htm',
            update: 'rest/productionForecast/update.htm',
            destroy: 'rest/productionForecast/delete.htm',
            activate: 'rest/productionForecast/activate.htm'
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
            idProperty: 'idProductionForecast',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});